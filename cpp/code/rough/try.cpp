#include <iostream>
using namespace std;

class robot
{
    private:
        string name{"myRobot"};
        int age{0};
    public:
        robot(string n, int a)
        {
            name = n;
            age = a;
        }

        string getName()
        {
            return name;
        }

        int getAge()
        {
            return age;
        }
        
};

int main()
{
    robot r("Alexa", 5);
    cout << "Name of the robot is: " << r.getName() << endl;
    cout << "Age of the robot is: " << r.getAge() << endl;

    return 0;
}
