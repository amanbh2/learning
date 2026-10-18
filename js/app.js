/**
 * Learning Hub - Main Application Logic
 * Hash-based SPA router, TOC parser, markdown engine, and Developer Guide.
 */

(function () {
    'use strict';

    // Global application state
    const state = {
        currentSubject: null,
        currentNote: null,
        tocCache: {}, // subjectId -> parsed TOC data
    };

    // DOM Elements
    const appContainer = document.getElementById('app');
    const themeToggleBtn = document.getElementById('theme-toggle');

    // Create reading progress bar in DOM
    const progressBar = document.createElement('div');
    progressBar.id = 'reading-progress';
    document.body.appendChild(progressBar);

    /* ==========================================================================
       Theme Management
       ========================================================================== */
    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);

        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', () => {
                const current = document.documentElement.getAttribute('data-theme');
                const next = current === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', next);
                localStorage.setItem('theme', next);
            });
        }
    }

    /* ==========================================================================
       Scroll & Reading Progress
       ========================================================================== */
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
            const progress = (window.scrollY / totalHeight) * 100;
            progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
        } else {
            progressBar.style.width = '0%';
        }
    });

    /* ==========================================================================
       Helper Utilities
       ========================================================================== */
    function escapeHtml(str) {
        if (!str) return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function slugify(text) {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-');
    }

    function getHeatBadgeHtml(heat) {
        const h = (heat || '').trim().toLowerCase();
        if (h.includes('very high')) {
            return `<span class="heat-badge heat-vhigh">🔥🔥🔥 Very High</span>`;
        } else if (h.includes('high')) {
            return `<span class="heat-badge heat-high">🔥🔥 High</span>`;
        } else if (h.includes('medium')) {
            return `<span class="heat-badge heat-medium">🔥 Medium</span>`;
        } else if (h.includes('low')) {
            return `<span class="heat-badge heat-low">⚡ Low</span>`;
        }
        return `<span class="heat-badge heat-medium">${escapeHtml(heat)}</span>`;
    }

    /* ==========================================================================
       Custom Marked.js Renderer & GitHub Alert Parsing
       ========================================================================== */
    function configureMarked(subjectId) {
        const renderer = new marked.Renderer();

        // Custom code block renderer with highlight.js & copy button
        renderer.code = function (code, lang) {
            const validLang = lang && hljs.getLanguage(lang) ? lang : null;
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

        // Custom Heading renderer with IDs for sidebar TOC
        renderer.heading = function (text, level) {
            const rawText = text.replace(/<[^>]*>?/gm, '');
            const slug = slugify(rawText);
            return `<h${level} id="${slug}">${text}</h${level}>`;
        };

        // Custom Link renderer: rewrite relative .md links to SPA routes
        renderer.link = function (href, title, text) {
            if (href && (href.endsWith('.md') || href.includes('.md#'))) {
                let cleanHref = href.replace(/^\.\//, '');
                let hash = '';
                if (cleanHref.includes('#')) {
                    const parts = cleanHref.split('#');
                    cleanHref = parts[0];
                    hash = '#' + parts[1];
                }
                const filename = cleanHref.split('/').pop();
                const spaHref = `#/subject/${subjectId}/note/${filename}${hash}`;
                return `<a href="${spaHref}" ${title ? `title="${title}"` : ''}>${text}</a>`;
            }
            return `<a href="${href}" target="_blank" rel="noopener noreferrer" ${title ? `title="${title}"` : ''}>${text}</a>`;
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

                // Phase heading: ## Phase 0: The Big Picture
                const phaseMatch = line.match(/^##\s+Phase\s+(\d+|[A-Z0-9]+):\s*(.+)$/i);
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
                    if (!currentPhase.quote) {
                        currentPhase.quote = quoteClean;
                    }
                    continue;
                }

                // Table row with topic: | 01 | [Telecom Evolution](./01-telecom.md) | Medium | Concepts |
                if (currentPhase && line.startsWith('|') && !line.includes('---') && !line.toLowerCase().includes('topic')) {
                    const cells = line.split('|').map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
                    if (cells.length >= 3) {
                        const nn = cells[0];
                        const linkPart = cells[1];
                        const heat = cells[2];
                        const concepts = cells[3] || '';

                        // Extract title and file path
                        const linkMatch = linkPart.match(/\[(.+?)\]\((.+?)\)/);
                        if (linkMatch) {
                            const topicTitle = linkMatch[1];
                            let topicFile = linkMatch[2].replace(/^\.\//, '');
                            topicFile = topicFile.split('/').pop();

                            totalTopics++;
                            if (heat.toLowerCase().includes('high')) highHeatCount++;

                            currentPhase.topics.push({
                                nn,
                                title: topicTitle,
                                file: topicFile,
                                heat,
                                concepts
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
            console.error('Error parsing TOC:', err);
            throw err;
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
                <div class="subject-pillar-tag">${subject.pillar} • ${subject.layer}</div>
                <h3 class="subject-title">${escapeHtml(subject.title)}</h3>
                <div class="subject-tagline">${escapeHtml(subject.tagline)}</div>
                <p class="subject-desc">${escapeHtml(subject.description)}</p>
                <div class="subject-card-footer">
                    <div class="subject-stats">
                        ${isEnabled ? `<span>${subject.totalPhases} Phases</span><span>•</span><span>${subject.totalTopics} Topics</span>` : '<span>Syllabus in preparation</span>'}
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
                    <span>5G RAN & Systems Preparation</span>
                </div>
                <h1 class="hero-title">Master the Architecture. <span class="gradient-text">Crack the Interview.</span></h1>
                <p class="hero-subtitle">Comprehensive, under-the-hood study notes covering 5G RAN, CU/DU Protocols, Linux Kernel, Sockets, and Resilient High Availability Systems.</p>
                <div class="hero-actions">
                    <a href="#/guide" class="hero-guide-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                        <span>Developer & Author's Guide</span>
                    </a>
                </div>
            </section>

            <div class="subjects-header">
                <h2 class="subjects-section-title">Available Curricula</h2>
                <p class="subjects-section-desc">Select an active pillar below to browse the structured beginner-to-master study roadmap.</p>
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

            let phasesHtml = '';
            data.phases.forEach(phase => {
                let rowsHtml = '';
                phase.topics.forEach(topic => {
                    rowsHtml += `
                    <tr data-topic-title="${escapeHtml(topic.title.toLowerCase())}" data-topic-concepts="${escapeHtml(topic.concepts.toLowerCase())}">
                        <td class="topic-nn">${escapeHtml(topic.nn)}</td>
                        <td>
                            <a href="#/subject/${subject.id}/note/${topic.file}" class="topic-title-link">
                                <span>${escapeHtml(topic.title)}</span>
                            </a>
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
                            <span class="num" style="color: #38bdf8;">100%</span>
                            <span class="label">Free & Open</span>
                        </div>
                    </div>
                </div>

                <div class="toc-controls">
                    <div class="search-box">
                        <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>
                        <input type="text" id="topic-search" class="search-input" placeholder="Search topics or concepts (e.g. HARQ, RACH, Handover, F1AP)...">
                    </div>
                </div>

                <div id="phases-container">
                    ${phasesHtml}
                </div>
            </div>`;

            // Topic Live Search filtering
            const searchInput = document.getElementById('topic-search');
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
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

            // Fetch markdown note file
            const noteUrl = `${subject.baseDir}/${noteFile}`;
            const response = await fetch(noteUrl);
            if (!response.ok) {
                throw new Error(`Failed to load note file "${noteUrl}" (HTTP ${response.status})`);
            }
            let rawMarkdown = await response.text();

            // Setup marked renderer
            configureMarked(subjectId);

            // Preprocess GitHub Alerts
            const processedMarkdown = parseGitHubAlerts(rawMarkdown);

            // Render Markdown
            const renderedHtml = marked.parse(processedMarkdown);

            // Find current topic in TOC to get pagination
            let allTopics = [];
            tocData.phases.forEach(p => allTopics.push(...p.topics));
            const currentIndex = allTopics.findIndex(t => t.file === noteFile);
            const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
            const nextTopic = currentIndex >= 0 && currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;
            const currentTopic = currentIndex >= 0 ? allTopics[currentIndex] : null;

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
                        <div style="font-size: 0.8rem; font-weight: 600; text-transform: uppercase; color: var(--accent-light); margin-bottom: 0.25rem;">
                            ${currentTopic ? `Topic ${currentTopic.nn} • ${subject.title}` : subject.title}
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
                            ${currentTopic ? getHeatBadgeHtml(currentTopic.heat) : ''}
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

            // Build sticky "On This Page" sidebar from h2 and h3
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
                        li.innerHTML = `<a href="#${id}">${escapeHtml(text)}</a>`;
                        sidebarList.appendChild(li);
                    });
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
                    <div class="stat-pill"><span class="num">100%</span><span class="label">Free CDN & Hosting</span></div>
                    <div class="stat-pill"><span class="num">Client-side</span><span class="label">Markdown Parsing</span></div>
                </div>
            </div>

            <article class="markdown-body">
                <h2>1. Website Architecture</h2>
                <p>This website is built as a zero-build Single Page Application (SPA) designed to run natively on <strong>GitHub Pages</strong> without any build server, Node runtime, or compilation pipeline.</p>
                <ul>
                    <li><strong>Markdown Engine:</strong> <code>marked.js</code> (via CDN) converts raw markdown directly into HTML inside the user's browser.</li>
                    <li><strong>Syntax Highlighting:</strong> <code>highlight.js</code> auto-detects and colors C, C++, Bash, Python, YAML, and JSON.</li>
                    <li><strong>Routing:</strong> Client-side hash router supporting <code>#/</code>, <code>#/subject/:id</code>, and <code>#/subject/:id/note/:file</code>.</li>
                    <li><strong>Theme Engine:</strong> Seamless Dark and Light modes persisted in <code>localStorage</code>.</li>
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

                <h3>Comparison Tables</h3>
                <p>Standard markdown tables are automatically converted into scrollable, hover-highlighted responsive tables with sticky headers.</p>

                <h3>Code Blocks with One-Click Copy</h3>
                <p>All fenced code blocks automatically receive language tags and a floating Copy button that copies the code directly to clipboard.</p>

                <h2>4. Enabling New Pillars in <code>js/config.js</code></h2>
                <p>To make another subject active (e.g. <code>cpp</code>, <code>networking</code>, <code>linux-bash</code>), simply open <code>js/config.js</code> and update:</p>
                <div class="code-block-wrapper">
                    <div class="code-block-header"><span>JAVASCRIPT</span></div>
                    <pre><code>{
    id: "cpp",
    title: "C++ & DSA",
    enabled: true,    // Change from false to true
    badge: "Active"
}</code></pre>
                </div>
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
        initTheme();
        router();
    });

    window.addEventListener('hashchange', router);

})();
