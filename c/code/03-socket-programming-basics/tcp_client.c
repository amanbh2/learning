#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <arpa/inet.h> // Includes struct sockaddr_in and inet functions

#define PORT 8080

int main(int argc, char const *argv[]) {
    int sock = 0;
    struct sockaddr_in serv_addr;
    char buffer[1024] = {0};
    const char *server_ip = "127.0.0.1";

    // 1. Create the socket
    if ((sock = socket(AF_INET, SOCK_STREAM, 0)) < 0) {
        printf("\n Socket creation error \n");
        return -1;
    }

    // 2. Setup the server address structure
    memset(&serv_addr, 0, sizeof(serv_addr));
    serv_addr.sin_family = AF_INET;
    serv_addr.sin_port = htons(PORT); // Always use htons for port

    // 3. Convert IPv4 string addresses to binary form
    // inet_pton = Presentation to Network. Do NOT use legacy inet_addr().
    int ret = inet_pton(AF_INET, server_ip, &serv_addr.sin_addr);
    if (ret <= 0) {
        if (ret == 0) {
            printf("\nInvalid address format: %s\n", server_ip);
        } else {
            perror("inet_pton");
        }
        return -1;
    }

    // 4. Connect to the server
    // Once again, we cast the specific sockaddr_in struct to the generic sockaddr.
    if (connect(sock, (struct sockaddr *)&serv_addr, sizeof(serv_addr)) < 0) {
        perror("Connection Failed");
        return -1;
    }
    
    printf("Successfully connected to the server %s:%d\n", server_ip, PORT);

    // 5. Receive data from the server
    int bytes_read = read(sock, buffer, 1024);
    if (bytes_read > 0) {
        printf("Received from server: %s\n", buffer);
    }

    // Close the socket
    close(sock);

    return 0;
}
