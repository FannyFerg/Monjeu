let obstacles;
let perso;
let points;
let gameover;
let frames = 0;
var levelsup;
var speed = 4;
//Mise en place du canvas
const context = document.querySelector("#game-board canvas").getContext("2d");
const W = context.canvas.width;
const H = context.canvas.height;
class win {
  constructor() {
    const img = document.createElement("img");
    img.onload = () => {
      this.img = img;
      this.width = context.canvas.width;
      this.height = context.canvas.height;
      this.x =0 ;
      this.y =0;
    
    };
    img.src = "../Monjeu/images/Win.PNG";}
    paint() {
      if (!this.img) return;
      context.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }
  var winner =new win();

class Gameover {
  constructor() {
    const img = document.createElement("img");
    img.onload = () => {
      this.img = img;
      this.width = context.canvas.width;
      this.height = context.canvas.height;
      this.x =0 ;
      this.y =0;
    
    };
    img.src = "../Monjeu/images/gameOver.png";}
    paint() {
      if (!this.img) return;
      context.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }
  var gameOver = new Gameover()
//Fonction dessiner
function draw() {
  context.clearRect(0, 0, W, H);

  // Terrain
  context.fillRect(0, 780, 800, 20);
  context.fillStyle = "rgb(152,107,68)";

  //Player
  perso.newPosition();
  perso.paint();

  //Obstacles
  if (frames % 130 === 0) {
    var obstacle = new Obstacle();
    obstacles.push(obstacle);
  }
  obstacles.forEach(function(obstacle) {
    obstacle.x -= speed;
    obstacle.paint();
  });

  if(points === 6000){
    speed = 10;
    console.log("niv 2")
  }
  if(points === 8000){
    speed =12;
    console.log("niv 3")
  }
  if(points === 12000){
    gameover = true;
    win = true;
    console.log("niv winner")
  }
  
  for (obstacle of obstacles) {
    if (obstacle.hits(perso)) {
      gameover = true;
      win = false;
    }}
  //Collision

  //Points
  context.font = "50px Arial";
  context.textAlign = "right";
  context.fillStyle = "rgb(152,107,68)";
  context.fillText(`${points} pts`, W - 50, 100);
  points++;
  

}

const pressed = {
  space: false,
  arrowleft: false,
  arrowright: false,
}

document.onkeydown = function(e) {
  if(!perso) return;

  switch (e.keyCode) {
    case 32:
      if (pressed.space) return;
      pressed.up = true;
      perso.jump();
      break;
    case 37: // left arrow
      if (pressed.arrowleft) return;
      pressed.arrowleft = true;
      perso.backward();
      break;
    case 39: // right arrow
      if (pressed.arrowright)return;
      pressed.right = true;
      perso.forward();
      break;
  }
};
document.onkeyup = function(e){
  //if (!perso) return;
  switch (e.keyCode){
    // SPACE
    case 32:
      pressed.space = false;
      break;
    case 37: 
      pressed.arrowleft = false;
      perso.speedX = 0;
      break;
    case 39:
      pressed.arrowright = false;
      perso.speedX = 0;
      break;
  }}

function animLoop() {
  draw();
  frames++;
  if (!gameover) {
    requestAnimationFrame(animLoop);
  } 
  else if (points === 12000) {
    context.clearRect(0, 0, W, H);
    win.paint();
  }   // ecran win
  
  else {
      console.log('perdu');
      context.clearRect(0, 0, W, H);
      gameOver.paint();
       // ecran lose
    }

    
  }


function startGame() {
  gameover = false;
  points = 0;
  perso = new Perso(0,710);
  obstacles = [];
  requestAnimationFrame(animLoop);
}

const $start = document.getElementById("start-button");
$start.onclick = function() {
  startGame();
  $start.blur();
};
