#include <iostream>
#include <string>

int main()
{
    std::string in_str, out_str;
    std::cout << "Enter string: ";
    std::cin >> in_str;
    std::cout << "Input String: " << in_str << std::endl;

    for(char c : in_str)
    {
        out_str += std::toupper(c);
    }
    std::cout << "Output String: " << out_str << std::endl;

    return 0;
}