/**
* 
* @author Aneesa Saleh
* 
* @description Generate a dungeon of rooms connected with passages
*
* Usage: let dungeon = Dungeon.generator(size,attempts,minRoomSize,maxRoomSize);
* Example of usage: https://codepen.io/aneesa_saleh/pen/KvaJKL
*
*/
let Dungeon = (function(){
  
  //this function draws a passage in blocksArray between points a and b
  function drawPassage(a,b,blocksArray){ 
    //draw horizontal if row is the same
    if(a.row == b.row){
      //check which point comes before the other
      let start = a.col > b.col ? b.col : a.col;
      let end = a.col > b.col ? a.col : b.col;
      
      //check that path is not adjacent to any room
      for(let i = start;i <= end; i++){
        if(blocksArray[a.row + 1][i].type == 'room' || blocksArray[a.row - 1][i].type == 'room')
          return;
      }
      //draw from start point to end point
      for(let i = start;i <= end; i++){
        //if it intersects with a pasage, stop
        if(blocksArray[a.row][i].type == 'passage')
          break;
        blocksArray[a.row][i].type = 'passage';
      }
    }
    wqe
    //draw vertically otherwise
    else{
      let start = a.row > b.row ? b.row : a.row;
      let end = a.row > b.row ? a.row : b.row;
      //check for adjacent rooms
      for(let i = start;i <= end; i++){
        if(blocksArray[i][a.col + 1].type == 'room' || blocksArray[i][a.col - 1].type == 'room')
          return;
      }
      //draw path
      for(let i = start;i <= end; i++){
        if(blocksArray[i][a.col].type == 'passage')
          break;
        blocksArray[i][a.col].type = 'passage';
      }
    } 
  }
  
  //this function finds coordinates for the path between two rooms
  function connectRooms(roomA,roomB,direction,blocksArray){
    let colA, colB, pointA, pointB, row, row_height,
        rowA, rowB, col, col_width;
    //horizontally connected rooms
    if(direction == 'h'){
      //rooms on the same row
      if(roomA.row == roomB.row){
            //get the height of the smaller room
            row_height = roomA.height > roomB.height ? roomB.height : roomA.height;
            //set the row at half the height of the shorter room
            row = roomB.row + Math.ceil(row_height/2) - 1;
            //set colA as last column of the leftmost room, colB as the 1st column of the rightmost one
            if(roomB.col < roomA.col){
              colA = roomB.col + roomB.width;
              colB = roomA.col - 1;
            }
            else{
              colA = roomA.col + roomA.width;
              colB = roomB.col - 1;
            }
            //draw passage between points a and b
            pointA = {row,col: colA};
            pointB = {row,col: colB};
            drawPassage(pointA,pointB,blocksArray);
          }
          //rooms are on different rows
          else{ 
            let top_room, bottom_room;
            //set top room the be the one on a higher row (smaller index), bottom room  on lower
            if(roomA.row > roomB.row){
              top_room = roomB;
              bottom_room = roomA;
            }
            else{
              top_room = roomA;
              bottom_room = roomB;
            }
            //get the difference between the bottom of higher room (+1) and top of lower room. This gives number of rows in common
            let diff = top_room.row + top_room.height - bottom_room.row;
            //bottom room is within the height of top room
            if((bottom_room.row - top_room.row + bottom_room.height) <= top_room.height){
              //row for passage is at half the height of bottom room
              row = bottom_room.row + Math.ceil(bottom_room.height/2) - 1;
              if(bottom_room.col < top_room.col){
                colA = bottom_room.col + bottom_room.width;
                colB = top_room.col - 1;
              }
              else{
                colA = top_room.col + top_room.width;
                colB = bottom_room.col - 1;
              }
              pointA = {row,col: colA};
              pointB = {row,col: colB};
              drawPassage(pointA,pointB,blocksArray); 
            }
            //x rows or more in common
            else{
              //row for passage is halfway point of rows in common
              row = bottom_room.row + Math.ceil(diff/2) - 1;
              if(bottom_room.col < top_room.col){
                colA = bottom_room.col + bottom_room.width;
                colB = top_room.col - 1;
              }
              else{
                colA = top_room.col + top_room.width;
                colB = bottom_room.col - 1;
              }
            pointA = {row,col: colA};
            pointB = {row,col: colB};
            drawPassage(pointA,pointB,blocksArray);          
            }
          }
    }
    
    //rooms are connected VERTICALLY
    else{
      //rooms on the same column
      if(roomA.col == roomB.col){
            //get the width of the smaller room
            col_width = roomA.width > roomB.width ? roomB.width : roomA.width;
            //set the col at half the width of the shorter room
            col = roomB.col + Math.ceil(col_width/2) - 1;
            //set rowA as last row of the upper room, rowB as the 1st row of the lower one
            if(roomB.row < roomA.row){
              rowA = roomB.row + roomB.height;
              rowB = roomA.row - 1;
            }
            else{
              rowA = roomA.row + roomA.height;
              rowB = roomB.row - 1;
            }
            //draw passage between points a and b
            pointA = {row: rowA,col};
            pointB = {row: rowB,col};
            drawPassage(pointA,pointB,blocksArray);
          }
      //rooms on different columns
      else{ 
            let left_room, right_room;
            //set left room the be the leftmost one (smaller index), bottom room  on lower
            if(roomA.col > roomB.col){
              left_room = roomB;
              right_room = roomA;
            }
            else{
              left_room = roomA;
              right_room = roomB;
            }
            //get the difference between the right (bottom) column of left (+1) and left (top) col of right room. This gives number of cols in common
            let diff = left_room.col + left_room.width - right_room.col;
            //bottom room is within the height of top room
            if((right_room.col - left_room.col + right_room.width) <= left_room.width){
              //col for passage is at half the width of right room
              col = right_room.col + Math.ceil(right_room.width/2) - 1;
              //set the top and bottom rooms
              if(right_room.row < left_room.row){
                rowA = right_room.row + right_room.height;
                rowB = left_room.row - 1;
              }
              else{
                rowA = left_room.row + left_room.height;
                rowB = right_room.row - 1;
              }
              pointA = {row: rowA,col};
              pointB = {row: rowB,col};
              drawPassage(pointA,pointB,blocksArray); 
            }
            //x rows or more in common
            else{
              //row for passage is halfway point of rows in common
              col = right_room.col + Math.ceil(diff/2) - 1;
              //set the top and bottom rooms
              if(right_room.row < left_room.row){
                rowA = right_room.row + right_room.height;
                rowB = left_room.row - 1;
              }
              else{
                rowA = left_room.row + left_room.height;
                rowB = right_room.row - 1;
              }
              pointA = {row: rowA,col};
              pointB = {row: rowB,col};
              drawPassage(pointA,pointB,blocksArray);      
            }
          }
    }
  }
  
  //this function connects all rooms with passages
  function drawPassages(blocksArray,rooms,minRoomSize){
    let size = blocksArray.length;
    //minimum rows or columns in common between rooms to make a connection
    let minCommon = 2;
//     if(minRoomSize <= 5)
//       minCommon = 2;
//     else
//       minCommon = 3;
    
    rooms.forEach((room,index,rooms) => {
      //horizontally connected rooms
      let h_rooms = {left_room: {col: 0}, right_room: {col: size - 1}};
      //vertically connected rooms
      let v_rooms = {top_room: {row: 0}, bottom_room: {row: size - 1}};
      //loop through all the rooms
      for(let i = 0;i < rooms.length; i++){
        //skip the current room
        if(i == index)
          continue;
        let row_height, row, pointA, pointB, colA, colB,
            col_height, col, rowA, rowB;
        
        //HORIZONTAL CONNECTION
        
        //if the 2 rooms are on the same row
        if(rooms[i].row == room.row){
          //if it's on the right
          if(rooms[i].col > room.col){
            //if it's closer than the current right room
            if(rooms[i].col < h_rooms.right_room.col){
              h_rooms.right_room = rooms[i];
            }
          }
          //if it's on the left
          else{
            //if it's closer than the current left room
            if(rooms[i].col > h_rooms.left_room.col){
              h_rooms.left_room = rooms[i];
            }
          }
        }
        //rooms are on different rows
        else{ 
          let top_room, bottom_room;
          //set top room the be the one on a higher row (smaller index), bottom room  on lower
          if(room.row > rooms[i].row){
            top_room = rooms[i];
            bottom_room = room;
          }
          else{
            bottom_room = rooms[i];
            top_room = room;
          }
          //get the difference between the bottom of higher room (+1) and top of lower room. This gives number of rows in common
          let diff = top_room.row + top_room.height - bottom_room.row;
          //bottom room is within the height of top room
          if((bottom_room.row - top_room.row + bottom_room.height) <= top_room.height){
            //if it's on the right
          if(rooms[i].col > room.col){
            //if it's closer than the current right room
            if(rooms[i].col < h_rooms.right_room.col){
              h_rooms.right_room = rooms[i];
            }
          }
          //if it's on the left
          else{
            //if it's closer than the current left room
            if(rooms[i].col > h_rooms.left_room.col){
              h_rooms.left_room = rooms[i];
            }
          }
          }
          //x rows or more in common
          else if(diff >= minCommon){
            //if it's on the right
          if(rooms[i].col > room.col){
            //if it's closer than the current right room
            if(rooms[i].col < h_rooms.right_room.col){
              h_rooms.right_room = rooms[i];
            }
          }
          //if it's on the left
          else{
            //if it's closer than the current left room
            if(rooms[i].col > h_rooms.left_room.col){
              h_rooms.left_room = rooms[i];
            }
          }         
          }
        }
        
        //VERTICAL CONNECTION
        //if the 2 rooms are on the same column
        if(rooms[i].col == room.col){
          //if it's on the bottom
          if(rooms[i].row > room.row){
            //if it's closer than the current bottom room
            if(rooms[i].row < v_rooms.bottom_room.row){
              v_rooms.bottom_room = rooms[i];
            }
          }
          //if it's on the top
          else{
            //if it's closer than the current top room
            if(rooms[i].row > v_rooms.top_room.row){
              v_rooms.top_room = rooms[i];
            }
          }
        }
        //rooms are on different columns
        else{ 
          let left_room, right_room;
          //set left room the be the on the leftmost column (smaller index), right room  on lower
          if(room.col > rooms[i].col){
            left_room = rooms[i];
            right_room = room;
          }
          else{
            right_room = rooms[i];
            left_room = room;
          }
          //get the (vertical) difference between the bottom of higher room (+1) and top of lower room. This gives number of cols in common
          let diff = left_room.col + left_room.width - right_room.col;

          //right room is within the width of left room
          if((right_room.col - left_room.col + right_room.width) <= left_room.width){
            //if it's on the bottom
          if(rooms[i].row > room.row){
            //if it's closer than the current bottom room
            if(rooms[i].row < v_rooms.bottom_room.row){
              v_rooms.bottom_room = rooms[i];
            }
          }
          
          //if it's on the top
          else{
            //if it's closer than the current top room
            if(rooms[i].row > v_rooms.top_room.row){
              v_rooms.top_room = rooms[i];
            }
          }
          }
          
          //2 cols or more in common
          else if(diff >= minCommon){
            //if it's on the bottom
          if(rooms[i].row > room.row){
            //if it's closer than the current bottom room
            if(rooms[i].row < v_rooms.bottom_room.row){
              v_rooms.bottom_room = rooms[i];
            }
          }
          
          //if it's on the top
          else{
            //if it's closer than the current top room
            if(rooms[i].row > v_rooms.top_room.row){
              v_rooms.top_room = rooms[i];
            }
          }        
          }
        }
       
      }
      
      let isConnected = false;
      //draw paths for each horizontally connected room
      //check if the rooms are their default values, if not connect
      if(h_rooms.right_room.col < (size - 1)){
        //check if this room is already connected
        for(let i = 0;i < h_rooms.right_room.connected_rooms.length; i++){
          if(room.col == h_rooms.right_room.connected_rooms[i].col && room.row == h_rooms.right_room.connected_rooms[i].row){
            isConnected = true;
            break;
          }
        }
        //if the room is not already connected
        if(!isConnected){
          room.connected_rooms.push({col: h_rooms.right_room.col, row: h_rooms.right_room.row});
          connectRooms(h_rooms.right_room, room, 'h',blocksArray);
        }
        else
          isConnected = false;
      }
      
      if(h_rooms.left_room.col > 0){
        //check if this room is already connected
        for(let i = 0;i < h_rooms.left_room.connected_rooms.length; i++){
          if(room.col == h_rooms.left_room.connected_rooms[i].col && room.row == h_rooms.left_room.connected_rooms[i].row){
            isConnected = true;
            break;
          }
        }
        //if the room is not already connected
        if(!isConnected){
          room.connected_rooms.push({col: h_rooms.left_room.col, row: h_rooms.left_room.row});
          connectRooms(h_rooms.left_room, room, 'h',blocksArray);
        }
        else
          isConnected = false;
      }
      
      //draw paths for each vertically connected room
      //check if the rooms are their default values, if not connect
      if(v_rooms.bottom_room.row < (size - 1)){
        //check if this room is already connected
        for(let i = 0;i < v_rooms.bottom_room.connected_rooms.length; i++){
          if(room.col == v_rooms.bottom_room.connected_rooms[i].col && room.row == v_rooms.bottom_room.connected_rooms[i].row){
            isConnected = true;
            break;
          }
        }
        //if the room is not already connected
        if(!isConnected){
          room.connected_rooms.push({col: v_rooms.bottom_room.col, row: v_rooms.bottom_room.row});
          connectRooms(v_rooms.bottom_room, room, 'v',blocksArray);
        }
        else
          isConnected = false;
      }
      
      if(v_rooms.top_room.row > 0){
        //check if this room is already connected
        for(let i = 0;i < v_rooms.top_room.connected_rooms.length; i++){
          if(room.col == v_rooms.top_room.connected_rooms[i].col && room.row == v_rooms.top_room.connected_rooms[i].row){
            isConnected = true;
            break;
          }
        }
        //if the room is not already connected
        if(!isConnected){
          room.connected_rooms.push({col: v_rooms.top_room.col, row: v_rooms.top_room.row});
          connectRooms(v_rooms.top_room, room, 'v',blocksArray);
        }
        else
          isConnected = false;
      }

    });
  }
  
    //this function checks if the position of a room is valid, i.e if it overlaps another room
  function checkRoomStatus(blocksArray,row,col,width,height,padding){
    //get maximum room boundaries
    let rowMin = row - padding, rowMax = row + height + padding, colMin = col - padding,colMax = col + width + padding, result = true;
    //loop through and check if the spaces are occied
    for(let i = rowMin; i <= rowMax; i++){
      for(let j = colMin; j <= colMax; j++){
        //this function is called when there are only rooms
        if(blocksArray[i][j].type == 'room'){
          result = false;
          break;
        }
      }
    }
    return result;
  }
  
    //this function returns random room coordinates and size
  function getRandomRoom(size,minRoomSize,maxRoomSize,padding){
  let maxRow = size - 1;
  //width and height randomly picked from 6 - 12
  let width = Math.floor( minRoomSize + ( Math.random() * (maxRoomSize - minRoomSize + 1)));
  let height = Math.floor( minRoomSize + ( Math.random() * (maxRoomSize - minRoomSize + 1)));
  //x2 for padding and scale factor
  let row = padding + ( Math.random() * (maxRow - height - (padding*2)));
  row = Math.floor(row);
  let col = padding + ( Math.random() * (maxRow - width - (padding*2)));
  col = Math.floor(col);
  return {row,col,width,height};
}
  
  //this function places rooms randomly within the array
  function drawRandomRooms(blocksArray,attempts,minRoomSize,maxRoomSize,padding,rooms){
    let size = blocksArray.length;
    //keep trying until the number of attempts is 0
    while(attempts > 0){
      attempts--;
      //geenerate a room of random size and position
      let {row,col,width,height} = getRandomRoom(size,minRoomSize,maxRoomSize,padding);
      //check if the room overlaps with another room, or is too close to it
      let shouldDrawRoom = checkRoomStatus(blocksArray,row,col,width,height,padding);
      if(shouldDrawRoom){
        //put this room in the array of rooms
        rooms.push({row,col,width,height,connected_rooms: []});
        //place the room in the array
        for(let i = row; i < row + height;i++){
          for(let j = col; j < col + width; j++){
            blocksArray[i][j].type = 'room';
          }
        }
      }
    }
    //connect the rooms with passages
  drawPassages(blocksArray,rooms,minRoomSize);
  }

/**
* 
* @description Generate a dungeon of rooms connected with passages
*
* @param int size - dimensions of square dungeon
*         default: 50
*         minimum: 25
*         maximum: 250
* @param int attempts - number of attempts to be made to place rooms
*         default: 1000
*         minimum: 50
*         maximum: 2000
* @param int minRoomSize - minimum width/height of room
*         default: 6
*         minimum: 4
*         maximum: 20
* @param int maxRoomSize - maximum width/height of room
*         default: 12
*         minimum: 4
*         maximum: 20
*
* @return {Object}[][] - 2-D array containing rooms and passages. 
*                        Possible values of each object: 
*                        -  {type: 'wall'}
*                        -  {type: 'room'}
*                        -  {type: 'passage'}
*/
  
  let DungeonGenerator = {
  generator: function(size,attempts,minRoomSize,maxRoomSize){
   //validate params
   //if number of args is not 4, use default values, log to console
    if(arguments.length != 4){
      console.log('Incomplete arguments');
      size = 50;
      attempts = 1000;
      minRoomSize = 6;
      maxRoomSize = 12;
    }
    //4 arguments, validate
    else{
      //size is not an integer, set to default
      if(!Number.isInteger(size)){
        console.log('The argument "size" is not an integer.');
        size = 50;
      }
      //size is not within range, set to default
      if(size < 25 || size > 250){
        console.log('The argument "size" is not within range.');
        size = 50;
      }
      
      //attempts is not an integer, set to default
      if(!Number.isInteger(attempts)){
        console.log('The argument "attempts" is not an integer.');
        attempts = 1000;
      }
      //attempts is not within range, set to default
      else if(attempts < 50 || attempts > 2000){
        console.log('The argument "attempts" is not within range.');
        attempts = 1000;
      }
      
      //both min and maxroom are integers, check relationships between them and ranges
      if(Number.isInteger(minRoomSize) && Number.isInteger(maxRoomSize)){
        //if maxroom is out of range
          if(maxRoomSize < 4 || maxRoomSize > 20){
            //use default value
            maxRoomSize = 12;
            console.log('The argument "maxRoom" is not within range.');
          }
          
          //if minroom is out of range
          if(minRoomSize < 4 || minRoomSize > 20){
            //use default value
            minRoomSize = 6;
            console.log('The argument "minRoom" is not within range.');
          }
        
        //if minroom > maxroom
        if(minRoomSize > maxRoomSize){
          console.log('The minimum room size > maximum room size');
          // if max room is out of range
          if(maxRoomSize < 4 || maxRoomSize > 20){
            //use default values
            minRoomSize = 6;
            maxRoomSize = 12;
          }
          else{
            //set min size to max size
            minRoomSize = maxRoomSize;
          }
        }
        //if maxroom size < minroom size
        else if (maxRoomSize < minRoomSize){
          console.log('The maximum room size < minimum room size');
          //if minroom is out of range
          if(minRoomSize < 4 || minRoomSize > 20){
            //use default values
            minRoomSize = 6;
            maxRoomSize = 12;
          }
          else{
            //set maxroom size to minroom size
            maxRoomSize = minRoomSize;
          }
        }
      }
      
      }

  let blocksArray = [], padding = 2;
  for(let i = 0; i < size; i++){
      let tempArray = [];
      for(let j = 0; j < size; j++){
          let temp = {type: 'wall'};
          tempArray.push(temp);
      }
      blocksArray.push(tempArray.slice(0));
  }
  //this array will hold coordinates and dimensions of all rooms
  let rooms = [];
  //put rooms on the board
  drawRandomRooms(blocksArray,attempts,minRoomSize,maxRoomSize,padding,rooms);
  //delete connected_rooms from the 'rooms' objects. Only useful for drawing passages
  for(let i = 0;i < rooms.length; i++){
    delete rooms[i].connected_rooms;
  }
  return {dungeon: blocksArray, rooms};
  }
};
  return DungeonGenerator;
})();
