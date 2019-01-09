console.log("Loaded");

var square = document.getElementsByTagName("td");
var turn_num = 0;
var floor_count = 1;
var time = 0
var gamestate = 0
var high_score = 0
var position = 0
var monster = 0
var stairs = 0


document.getElementById("Start_btn").addEventListener("click", function(event){
  if (gamestate == 0) {
    setup();
    gamestate = 1;
    position = document.getElementsByClassName("position")[0];
    monster = document.getElementsByClassName("monster")[0];
    stairs = document.getElementsByClassName("exit")[0];
    floor_count = 1;
    document.getElementById("floor_count").innerHTML = floor_count;
  } else {
    clear();
    gamestate = 0;
    turn_num = 0;
    floor_count = 0;
    document.getElementById("turn-num").innerHTML = turn_num;
    document.getElementById("floor_count").innerHTML = floor_count;
  }
})

up.addEventListener("click", function(event){
      move_up();
    });

down.addEventListener("click", function(event){
      move_down();
    });

left.addEventListener("click", function(event){
      move_left();
    });

right.addEventListener("click", function(event){
      move_right();
    });

    //Arrow key functionality
$(document).keydown(function(e){
  switch (e.which) {
    case 37:
      move_left();
      break;
    case 38:
      move_up();
      break;
    case 39:
      move_right();
      break;
    case 40:
      move_down();
      break;
    default:
  }
  e.preventDefault();
});



function move_up() {
  for (var i = 0; i < square.length; i++) {
    tile = square[i]
    if ((tile == position)&&(i<=9)) {
      target = square[i+90];
      if (target.innerHTML == "") {
        new_location = target
        move(new_location);
      }
      else if (target.classList.contains("wall")) {
        damage(target);
        new_location = position;
      }
      else if (target.classList.contains("exit")) {
        exit();
        new_location = document.getElementsByClassName("position")[0];
        return;
      }
    }
    else if (tile == position) {
      target = square[i-10];
      if (target.innerHTML == "") {
        new_location = target;
        move(new_location);
      }
      else if (target.classList.contains("wall") ) {
        damage(target);
        new_location = position;
      }
      else if (target.classList.contains("exit")) {
        exit();
        new_location = document.getElementsByClassName("position")[0];
        return;
      }
    }
  }
  position = new_location
  endturn();
};

function move_down(){
  for (var i = 0; i < square.length; i++) {
    tile = square[i]
    if ((tile == position)&&( i>= 90)) {
      target = square[i-90]
      if (target.innerHTML == "") {
        new_location = target
        move(new_location);
      }
      else if (target.classList.contains("wall")) {
        damage(target);
        new_location = position;
      }
      else if (target.classList.contains("exit")) {
        exit();
        new_location = document.getElementsByClassName("position")[0];
        return;
      }
    }
    else if (tile == position) {
      target = square[i+10]
      if (target.innerHTML == "") {
        new_location = target
        move(new_location);
      }
      else if (target.classList.contains("wall")) {
        damage(target);
        new_location = position;
      }
      else if (target.classList.contains("exit")) {
        exit();
        new_location = document.getElementsByClassName("position")[0];
        return;
      }
    }
  }
  position = new_location;
  endturn();
};

function move_left(){
  for (var i = 0; i < square.length; i++) {
    tile = square[i]
    if ((tile == position) && (i % 10 == 0)) {
      target = square[i+9]
      if (target.innerHTML == "") {
        new_location = target
        move(new_location);
      }
      else if (target.classList.contains("wall")) {
        damage(target);
        new_location = position;
      }
      else if (target.classList.contains("exit")) {
        exit();
        new_location = document.getElementsByClassName("position")[0];
        return;
      }
    }
    else if (tile == position) {
      target = square[i-1]
      if (target.innerHTML == "") {
        new_location = target;
        move(new_location, i);
      }
      else if (target.classList.contains("wall")) {
        damage(target);
        new_location = position;
      }
      else if (target.classList.contains("exit")) {
        exit();
        new_location = document.getElementsByClassName("position")[0];
        return;
      }
    }
  }
  position = new_location;
  endturn();
};

function move_right(){
  for (var i = 0; i < square.length; i++) {
    tile = square[i]
    if ((tile == position) && (((i % 10)-9) == 0)) {
      target = square[i-9]
      if (target.innerHTML == "") {
        new_location = target
        move(new_location, i);
      }
      else if (target.classList.contains("wall")) {
        damage(target);
        new_location = position;
      }
      else if (target.classList.contains("exit")) {
        exit();
        new_location = document.getElementsByClassName("position")[0];
        return;
      }
    }
    else if (tile == position) {
      target = square[i+1]
      if (target.innerHTML == "") {
        new_location = target
        move(new_location, i);
      }
      else if (target.classList.contains("wall")) {
        damage(target);
        new_location = position;
      }
      else if (target.classList.contains("exit")) {
        exit();
        new_location = document.getElementsByClassName("position")[0];
        return;
      }
    }
  }
  position = new_location;
  endturn();
};

function move(new_location){
    new_location.classList.add("position");
    position.classList.remove("position");
    position.innerHTML = "";
    new_location.innerHTML = "<img src = \"images/ironheart_preserver.png\">";
}

function endturn(){
  monsterturn();
  turn_num = (turn_num + 1)
  document.getElementById("turn-num").innerHTML = turn_num;
}

function monsterturn(){
  for (var m = 0; m < ((floor_count/5)); m++) {
    direction = Math.floor(Math.random() * 4)
    console.log(direction);
    for (var i = 0; i < square.length; i++) {
      tile = square[i]
      if (tile == monster) {
        if ((direction == 0) && (i>9)|| i>=90){
          target = square[i-10]
          monsteraction(target);
        }
        else if ((direction == 1) && (i<90) || i<=9) {
          target = square[i+10]
          monsteraction(target);
        }
        else if ((direction == 2) && (i % 10 != 0) || (((i % 10)-9) == 0)) {
          target = square[i-1]
          monsteraction(target);
        }
        else if ((direction == 3) && (((i % 10)-9) != 0) || (i % 10 == 0) ) {
          target = square[i+1]
          monsteraction(target);
        }
      }
    }
    monster = document.getElementsByClassName("monster")[0];
  }
};

function monsteraction(target){
  if ((target != stairs) && (target != position)) {
    monstermove(target);
    return target;
  }
  else if (target == position) {
    gameover();
    return;
  }
  else if (target == stairs) {
    target == monster
    return target;
  }
}

function monstermove(target){
    target.classList.add("monster");
    target.classList.remove("wall", "health-3", "health-2", "health-1" );
    monster.classList.remove("monster");
    monster.innerHTML = "";
    target.innerHTML = "<img src = \"images/deep_troll_berserker.png\">";
}

function gameover(){
  highscore();
  alert("You died, you reached floor "+ floor_count + ".")
  clear();
  floor_count=0;
  turn_num = -1;
  document.getElementById("floor_count").innerHTML = floor_count;
  document.getElementById("turn-num").innerHTML = turn_num;
  gamestate = 0;
}

function setup(){
  for (var i = 0; i < 50; i++) {
    target = Math.floor(Math.random() * 100)
    new_wall = square[target]
    new_wall.classList.add("wall");
    new_wall.classList.add("health-3");
    new_wall.innerHTML = "<img src = \"images/catacombs_0.png\">";
  }

  start_square = Math.floor(Math.random() * 100)
  start_check = start_square
  start_pos = square[start_square]
  start_pos.classList.remove("wall");
  start_pos.classList.remove("health-3");
  start_pos.classList.add("position");
  start_pos.innerHTML = "<img src = \"images/ironheart_preserver.png\">";



  start_stairs_square = Math.floor(Math.random() * 50)
    if(start_check < 50){
      start_stairs = square[(start_stairs_square + 50)]
    }
    else if (start_check <100) {
      start_stairs = square[start_stairs_square]
    }
  start_stairs.classList.remove("wall");
  start_stairs.classList.remove("health-3");
  start_stairs.classList.add("exit");
  start_stairs.innerHTML = "<img src = \"images/enter_lair.png\">";

  start_monster_square = Math.floor(Math.random() * 50)
  if (start_monster_square == start_stairs_square) {
    start_monster_square = start_monster_square + 1
  }
    if(start_check < 50){
      start_monster = square[(start_monster_square + 50)]
    }
    else if (start_check <100) {
      start_monster = square[start_monster_square]

    }
  start_monster.classList.remove("wall");
  start_monster.classList.remove("health-3");
  start_monster.classList.add("monster");
  start_monster.innerHTML = "<img src = \"images/deep_troll_berserker.png\">";
}

function clear(){
  for (var i = 0; i < square.length; i++){
  tile = square[i]

  tile.classList.remove("wall", "health-3", "health-2", "health-1", "exit", "position", "monster");
  tile.innerHTML = "";}
  var position = 0
  var monster = 0
  var stairs = 0
}

function damage(target){
  health = target.classList[1]

  switch (health) {
    case "health-3":
      target.classList.remove("health-3");
      target.classList.add("health-2");
      target.innerHTML = "<img src = \"images/catacombs_3.png\">";
      break;
    case "health-2":

      target.classList.remove("health-2");
      target.classList.add("health-1");
      target.innerHTML = "<img src = \"images/catacombs_6.png\">";
      break;
    case "health-1":

      target.classList.remove("health-1");
      target.classList.remove("wall");
      target.innerHTML = "";
      break;
    default:

  }
}

function exit (){
  clear();
  setup();
  floor_count = (floor_count + 1)
  document.getElementById("floor_count").innerHTML = floor_count;
  position = document.getElementsByClassName("position")[0];
  monster = document.getElementsByClassName("monster")[0];
  stairs = document.getElementsByClassName("exit")[0];
}

function highscore(){
  if (floor_count > high_score) {
    high_score = floor_count;
  }
  document.getElementById("high_score").innerHTML = high_score;
}
