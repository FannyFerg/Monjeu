var obstacle =[]
//Mise en place du canvas 
var decorjeux = {
  canvas: document.createElement("canvas"),
  frames: 0,
  start: function() {
    this.canvas.width = 900;
    this.canvas.height = 500;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    
    // call updateGameArea() every 20 milliseconds
    this.interval = setInterval(updatedecorjeux, 20);
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
 
}
function terrain(){
      var ctx = decorjeux.context;
      var W = decorjeux.canvas.width;
      var H = decorjeux.canvas.height;

      ctx.fillRect(0,480, 900, 20);
      ctx.fillStyle = "brown";
    
  }
// Fabrique perso
class Perso {
  constructor(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.speedX = 0;// Vitesse de x
    this.speedY = 0
    
  }
//direction perso 
newPosition() {
  this.x += this.speedX;
  this.y += this.speedY;
}
left() {
  return this.x;
}
right() {
  return this.x + this.width;
}
// Creation des rectangles 
  paint() {
    var ctx = decorjeux.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
var player = new Perso(50, 50, "black", 0,430);
document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 37: // left arrow
      player.speedX -= 1;
      break;
    case 39: // right arrow
      player.speedX += 1;
      break;
  }
};
// Fabrique à Obstacle 
class Obstacles {
  constructor(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    
  }

// Creation des rectangles 
  paint() {
    var ctx = decorjeux.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}


function updatedecorjeux() {
  decorjeux.clear();
  majobstacle();
  terrain();
  player.paint();
  player.newPosition();

}


  function majobstacle() {
    for (i = 0; i < obstacle.length; i++) {
      obstacle[i].x += -1;
      obstacle[i].paint();
    }
  
  //definition du décor
    decorjeux.frames += 1;
    if (decorjeux.frames % 250 === 0) {
      var W = decorjeux.canvas.width;
      var H = decorjeux.canvas.height;
  
      var minHeight = 40
      var maxHeight = 100;
      var height = Math.floor(Math.random() * (maxHeight - minHeight + 1));//définis de manière aléatoire la taille des obstacles
      
      obstacle.push(new Obstacles(110, height , "rgb(152,107,68)", 480, H-height )); //Creation des Obstacles  
    }
  }
 
  //Iteration #6: points
function points(){
  const W = ctx.canvas.width;
  ctx.font = "50px Arial";
  ctx.textAlign = "right";
  ctx.fillStyle = "orange";
  ctx.fillText(`${points} pts`, W-50, 100);
  points++;

}

document.getElementById("start-button").onclick=function(){
  decorjeux.start();
};
decorjeux.start();