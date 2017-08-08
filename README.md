# Roguelike-Dungeon-Generator
Generate a 2-Dimesional array of rooms connected with passages.

## Usage
Once **DungeonGenerator.js** is included in your project, a global object `Dungeon` will be available. It has a method `generator` that takes the dimensions of the dungeon, number of attempts to draw rooms and the minimum and maximum size of the rooms. It returns an object with a `dungeon` - a 2-D array representing a dungeon with rooms and passages, and `rooms` - an array containing positions and dimensions of all the rooms.

Example of usage:

  ```    let size = 30, attempts = 500, minRoomSize = 5, maxRoomSize = 10,
         DungeonGenerator = Dungeon.generator(size, attempts, minRoomSize, maxRoomSize),
         dungeon = DungeonGenerator.dungeon,
         rooms = DungeonGenerator.rooms;
  ```

Sample code [here](https://codepen.io/aneesa_saleh/pen/KvaJKL).

## License
This project is licensed under MIT license.

## Acknowledgments
Method of generating rooms inspired by Bob Nystrom's article, [Rooms and Mazes: A Procedural Dungeon Generator](http://journal.stuffwithstuff.com/2014/12/21/rooms-and-mazes/).
