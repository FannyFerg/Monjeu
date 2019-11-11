// Fabrique perso
const gravity = 2;
class Perso {
  constructor(x,y) {

    const img = document.createElement("img");
    img.onload = () => {
      this.img = img;
      this.width = 100;
      this.height = 100;
      this.x = x;
      this.y = y;
      this.speedY = 0;
      this.speedX= 0;
    };
    img.src = "../Monjeu/images/walkingGirl.png";
  }
  jump(){
    this.speedY = -15;
  }
  forward(){
    this.speedX = 5;
  }
  backward(){
    this.speedX = -5;
  }


//direction perso 
newPosition() {

  this.x += this.speedX;
  this.y += this.speedY;
  // ne pas aller plus bas que le sol
  let sol = H - 20;
  if (this.y > sol - this.height) this.y = sol - this.height;

  // la gravité s'applique
  this.speedY += gravity;
} 
// Creation du personnage
paint() {
  if (!this.img) return;
  context.drawImage(this.img,255,0,200,250, this.x, this.y, this.width, this.height);
}
}




