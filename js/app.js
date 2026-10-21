/**
 * Learning Hub - Main Application Logic
 * Hash-based SPA router, TOC parser, markdown engine, search modal, and Developer Guide.
 * 
 * PINNED: marked 12.0.1 — upgrading requires rewriting renderers for token objects
 */

(function () {
    'use strict';

    // Global application state
    const state = {
        currentSubject: null,
        currentNote: null,
        tocCache: {}, // subjectId -> parsed TOC data
        searchIndex: null, // MiniSearch instance
        isSearching: false,
        completedTopics: new Set()
    };

    // DOM Elements
    const appContainer = document.getElementById('app');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const progressBar = document.getElementById('reading-progress');
    const backToTopBtn = document.getElementById('back-to-top');

    // Search Modal Elements
    const searchModal = document.getElementById('search-modal');
    const searchTriggerBtn = document.getElementById('nav-search-trigger');
    const searchCloseBtn = document.getElementById('modal-search-close');
    const searchInput = document.getElementById('modal-search-input');
    const searchResultsList = document.getElementById('search-results');

    // Per-render slug collision map
    let slugCountMap = {};

    /* ==========================================================================
       Storage & Completion Management
       ========================================================================== */
    function loadCompletedTopics() {
        try {
            const raw = localStorage.getItem('learning_hub_completed');
            if (raw) {
                const arr = JSON.parse(raw);
                if (Array.isArray(arr)) {
                    state.completedTopics = new Set(arr);
                }
            }
        } catch (e) {
            console.warn('Could not read completed topics from localStorage', e);
        }
    }

    function toggleTopicCompleted(topicKey) {
        if (state.completedTopics.has(topicKey)) {
            state.completedTopics.delete(topicKey);
        } else {
            state.completedTopics.add(topicKey);
        }
        try {
            localStorage.setItem('learning_hub_completed', JSON.stringify(Array.from(state.completedTopics)));
        } catch (e) {
            console.warn('Could not save completed topics to localStorage', e);
        }
    }

    /* ==========================================================================
       Theme Management & Syntax Highlighting Switching
       ========================================================================== */
    function updateHljsTheme(theme) {
        const darkLink = document.getElementById('hljs-dark');
        const lightLink = document.getElementById('hljs-light');
        if (darkLink && lightLink) {
            if (theme === 'dark') {
                darkLink.removeAttribute('disabled');
                lightLink.setAttribute('disabled', 'disabled');
            } else {
                lightLink.removeAttribute('disabled');
                darkLink.setAttribute('disabled', 'disabled');
            }
        }
    }

    function initTheme() {
        let savedTheme = 'dark';
        try {
            savedTheme = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
        } catch (e) {}

        document.documentElement.setAttribute('data-theme', savedTheme);
        updateHljsTheme(savedTheme);

        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', () => {
                const current = document.documentElement.getAttribute('data-theme');
                const next = current === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', next);
                try {
                    localStorage.setItem('theme', next);
                } catch (e) {}
                updateHljsTheme(next);
            });
        }
    }

    /* ==========================================================================
       Scroll, Reading Progress & Back to Top
       ========================================================================== */
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

        if (progressBar) {
            if (totalHeight > 0) {
                const progress = (scrollY / totalHeight) * 100;
                progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
            } else {
                progressBar.style.width = '0%';
            }
        }

        if (backToTopBtn) {
            if (scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ==========================================================================
       Helper Utilities
       ========================================================================== */
    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function slugify(text) {
        const cleaned = (text || '')
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-');
        return cleaned || 'section';
    }

    function getHeatBadgeHtml(heat) {
        const h = (heat || '').trim().toLowerCase();
        const stars = (heat || '').match(/⭐/g) || [];
        const flames = (heat || '').match(/🔥/g) || [];

        if (h.includes('very high') || stars.length >= 5 || flames.length >= 5) {
            return `<span class="heat-badge heat-vhigh">🔥🔥🔥 Very High</span>`;
        } else if (h.includes('high') || stars.length === 4 || flames.length === 4) {
            return `<span class="heat-badge heat-high">🔥🔥 High</span>`;
        } else if (h.includes('medium') || stars.length === 3 || flames.length === 3) {
            return `<span class="heat-badge heat-medium">🔥 Medium</span>`;
        } else if (h.includes('low') || (stars.length > 0 && stars.length <= 2) || (flames.length > 0 && flames.length <= 2)) {
            return `<span class="heat-badge heat-low">⚡ Low</span>`;
        }
        return `<span class="heat-badge heat-medium">${escapeHtml(heat || 'Standard')}</span>`;
    }

    // Copy to clipboard helper
    window.copyCodeSnippet = function (blockId) {
        const block = document.getElementById(blockId);
        if (!block) return;
        const code = block.querySelector('code');
        if (!code) return;

        navigator.clipboard.writeText(code.innerText).then(() => {
            const btn = block.querySelector('.copy-code-btn');
            if (btn) {
                const originalHtml = btn.innerHTML;
                btn.innerHTML = `<span>Copied!</span>`;
                setTimeout(() => {
                    btn.innerHTML = originalHtml;
                }, 2000);
            }
        });
    };

    /* ==========================================================================
       Custom Marked.js Renderer & Markdown Preprocessing
       ========================================================================== */
    function configureMarked(subject) {
        const renderer = new marked.Renderer();
        slugCountMap = {}; // Reset slug collision counter for each note render

        // Custom code block renderer with highlight.js & copy button & PlantUML collapsible
        renderer.code = function (code, lang) {
            const rawLang = (lang || '').trim().toLowerCase();

            // PlantUML Diagrams: Collapsible disclosure box without mangling by hljs
            if (rawLang === 'plantuml' || rawLang === 'puml') {
                return `
                <details class="diagram-source">
                    <summary><span class="diagram-icon">📐</span> PlantUML Diagram Source (Expand to view)</summary>
                    <pre class="plantuml-code"><code>${escapeHtml(code)}</code></pre>
                </details>`;
            }

            const validLang = rawLang && typeof hljs !== 'undefined' && hljs.getLanguage(rawLang) ? rawLang : null;
            let highlighted = code;
            if (typeof hljs !== 'undefined') {
                try {
                    highlighted = validLang
                        ? hljs.highlight(code, { language: validLang }).value
                        : hljs.highlightAuto(code).value;
                } catch (e) {
                    highlighted = escapeHtml(code);
                }
            } else {
                highlighted = escapeHtml(code);
            }

            const langDisplay = (lang || 'code').toUpperCase();
            const id = 'code-' + Math.random().toString(36).substring(2, 9);

            return `
            <div class="code-block-wrapper" id="${id}">
                <div class="code-block-header">
                    <span>${escapeHtml(langDisplay)}</span>
                    <button class="copy-code-btn" onclick="window.copyCodeSnippet('${id}')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        <span>Copy</span>
                    </button>
                </div>
                <pre><code class="hljs ${validLang ? 'language-' + validLang : ''}">${highlighted}</code></pre>
            </div>`;
        };

        // Custom Heading renderer with deduplicated IDs for sidebar TOC
        renderer.heading = function (text, level) {
            const rawText = text.replace(/<[^>]*>?/gm, '');
            let slug = slugify(rawText);
            if (slugCountMap[slug]) {
                slugCountMap[slug]++;
                slug = `${slug}-${slugCountMap[slug]}`;
            } else {
                slugCountMap[slug] = 1;
            }
            return `<h${level} id="${slug}">${text}</h${level}>`;
        };

        // Custom Link renderer: Rewrite intra-pillar and cross-pillar .md links to SPA routes
        renderer.link = function (href, title, text) {
            if (href && (href.endsWith('.md') || href.includes('.md#') || href.includes('.md?'))) {
                let [cleanPath, fragment] = href.split('#');
                let targetSubjectId = subject ? subject.id : '5g-ran';
                let targetFile = cleanPath;

                // Handle cross-pillar and intra-pillar relative paths
                if (cleanPath.includes('../')) {
                    // e.g. "../cpp/10-x.md" or "../17-x.md"
                    const stripped = cleanPath.replace(/^\.\.\//, '');
                    const segments = stripped.split('/');
                    if (segments.length > 1) {
                        targetSubjectId = segments[0];
                        targetFile = segments.slice(1).join('/');
                    } else {
                        targetFile = segments[0];
                    }
                } else {
                    targetFile = cleanPath.replace(/^\.\//, '').split('/').pop();
                }

                const spaHref = `#/subject/${targetSubjectId}/note/${targetFile}`;
                return `<a href="${spaHref}" ${title ? `title="${escapeHtml(title)}"` : ''}>${text}</a>`;
            }

            // External links
            return `<a href="${href}" target="_blank" rel="noopener noreferrer" ${title ? `title="${escapeHtml(title)}"` : ''}>${text}</a>`;
        };

        // Custom Image renderer: Resolve relative images against subject's baseDir
        renderer.image = function (href, title, text) {
            let resolvedSrc = href;
            if (href && !href.startsWith('http://') && !href.startsWith('https://') && !href.startsWith('/') && !href.startsWith('data:')) {
                const cleanHref = href.replace(/^\.\//, '');
                resolvedSrc = `${subject.baseDir}/${cleanHref}`;
            }
            return `
            <div class="note-image-wrapper">
                <img src="${resolvedSrc}" alt="${escapeHtml(text || '')}" ${title ? `title="${escapeHtml(title)}"` : ''} loading="lazy">
                ${(text || title) ? `<span class="image-caption">${escapeHtml(text || title)}</span>` : ''}
            </div>`;
        };

        // Custom Table renderer wrapped in responsive container
        renderer.table = function (header, body) {
            return `<div class="table-responsive"><table class="toc-table"><thead>${header}</thead><tbody>${body}</tbody></table></div>`;
        };

        marked.setOptions({
            renderer: renderer,
            gfm: true,
            breaks: false
        });
    }

    // Pre-process markdown for GitHub-style alerts: > [!NOTE], > [!TIP], etc.
    function parseGitHubAlerts(markdown) {
        const alertTypes = ['NOTE', 'TIP', 'IMPORTANT', 'WARNING', 'CAUTION'];
        const alertRegex = new RegExp(
            `^> \\s*\\[!(${alertTypes.join('|')})\\]\\s*\\n((?:>.*\\n?)*)`,
            'gm'
        );

        return markdown.replace(alertRegex, function (match, type, content) {
            const cleanContent = content
                .split('\n')
                .map(line => line.replace(/^>\s?/, ''))
                .join('\n');
            const alertClass = type.toLowerCase();
            return `\n<div class="callout callout-${alertClass}">
                <div class="callout-header">
                    <span>${type}</span>
                </div>
                <div class="callout-content">
                    ${cleanContent}
                </div>
            </div>\n`;
        });
    }

    /* ==========================================================================
       TOC Parsing Engine (CONTENTS.md)
       ========================================================================== */
    async function loadSubjectTOC(subject) {
        if (state.tocCache[subject.id]) {
            return state.tocCache[subject.id];
        }

        try {
            const response = await fetch(subject.contentsFile);
            if (!response.ok) {
                throw new Error(`Failed to load ${subject.contentsFile} (HTTP ${response.status})`);
            }
            const markdown = await response.text();

            const phases = [];
            let currentPhase = null;
            let totalTopics = 0;
            let highHeatCount = 0;

            const lines = markdown.split('\n');

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();

                // Phase heading: ## Phase 0: The Big Picture, or ## Phase 1 — Foundations
                const phaseMatch = line.match(/^##\s+Phase\s+(\d+|[A-Z0-9]+)\s*[:—\-]\s*(.+)$/i);
                if (phaseMatch) {
                    currentPhase = {
                        number: phaseMatch[1],
                        title: phaseMatch[2].trim(),
                        quote: '',
                        topics: []
                    };
                    phases.push(currentPhase);
                    continue;
                }

                // Phase quote: > *"Why does 5G exist?"*
                if (currentPhase && line.startsWith('>')) {
                    const quoteClean = line.replace(/^>\s*\*?\"?/, '').replace(/\"?\*?$/, '').trim();
                    if (!currentPhase.quote && quoteClean && !quoteClean.toLowerCase().startsWith('status') && !quoteClean.toLowerCase().startsWith('compile target')) {
                        currentPhase.quote = quoteClean;
                    }
                    continue;
                }

                // Table row with topic: | 01 | [Telecom Evolution](./01-telecom.md) | Medium | Concepts |
                if (currentPhase && line.startsWith('|') && !line.includes('---') && !line.toLowerCase().includes('interview heat') && !line.toLowerCase().includes('interview frequency')) {
                    const cells = line.split('|').map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
                    if (cells.length >= 3) {
                        const nn = cells[0];
                        const linkPart = cells[1];
                        const heat = cells[2];
                        const concepts = cells[3] || '';

                        // Extract title and file path if link exists
                        const linkMatch = linkPart.match(/\[(.+?)\]\((.+?)\)/);
                        if (linkMatch) {
                            const topicTitle = linkMatch[1];
                            let topicFile = linkMatch[2].replace(/^\.\//, '');
                            topicFile = topicFile.split('/').pop();

                            totalTopics++;
                            if (heat.toLowerCase().includes('high') || heat.includes('⭐⭐⭐⭐') || heat.includes('🔥🔥🔥🔥')) {
                                highHeatCount++;
                            }

                            currentPhase.topics.push({
                                nn,
                                title: topicTitle,
                                file: topicFile,
                                heat,
                                concepts,
                                isWritten: true
                            });
                        } else if (linkPart.trim()) {
                            // Topic planned without a file link yet
                            totalTopics++;
                            currentPhase.topics.push({
                                nn,
                                title: linkPart,
                                file: '',
                                heat,
                                concepts,
                                isWritten: false
                            });
                        }
                    }
                }
            }

            const parsedData = {
                phases,
                totalTopics,
                highHeatCount
            };

            state.tocCache[subject.id] = parsedData;
            return parsedData;
        } catch (err) {
            console.error('Error parsing TOC for', subject.id, err);
            throw err;
        }
    }

    /* ==========================================================================
       MiniSearch Engine (Zero Pre-built Manifest)
       ========================================================================== */
    async function initSearchIndex() {
        if (state.searchIndex) return state.searchIndex;

        if (typeof MiniSearch === 'undefined') {
            console.error('MiniSearch library not loaded');
            return null;
        }

        const miniSearch = new MiniSearch({
            fields: ['title', 'concepts', 'phase', 'subjectTitle'],
            storeFields: ['id', 'subjectId', 'subjectTitle', 'subjectIcon', 'title', 'concepts', 'phase', 'file', 'heat', 'nn', 'isWritten'],
            searchOptions: {
                boost: { title: 3, concepts: 2, phase: 1 },
                fuzzy: 0.2,
                prefix: true
            }
        });

        const docs = [];
        let docId = 1;

        for (const subject of CONFIG.subjects) {
            try {
                const data = await loadSubjectTOC(subject);
                data.phases.forEach(phase => {
                    phase.topics.forEach(topic => {
                        docs.push({
                            id: docId++,
                            subjectId: subject.id,
                            subjectTitle: subject.title,
                            subjectIcon: subject.icon,
                            title: topic.title,
                            concepts: topic.concepts,
                            phase: `Phase ${phase.number}: ${phase.title}`,
                            file: topic.file,
                            heat: topic.heat,
                            nn: topic.nn,
                            isWritten: topic.isWritten
                        });
                    });
                });
            } catch (e) {
                console.warn(`Could not index TOC for ${subject.id}`, e);
            }
        }

        miniSearch.addAll(docs);
        state.searchIndex = miniSearch;
        return miniSearch;
    }

    function openSearchModal() {
        if (!searchModal) return;
        searchModal.classList.add('open');
        searchModal.setAttribute('aria-hidden', 'false');
        state.isSearching = true;
        if (searchInput) {
            searchInput.value = '';
            searchInput.focus();
        }
        renderSearchResults([]);

        // Lazy initialize search index on first modal open
        initSearchIndex().catch(err => console.error(err));
    }

    function closeSearchModal() {
        if (!searchModal) return;
        searchModal.classList.remove('open');
        searchModal.setAttribute('aria-hidden', 'true');
        state.isSearching = false;
    }

    function renderSearchResults(results) {
        if (!searchResultsList) return;

        if (!searchInput.value.trim()) {
            searchResultsList.innerHTML = `
            <li style="padding: 2rem 1rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
                Type keywords above to search all curriculas and syllabus concepts...
            </li>`;
            return;
        }

        if (results.length === 0) {
            searchResultsList.innerHTML = `
            <li style="padding: 2rem 1rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
                No matching topics or concepts found.
            </li>`;
            return;
        }

        let html = '';
        results.slice(0, 15).forEach((item, index) => {
            const isSelected = index === 0 ? 'selected' : '';
            const topicKey = `${item.subjectId}:${item.file || item.title}`;
            const isDone = state.completedTopics.has(topicKey);

            html += `
            <li class="search-result-item ${isSelected}" data-index="${index}" data-subject="${item.subjectId}" data-file="${item.file}">
                <div class="search-result-top">
                    <span class="search-result-pillar">${item.subjectIcon} ${item.subjectTitle} • ${item.phase}</span>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        ${isDone ? '<span style="color: #10b981; font-size: 0.8rem;">✓ Done</span>' : ''}
                        ${getHeatBadgeHtml(item.heat)}
                    </div>
                </div>
                <div class="search-result-title">Topic ${item.nn}: ${escapeHtml(item.title)}</div>
                ${item.concepts ? `<div class="search-result-concepts">${escapeHtml(item.concepts)}</div>` : ''}
            </li>`;
        });

        searchResultsList.innerHTML = html;

        // Click handlers on search results
        searchResultsList.querySelectorAll('.search-result-item').forEach(el => {
            el.addEventListener('click', () => {
                const subj = el.getAttribute('data-subject');
                const file = el.getAttribute('data-file');
                closeSearchModal();
                if (file) {
                    window.location.hash = `#/subject/${subj}/note/${file}`;
                } else {
                    window.location.hash = `#/subject/${subj}`;
                }
            });
        });
    }

    function setupSearchEvents() {
        if (searchTriggerBtn) {
            searchTriggerBtn.addEventListener('click', openSearchModal);
        }
        if (searchCloseBtn) {
            searchCloseBtn.addEventListener('click', closeSearchModal);
        }
        if (searchModal) {
            searchModal.addEventListener('click', (e) => {
                if (e.target === searchModal) closeSearchModal();
            });
        }

        // Global keyboard shortcut: Ctrl/Cmd + K
        window.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
                e.preventDefault();
                if (state.isSearching) {
                    closeSearchModal();
                } else {
                    openSearchModal();
                }
            } else if (e.key === 'Escape' && state.isSearching) {
                closeSearchModal();
            }
        });

        // Search input typing and keyboard navigation
        if (searchInput) {
            searchInput.addEventListener('input', async (e) => {
                const query = e.target.value.trim();
                if (!query) {
                    renderSearchResults([]);
                    return;
                }
                const index = await initSearchIndex();
                if (index) {
                    const results = index.search(query);
                    renderSearchResults(results);
                }
            });

            searchInput.addEventListener('keydown', (e) => {
                if (!searchResultsList) return;
                const items = searchResultsList.querySelectorAll('.search-result-item');
                if (items.length === 0) return;

                let currentIndex = -1;
                items.forEach((item, idx) => {
                    if (item.classList.contains('selected')) currentIndex = idx;
                });

                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const next = (currentIndex + 1) % items.length;
                    items.forEach(i => i.classList.remove('selected'));
                    items[next].classList.add('selected');
                    items[next].scrollIntoView({ block: 'nearest' });
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prev = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
                    items.forEach(i => i.classList.remove('selected'));
                    items[prev].classList.add('selected');
                    items[prev].scrollIntoView({ block: 'nearest' });
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    const selected = searchResultsList.querySelector('.search-result-item.selected');
                    if (selected) {
                        selected.click();
                    }
                }
            });
        }
    }

    /* ==========================================================================
       View: Landing Page
       ========================================================================== */
    function renderLandingPage() {
        state.currentSubject = null;
        state.currentNote = null;

        let subjectsHtml = '';
        CONFIG.subjects.forEach(subject => {
            const isEnabled = subject.enabled;
            const cardClass = isEnabled ? 'subject-card active' : 'subject-card disabled';
            const clickAction = isEnabled ? `onclick="window.location.hash='#/subject/${subject.id}'"` : '';

            subjectsHtml += `
            <div class="${cardClass}" style="--card-accent: ${subject.accentColor};" ${clickAction}>
                <div class="subject-card-header">
                    <div class="subject-icon-box">${subject.icon}</div>
                    <span class="subject-badge ${isEnabled ? 'active' : 'planned'}">${subject.badge}</span>
                </div>
                <h3 class="subject-title">${escapeHtml(subject.title)}</h3>
                <div class="subject-tagline">${escapeHtml(subject.tagline)}</div>
                <p class="subject-desc">${escapeHtml(subject.description)}</p>
                <div class="subject-card-footer">
                    <div class="subject-stats">
                        ${isEnabled && subject.totalTopics ? `<span>${subject.totalPhases || 1} Phases</span><span>•</span><span>${subject.totalTopics} Topics</span>` : '<span>Curriculum Roadmap</span>'}
                    </div>
                    ${isEnabled ? `
                    <span class="subject-action-btn">
                        <span>Explore</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </span>` : ''}
                </div>
            </div>`;
        });

        appContainer.innerHTML = `
        <div class="view-container">
            <section class="hero-section">
                <div class="hero-pill">
                    <span class="dot"></span>
                    <span>Personal Knowledge Base & Note-Keeper</span>
                </div>
                <h1 class="hero-title">Architectural Notes & <span class="gradient-text">Deep Technical Reference</span></h1>
                <p class="hero-subtitle">A structured, under-the-hood digital notebook built for continuous technical learning and revision. Curated notes across systems programming, computer science foundations, algorithms, and engineering domains.</p>
                <div class="hero-actions">
                    <a href="#/subject/cpp" class="hero-guide-link" style="background: var(--accent); color: #fff; border-color: var(--accent);">
                        <span>Explore C++ Notes</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                    <a href="#/guide" class="hero-guide-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                        <span>Author's Guide</span>
                    </a>
                </div>
            </section>

            <div class="subjects-header">
                <h2 class="subjects-section-title">Available Curricula</h2>
                <p class="subjects-section-desc">Select a subject below to browse structured technical notes, deep concepts, and architectures.</p>
            </div>

            <div class="subjects-grid">
                ${subjectsHtml}
            </div>
        </div>`;
    }

    /* ==========================================================================
       View: Subject TOC Page
       ========================================================================== */
    async function renderSubjectTOC(subjectId) {
        state.currentSubject = subjectId;
        state.currentNote = null;

        const subject = CONFIG.subjects.find(s => s.id === subjectId);
        if (!subject) {
            appContainer.innerHTML = `<div class="state-box"><h2>Subject not found</h2><p><a href="#/">Return Home</a></p></div>`;
            return;
        }

        appContainer.innerHTML = `
        <div class="state-box">
            <div class="spinner"></div>
            <p>Loading ${escapeHtml(subject.title)} syllabus...</p>
        </div>`;

        try {
            const data = await loadSubjectTOC(subject);

            // Calculate completed count
            let completedInSubject = 0;
            data.phases.forEach(p => {
                p.topics.forEach(t => {
                    const topicKey = `${subject.id}:${t.file || t.title}`;
                    if (state.completedTopics.has(topicKey)) completedInSubject++;
                });
            });

            let phasesHtml = '';
            data.phases.forEach(phase => {
                let rowsHtml = '';
                phase.topics.forEach(topic => {
                    const topicKey = `${subject.id}:${topic.file || topic.title}`;
                    const isDone = state.completedTopics.has(topicKey);

                    rowsHtml += `
                    <tr data-topic-title="${escapeHtml(topic.title.toLowerCase())}" data-topic-concepts="${escapeHtml(topic.concepts.toLowerCase())}">
                        <td style="width: 40px; text-align: center;">
                            <button class="toc-check-btn ${isDone ? 'checked' : ''}" data-topic-key="${topicKey}" title="${isDone ? 'Completed' : 'Mark as completed'}">
                                ${isDone 
                                    ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>'
                                    : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/></svg>'
                                }
                            </button>
                        </td>
                        <td class="topic-nn">${escapeHtml(topic.nn)}</td>
                        <td>
                            ${topic.file ? `
                            <a href="#/subject/${subject.id}/note/${topic.file}" class="topic-title-link">
                                <span>${escapeHtml(topic.title)}</span>
                            </a>` : `
                            <span class="topic-planned-title">${escapeHtml(topic.title)} <span style="font-size: 0.75rem; color: var(--text-muted);">(Planned)</span></span>
                            `}
                        </td>
                        <td>${getHeatBadgeHtml(topic.heat)}</td>
                        <td class="key-concepts-cell">${escapeHtml(topic.concepts)}</td>
                    </tr>`;
                });

                phasesHtml += `
                <div class="phase-group" id="phase-${phase.number}">
                    <div class="phase-header">
                        <span class="phase-badge">Phase ${phase.number}</span>
                        <h3 class="phase-title">${escapeHtml(phase.title)}</h3>
                    </div>
                    ${phase.quote ? `<div class="phase-quote">"${escapeHtml(phase.quote)}"</div>` : ''}
                    <div class="table-responsive">
                        <table class="toc-table">
                            <thead>
                                <tr>
                                    <th style="width: 40px; text-align: center;">✓</th>
                                    <th style="width: 50px;">NN</th>
                                    <th>Topic</th>
                                    <th style="width: 150px;">Interview Heat</th>
                                    <th>Key Concepts</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${rowsHtml}
                            </tbody>
                        </table>
                    </div>
                </div>`;
            });

            appContainer.innerHTML = `
            <div class="view-container">
                <nav class="breadcrumb">
                    <a href="#/">Home</a>
                    <span class="sep">/</span>
                    <span class="current">${escapeHtml(subject.title)}</span>
                </nav>

                <div class="subject-hero" style="--card-accent: ${subject.accentColor};">
                    <div class="subject-hero-top">
                        <div class="subject-hero-icon">${subject.icon}</div>
                        <div>
                            <h1 class="subject-hero-title">${escapeHtml(subject.title)}</h1>
                            <p class="subject-hero-subtitle">${escapeHtml(subject.description)}</p>
                        </div>
                    </div>
                    <div class="stats-bar">
                        <div class="stat-pill">
                            <span class="num">${data.phases.length}</span>
                            <span class="label">Phases</span>
                        </div>
                        <div class="stat-pill">
                            <span class="num">${data.totalTopics}</span>
                            <span class="label">Total Topics</span>
                        </div>
                        <div class="stat-pill">
                            <span class="num" style="color: #f97316;">${data.highHeatCount}</span>
                            <span class="label">High Heat Topics</span>
                        </div>
                        <div class="stat-pill">
                            <span class="num" style="color: #10b981;" id="stat-completed-count">${completedInSubject}</span>
                            <span class="label">Completed</span>
                        </div>
                    </div>
                </div>

                <div class="toc-controls">
                    <div class="search-box">
                        <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>
                        <input type="text" id="topic-search" class="search-input" placeholder="Search topics or concepts (e.g. HARQ, SCTP, RAII, F1AP)...">
                    </div>
                </div>

                <div id="phases-container">
                    ${phasesHtml}
                </div>
            </div>`;

            // Completion check button toggles
            document.querySelectorAll('.toc-check-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const key = btn.getAttribute('data-topic-key');
                    toggleTopicCompleted(key);
                    const nowDone = state.completedTopics.has(key);
                    btn.classList.toggle('checked', nowDone);
                    btn.innerHTML = nowDone
                        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>'
                        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/></svg>';

                    // Update count
                    let newCount = 0;
                    data.phases.forEach(p => {
                        p.topics.forEach(t => {
                            if (state.completedTopics.has(`${subject.id}:${t.file || t.title}`)) newCount++;
                        });
                    });
                    const statEl = document.getElementById('stat-completed-count');
                    if (statEl) statEl.textContent = newCount;
                });
            });

            // Topic Live Search filtering
            const liveSearchInput = document.getElementById('topic-search');
            if (liveSearchInput) {
                liveSearchInput.addEventListener('input', (e) => {
                    const query = e.target.value.toLowerCase().trim();
                    const phaseGroups = document.querySelectorAll('.phase-group');

                    phaseGroups.forEach(group => {
                        let hasVisibleRow = false;
                        const rows = group.querySelectorAll('tbody tr');
                        rows.forEach(row => {
                            const title = row.getAttribute('data-topic-title') || '';
                            const concepts = row.getAttribute('data-topic-concepts') || '';
                            if (!query || title.includes(query) || concepts.includes(query)) {
                                row.style.display = '';
                                hasVisibleRow = true;
                            } else {
                                row.style.display = 'none';
                            }
                        });
                        group.style.display = hasVisibleRow ? '' : 'none';
                    });
                });
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            appContainer.innerHTML = `
            <div class="state-box">
                <h2>Failed to load syllabus</h2>
                <p style="color: var(--text-muted); margin: 1rem 0;">${escapeHtml(err.message)}</p>
                <a href="#/" class="back-btn">← Back to Hub</a>
            </div>`;
        }
    }

    /* ==========================================================================
       View: Coming Soon (Graceful 404 Fallback for Roadmap Notes)
       ========================================================================== */
    function renderComingSoon(subject, noteFile, currentTopic, prevTopic, nextTopic) {
        const title = currentTopic ? currentTopic.title : noteFile.replace(/\.md$/, '').replace(/^\d+-/, '').replace(/-/g, ' ');

        appContainer.innerHTML = `
        <div class="view-container">
            <nav class="breadcrumb">
                <a href="#/">Home</a>
                <span class="sep">/</span>
                <a href="#/subject/${subject.id}">${escapeHtml(subject.title)}</a>
                <span class="sep">/</span>
                <span class="current">${escapeHtml(title)}</span>
            </nav>

            <div class="state-box">
                <div class="state-icon">📋</div>
                <div class="state-badge">Curriculum Roadmap</div>
                <h2 style="font-size: 1.75rem; margin-bottom: 0.75rem;">Topic in Preparation</h2>
                <p style="color: var(--text-secondary); max-width: 480px; margin: 0 auto 1.5rem; line-height: 1.6;">
                    <strong>${escapeHtml(title)}</strong> is currently being drafted according to the carrier-grade syllabus and interview requirements.
                </p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <a href="#/subject/${subject.id}" class="back-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        <span>Back to Syllabus</span>
                    </a>
                    <a href="https://github.com/amanbh2/learning/issues/new" target="_blank" rel="noopener noreferrer" class="back-btn" style="border-color: var(--accent); color: var(--accent);">
                        <span>Request Priority on GitHub</span>
                    </a>
                </div>
            </div>

            <div class="note-pagination" style="max-width: 600px; margin: 2rem auto 0;">
                ${prevTopic ? `
                <a href="#/subject/${subject.id}/note/${prevTopic.file}" class="pagination-card prev">
                    <span class="pagination-sub">← Previous Topic</span>
                    <span class="pagination-title">${escapeHtml(prevTopic.title)}</span>
                </a>` : `<div></div>`}

                ${nextTopic ? `
                <a href="#/subject/${subject.id}/note/${nextTopic.file}" class="pagination-card next">
                    <span class="pagination-sub">Next Topic →</span>
                    <span class="pagination-title">${escapeHtml(nextTopic.title)}</span>
                </a>` : `<div></div>`}
            </div>
        </div>`;

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /* ==========================================================================
       View: Note Reader View
       ========================================================================== */
    async function renderNote(subjectId, noteFile) {
        state.currentSubject = subjectId;
        state.currentNote = noteFile;

        const subject = CONFIG.subjects.find(s => s.id === subjectId);
        if (!subject) {
            appContainer.innerHTML = `<div class="state-box"><h2>Subject not found</h2><p><a href="#/">Return Home</a></p></div>`;
            return;
        }

        appContainer.innerHTML = `
        <div class="state-box">
            <div class="spinner"></div>
            <p>Loading document...</p>
        </div>`;

        try {
            // Load TOC cache to calculate Next / Prev topics
            const tocData = await loadSubjectTOC(subject);

            // Find current topic in TOC to get pagination
            let allTopics = [];
            tocData.phases.forEach(p => allTopics.push(...p.topics));
            const currentIndex = allTopics.findIndex(t => t.file === noteFile);
            const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
            const nextTopic = currentIndex >= 0 && currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;
            const currentTopic = currentIndex >= 0 ? allTopics[currentIndex] : null;

            // Fetch markdown note file
            const noteUrl = `${subject.baseDir}/${noteFile}`;
            const response = await fetch(noteUrl);

            // Graceful 404 handling
            if (!response.ok) {
                if (response.status === 404) {
                    renderComingSoon(subject, noteFile, currentTopic, prevTopic, nextTopic);
                    return;
                }
                throw new Error(`Failed to load note file "${noteUrl}" (HTTP ${response.status})`);
            }

            let rawMarkdown = await response.text();

            // Calculate reading time
            const wordCount = rawMarkdown.trim().split(/\s+/).length;
            const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

            // Setup marked renderer
            configureMarked(subject);

            // Obsidian image syntax replacement: ![[Pasted image.png]] -> ![Image](./assets/Pasted image.png)
            rawMarkdown = rawMarkdown.replace(/!\[\[(.*?)\]\]/g, (match, p1) => {
                const imgName = p1.trim();
                return `![${imgName}](./assets/${imgName})`;
            });

            // Preprocess GitHub Alerts
            const processedMarkdown = parseGitHubAlerts(rawMarkdown);

            // Render Markdown
            const renderedHtml = marked.parse(processedMarkdown);

            // Topic completion state
            const topicKey = `${subject.id}:${noteFile}`;
            const isCompleted = state.completedTopics.has(topicKey);

            // GitHub Edit link
            const ghEditUrl = `https://github.com/amanbh2/learning/edit/main/${subject.baseDir}/${noteFile}`;

            appContainer.innerHTML = `
            <div class="view-container">
                <nav class="breadcrumb">
                    <a href="#/">Home</a>
                    <span class="sep">/</span>
                    <a href="#/subject/${subject.id}">${escapeHtml(subject.title)}</a>
                    <span class="sep">/</span>
                    <span class="current">${currentTopic ? escapeHtml(currentTopic.title) : escapeHtml(noteFile)}</span>
                </nav>

                <div class="note-header-card">
                    <div>
                        <div style="font-size: 0.8rem; font-weight: 600; text-transform: uppercase; color: var(--accent); margin-bottom: 0.25rem;">
                            ${currentTopic ? `Topic ${currentTopic.nn} • ${subject.title}` : subject.title}
                        </div>
                        <div class="note-meta-badges">
                            ${currentTopic ? getHeatBadgeHtml(currentTopic.heat) : ''}
                            <span class="read-time-badge">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                <span>${readTimeMinutes} min read</span>
                            </span>
                            <button id="note-mark-done-btn" class="mark-done-btn ${isCompleted ? 'completed' : ''}">
                                ${isCompleted 
                                    ? '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> <span>Completed</span>' 
                                    : '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/></svg> <span>Mark as done</span>'
                                }
                            </button>
                            <a href="${ghEditUrl}" target="_blank" rel="noopener noreferrer" class="edit-gh-badge" title="Contribute edits to this note on GitHub">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                                <span>Edit on GitHub</span>
                            </a>
                        </div>
                    </div>
                    <a href="#/subject/${subject.id}" class="back-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        <span>Back to Syllabus</span>
                    </a>
                </div>

                <div class="note-container">
                    <div class="note-content-column">
                        <article class="markdown-body" id="note-article">
                            ${renderedHtml}
                        </article>

                        <div class="note-pagination">
                            ${prevTopic ? `
                            <a href="#/subject/${subject.id}/note/${prevTopic.file}" class="pagination-card prev">
                                <span class="pagination-sub">← Previous Topic</span>
                                <span class="pagination-title">${escapeHtml(prevTopic.title)}</span>
                            </a>` : `<div></div>`}

                            ${nextTopic ? `
                            <a href="#/subject/${subject.id}/note/${nextTopic.file}" class="pagination-card next">
                                <span class="pagination-sub">Next Topic →</span>
                                <span class="pagination-title">${escapeHtml(nextTopic.title)}</span>
                            </a>` : `<div></div>`}
                        </div>
                    </div>

                    <aside class="note-sidebar" id="note-sidebar">
                        <div class="sidebar-title">On This Page</div>
                        <ul class="sidebar-toc-list" id="sidebar-toc-list"></ul>
                    </aside>
                </div>
            </div>`;

            // Setup Mark as done button toggle
            const markDoneBtn = document.getElementById('note-mark-done-btn');
            if (markDoneBtn) {
                markDoneBtn.addEventListener('click', () => {
                    toggleTopicCompleted(topicKey);
                    const nowDone = state.completedTopics.has(topicKey);
                    markDoneBtn.classList.toggle('completed', nowDone);
                    markDoneBtn.innerHTML = nowDone
                        ? '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> <span>Completed</span>'
                        : '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/></svg> <span>Mark as done</span>';
                });
            }

            // Build sticky "On This Page" sidebar from h2 and h3 with smooth scroll & active tracking
            const article = document.getElementById('note-article');
            const sidebarList = document.getElementById('sidebar-toc-list');
            if (article && sidebarList) {
                const headings = article.querySelectorAll('h2, h3');
                if (headings.length > 0) {
                    headings.forEach(heading => {
                        const level = heading.tagName.toLowerCase() === 'h3' ? 'level-3' : 'level-2';
                        const text = heading.textContent;
                        const id = heading.id;
                        const li = document.createElement('li');
                        li.className = `sidebar-toc-item ${level}`;

                        const a = document.createElement('a');
                        a.href = `#${id}`;
                        a.textContent = text;
                        a.addEventListener('click', (e) => {
                            e.preventDefault();
                            heading.scrollIntoView({ behavior: 'smooth' });
                        });

                        li.appendChild(a);
                        sidebarList.appendChild(li);
                    });

                    // IntersectionObserver to highlight active heading
                    if ('IntersectionObserver' in window) {
                        const observer = new IntersectionObserver((entries) => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    const id = entry.target.id;
                                    sidebarList.querySelectorAll('li').forEach(li => {
                                        const link = li.querySelector('a');
                                        if (link && link.getAttribute('href') === `#${id}`) {
                                            li.classList.add('active');
                                        } else {
                                            li.classList.remove('active');
                                        }
                                    });
                                }
                            });
                        }, {
                            rootMargin: '-80px 0px -70% 0px'
                        });

                        headings.forEach(h => observer.observe(h));
                    }
                } else {
                    document.getElementById('note-sidebar').style.display = 'none';
                }
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            appContainer.innerHTML = `
            <div class="state-box">
                <h2>Document could not be displayed</h2>
                <p style="color: var(--text-muted); margin: 1rem 0;">${escapeHtml(err.message)}</p>
                <a href="#/subject/${subject.id}" class="back-btn">← Back to Syllabus</a>
            </div>`;
        }
    }

    /* ==========================================================================
       View: Developer & Author Guide
       ========================================================================== */
    function renderDeveloperGuide() {
        state.currentSubject = null;
        state.currentNote = null;

        appContainer.innerHTML = `
        <div class="view-container">
            <nav class="breadcrumb">
                <a href="#/">Home</a>
                <span class="sep">/</span>
                <span class="current">Developer & Author Guide</span>
            </nav>

            <div class="subject-hero" style="--card-accent: #38bdf8;">
                <div class="subject-hero-top">
                    <div class="subject-hero-icon">📖</div>
                    <div>
                        <h1 class="subject-hero-title">Developer & Author's Guide</h1>
                        <p class="subject-hero-subtitle">Comprehensive guide to website architecture, supported markdown features, formatting standards, and adding new notes.</p>
                    </div>
                </div>
                <div class="stats-bar">
                    <div class="stat-pill"><span class="num">0</span><span class="label">Build Steps (Pure Static)</span></div>
                    <div class="stat-pill"><span class="num">0</span><span class="label">External Network Requests</span></div>
                    <div class="stat-pill"><span class="num">Client-side</span><span class="label">MiniSearch & Marked</span></div>
                </div>
            </div>

            <article class="markdown-body">
                <h2>1. Website Architecture</h2>
                <p>This website is built as a zero-build Single Page Application (SPA) designed to run natively on <strong>GitHub Pages</strong> without any build server, Node runtime, or compilation pipeline.</p>
                <ul>
                    <li><strong>Markdown Engine:</strong> <code>marked.js</code> (v12.0.1 vendored locally) converts raw markdown directly into HTML inside the user's browser.</li>
                    <li><strong>Syntax Highlighting:</strong> <code>highlight.js</code> (v11.9.0 vendored) colors C, C++, Bash, Python, YAML, and JSON with theme-aware palettes.</li>
                    <li><strong>Client-Side Search:</strong> <code>MiniSearch</code> indexes syllabus files on demand in browser memory with zero pre-generated index files.</li>
                    <li><strong>Self-Hosted Typography:</strong> <code>Inter</code> and <code>JetBrains Mono</code> variable woff2 fonts served from local assets.</li>
                    <li><strong>Routing:</strong> Client-side hash router supporting <code>#/</code>, <code>#/subject/:id</code>, and <code>#/subject/:id/note/:file</code>.</li>
                </ul>

                <h2>2. How to Add a New Note to a Syllabus</h2>
                <p>Follow these 3 simple steps whenever adding a new topic:</p>

                <h3>Step 1: Create the Markdown File</h3>
                <p>Create the file inside the subject directory (e.g. <code>5g-ran/</code>) following the naming convention: <code>&lt;NN&gt;-&lt;kebab-case-title&gt;.md</code>.</p>
                <div class="code-block-wrapper">
                    <div class="code-block-header"><span>MARKDOWN TEMPLATE</span></div>
                    <pre><code># Topic Title

## Overview
Brief explanation of what this topic covers and why it matters in interviews.

## Content
Main technical material, protocol headers, call flows, and architecture details.

### Interview Traps & Gotchas
🪤 Common trick questions, edge cases, and pitfalls interviewers ask about.

## Key Takeaways
- Bullet points summarizing the must-know concepts.

---
*Last updated: YYYY-MM-DD*</code></pre>
                </div>

                <h3>Step 2: Update <code>CONTENTS.md</code></h3>
                <p>Add the topic row to the appropriate phase table in <code>CONTENTS.md</code> using the strict 4-column format:</p>
                <div class="code-block-wrapper">
                    <div class="code-block-header"><span>TABLE ROW FORMAT</span></div>
                    <pre><code>| NN | Topic | Interview Heat | Key Concepts |
|----|-------|----------------|--------------|
| 10 | [HARQ in 5G NR](./10-harq-in-5g-nr.md) | Very High | CBG, async DL/UL, NDI, CC/IR |</code></pre>
                </div>

                <h3>Step 3: Commit and Push</h3>
                <p>Push your changes to GitHub. Since GitHub Pages serves static files directly, your new note is immediately live and navigable!</p>

                <h2>3. Supported Markdown & Rich Formatting Features</h2>

                <h3>PlantUML Diagrams</h3>
                <p>PlantUML code blocks fenced with <code>\`\`\`plantuml</code> are rendered as clean, collapsible disclosure panels with syntax-preserved source code.</p>

                <h3>GitHub-Style Callouts</h3>
                <p>Use blockquotes starting with <code>[!TYPE]</code> to create highlighted visual callouts:</p>
                <div class="callout callout-note">
                    <div class="callout-header"><span>NOTE</span></div>
                    <div class="callout-content"><p><code>&gt; [!NOTE]</code> - Useful for architectural background and spec references.</p></div>
                </div>
                <div class="callout callout-tip">
                    <div class="callout-header"><span>TIP</span></div>
                    <div class="callout-content"><p><code>&gt; [!TIP]</code> - Recommended techniques, memory optimizations, or coding idioms.</p></div>
                </div>
                <div class="callout callout-important">
                    <div class="callout-header"><span>IMPORTANT</span></div>
                    <div class="callout-content"><p><code>&gt; [!IMPORTANT]</code> - Critical steps or mandatory protocol requirements.</p></div>
                </div>
                <div class="callout callout-warning">
                    <div class="callout-header"><span>WARNING</span></div>
                    <div class="callout-content"><p><code>&gt; [!WARNING]</code> - Potential pitfalls, race conditions, or breaking spec changes.</p></div>
                </div>
                <div class="callout callout-caution">
                    <div class="callout-header"><span>CAUTION</span></div>
                    <div class="callout-content"><p><code>&gt; [!CAUTION]</code> - High-risk production actions (crash analysis, memory corruption).</p></div>
                </div>

                <h3>Interview Traps & Pitfalls</h3>
                <p>Mark tricky questions that interviewers love to ask with the <strong>🪤</strong> emoji:</p>
                <p><strong>🪤 Interview Trap:</strong> In 5G NR, HARQ on DL is asynchronous, but is UL HARQ synchronous like LTE? <em>Answer: No, both DL and UL HARQ in 5G NR are asynchronous!</em></p>

                <h3>Images</h3>
                <p>Store diagrams and photos in <code>&lt;pillar&gt;/assets/</code> and reference them with standard markdown: <code>![Alt Text](./assets/filename.png)</code>.</p>
            </article>
        </div>`;

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /* ==========================================================================
       Router
       ========================================================================== */
    function router() {
        const hash = window.location.hash || '#/';

        // #/guide
        if (hash === '#/guide') {
            renderDeveloperGuide();
            return;
        }

        // #/
        if (hash === '#/' || hash === '' || hash === '#') {
            renderLandingPage();
            return;
        }

        // #/subject/:subjectId/note/:noteFile
        const noteMatch = hash.match(/^#\/subject\/([^\/]+)\/note\/([^\/#?]+)/);
        if (noteMatch) {
            renderNote(noteMatch[1], noteMatch[2]);
            return;
        }

        // #/subject/:subjectId
        const subjectMatch = hash.match(/^#\/subject\/([^\/]+)/);
        if (subjectMatch) {
            renderSubjectTOC(subjectMatch[1]);
            return;
        }

        // Fallback
        renderLandingPage();
    }

    // App Initialization
    window.addEventListener('DOMContentLoaded', () => {
        loadCompletedTopics();
        initTheme();
        setupSearchEvents();
        router();

        // Footer Back to Top Button
        const footerBackToTop = document.getElementById('footer-back-to-top');
        if (footerBackToTop) {
            footerBackToTop.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // Register Offline PWA Service Worker
        if ('serviceWorker' in navigator && (window.location.protocol.startsWith('http') || window.location.protocol.startsWith('https'))) {
            navigator.serviceWorker.register('sw.js').catch((err) => {
                console.warn('Service worker registration failed:', err);
            });
        }
    });

    window.addEventListener('hashchange', router);

})();

