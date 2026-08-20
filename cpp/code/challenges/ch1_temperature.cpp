#include <iostream>

int main()
{
    std::cout << "Enter temperature in Celsius: ";
    float temp_celcius;
    std::cin >> temp_celcius;

    std::cout << "--- Conversion Results ---\n";
    std::cout << "Celsius\t\t: " << temp_celcius << "\n";
    std::cout << "Fahrenheit\t: " << (temp_celcius * 9.0 / 5.0) + 32.0 << "\n";
    std::cout << "Kelvin\t\t: " << temp_celcius + 273.15 << "\n";
    

    return 0;
}