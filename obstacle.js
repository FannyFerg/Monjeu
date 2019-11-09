// Fabrique à Obstacle
class Obstacle {
  constructor() {
    this.width = Math.floor(Math.random() * ( 60 - 50 + 1)) + 50;
    this.height = Math.floor(Math.random() * (100 - 40 + 1)) + 40;
    this.color = "rgb(152,107,68)";
    this.x = W - this.width;
    this.y = H - this.height - 20;
  }
  // move(){
  //   this.x -= 5;
  
  // }

  // Création des rectangles
  paint() {
    context.fillStyle = "rgb(152,107,68)";
    context.fillRect(this.x, this.y, this.width, this.height);
  }
  //Rencontre Perso + Obstacles
  hits(perso){
  return (
    (perso.x+perso.width >= this.x && perso.x <= this.x+this.width) // 
    &&
    (perso.y <= this.y+this.height && perso.y+perso.height >= this.y)
  );
  }
}
