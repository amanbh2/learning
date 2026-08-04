#include <stdio.h>
#include <stdlib.h>
#include <string.h>
// POSIX specific headers, standard for C socket programming
#include <unistd.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>

#define PORT 8080
#define BACKLOG 5 // How many pending connections queue will hold

int main() {
    int server_fd, new_socket;
    struct sockaddr_in address;
    int opt = 1;
    socklen_t addrlen = sizeof(address);

    // 1. Creating socket file descriptor
    // AF_INET = IPv4, SOCK_STREAM = TCP, 0 = IP (default protocol for stream)
    if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0) {
        perror("socket failed");
        exit(EXIT_FAILURE);
    }

    // Forcefully attaching socket to the port 8080 (optional but good practice to avoid "Address already in use" errors)
    if (setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt))) {
        perror("setsockopt");
        exit(EXIT_FAILURE);
    }

    // 2. Prepare the sockaddr_in structure
    // CRITICAL: Always memset to 0 to clear out the sin_zero padding array
    memset(&address, 0, sizeof(address));
    address.sin_family = AF_INET;
    // INADDR_ANY binds to all available interfaces. We use htonl to convert it to network byte order.
    address.sin_addr.s_addr = htonl(INADDR_ANY); 
    // Convert port to network byte order using htons (Host TO Network Short)
    address.sin_port = htons(PORT);

    // 3. Bind the socket to the network address and port
    // Notice the cast to (struct sockaddr *) - this is C's version of polymorphism
    if (bind(server_fd, (struct sockaddr *)&address, sizeof(address)) < 0) {
        perror("bind failed");
        exit(EXIT_FAILURE);
    }

    // 4. Start listening for incoming connections
    if (listen(server_fd, BACKLOG) < 0) {
        perror("listen");
        exit(EXIT_FAILURE);
    }
    printf("Server is listening on port %d...\n", PORT);

    // 5. Accept an incoming connection
    // The 'address' struct will be populated with the client's IP and port.
    if ((new_socket = accept(server_fd, (struct sockaddr *)&address, &addrlen)) < 0) {
        perror("accept");
        exit(EXIT_FAILURE);
    }

    char client_ip[INET_ADDRSTRLEN];
    // Convert binary IP to string representation safely
    inet_ntop(AF_INET, &(address.sin_addr), client_ip, INET_ADDRSTRLEN);
    
    // ntohs to convert the client port back to our host byte order for printing
    printf("Connection accepted from %s:%d\n", client_ip, ntohs(address.sin_port));

    const char *hello = "Hello from server";
    send(new_socket, hello, strlen(hello), 0);
    printf("Hello message sent\n");

    // Close sockets
    close(new_socket);
    close(server_fd);

    return 0;
}
