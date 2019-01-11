# Game Project
## Troll Maze
Game project for week 4 of Sparta Global training

## Purpose
The purpose of this project is to create a game using HTML, CSS and JavaScript.
In order to show how my understanding and knowledge has developed over the first 4 weeks of the course.

## Functionality
This is a simple game that uses a grid based movement system with the ability to wrap round to the other side.

A random map of walls, stairs and a monster are generated on each floor and at the start of the game.

Walls can be broken and the monster must be avoided, you must reach the stairs to descend a floor and see how far you can make it through the maze.

A high score of the deepest floor reached is recorded and saved between runs.

## Implementation
The functionality was achieved using:

A table in HTML to create a grid, making it in to array in order to give each square a unique identifier.

Using JS to assign classes and set innerHTML to the different squares to define the type of square they are and how they will interact.

Using functions to check and move from one square to another and interact with other entities within the grid.

Keeping track of variables and comparing them to other variables in order to keep a score.

Use of CSS to style and format the game.

## Demo Site

A demo can be found at:

https://jozefmclaughlin.github.io/game-project/


## Known Issues
. Can move after the map is cleared which causes two positions to be present upon loading a new map.
. Troll can get caught between edge of map and stairs.
