console.log("Loaded");

var square = document.getElementsByTagName("td");
var turn_num = 0;
var floor_count = 1;
var time = 0
setup();
clock();
var position = document.getElementsByClassName("position")[0]


// To do:


//score system
//add a start/reset button
//add highscore.
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
  turn_num = (turn_num + 1)

  document.getElementById("turn-num").innerHTML = turn_num;
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



  start_square = Math.floor(Math.random() * 50)
    if(start_check < 50){
      start_stairs = square[(start_square + 50)]
    }
    else if (start_check <100) {
      start_stairs = square[start_square]

    }
  start_stairs.classList.remove("wall");
  start_stairs.classList.remove("health-3");
  start_stairs.classList.add("exit");
  start_stairs.innerHTML = "<img src = \"images/enter_lair.png\">";

}

function clear(){
  for (var i = 0; i < square.length; i++){
  tile = square[i]

  tile.classList.remove("wall", "health-3", "health-2", "health-1", "exit", "position");
  tile.innerHTML = "";}
}

function damage(target){
  health = target.classList[1]

  switch (health) {
    case "health-3":
      console.log(health);
      target.classList.remove("health-3");
      target.classList.add("health-2");
      break;
    case "health-2":
      console.log(health);
      target.classList.remove("health-2");
      target.classList.add("health-1");
      break;
    case "health-1":
      console.log(health);
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
}


function  clock(){
  setInterval(function(){
    time++;
    document.getElementById("time").innerHTML= (time )
  }, 1000);
}


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
