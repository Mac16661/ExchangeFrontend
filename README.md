### Magical Arena Simulation

This Java project simulates a magical arena where players engage in battles based on their attributes
such as health, strength, and attack. Players are managed through a PlayerManager class, and
matches are facilitated by an Arena class.


### Features
* **Player Class:** Represents a player with attributes like health, strength, attack, and name.
* **PlayerManager Class:** Manages multiple players, allowing addition and retrieval of players, as well as starting matches between them.
* **Arena Class:** Facilitates matches between two players, handling the logic of attacks and damage calculations.
* **Main Class:** Entry point to the program, initializes players, adds them to the manager, and starts matches.

### UML Class Diagram
<https://raw.githubusercontent.com/Mac16661/ExchangeNode/main/Swiggi.png>

### How to Run & Requirements
* Java 8 or higher installed on your system.
* IDE such as IntelliJ IDEA, Eclipse, or any text editor to view and edit Java files.
* Run Main.java inside src/com.swiggi/ folder

### Output
*  The program will print the progress of the match in the console.
*  After the match concludes, it will display the winner based on remaining health.

### Example
Assume two players:

* Player A: Health 50, Strength 5, Attack 10
* Player B: Health 100, Strength 10, Attack 5
* <br/>
The program will simulate matches between these players, displaying each attack and the resulting damage until one player's health reaches zero.

### Support
For any issues or questions, please contact macy16661@gmail.com.
