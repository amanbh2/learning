#include <iostream>
#include <string>

int main() {
    // We explicitly use std:: to avoid namespace pollution.
    std::cout << "--- C++ I/O Example ---" << std::endl;

    int number;
    std::string name;

    // Outputting text
    std::cout << "Enter your first name: ";
    
    // Taking string input.
    // Note: std::cin >> stops reading at the first whitespace. 
    std::cin >> name;

    std::cout << "Enter a number: ";
    
    // Taking integer input. 
    // Type is automatically deduced, no format specifier needed.
    std::cin >> number;

    // Chaining output
    std::cout << "\nHello, " << name << "!" << std::endl;
    std::cout << "You entered the number " << number << ".\n";

    return 0;
}
