class BulletTypes{
  static pulse = new PulseBulletType(10, 10);
}
class ShipTypes{
  static basicShip = new BasicShipType();

  static load(){
    this.basicShip.bulletType = BulletTypes.pulse;
  }
}
let Tmpv1;
let Tmpv2;
let Tmpv3;
function setup() {
  createCanvas(windowWidth, windowHeight);
  ShipTypes.load();
  BulletTypes.pulse.create(0, 0, 90);
  ShipTypes.basicShip.create(0, 0, 90);
  Tmpv1 = createVector();
  Tmpv2 = createVector();
  Tmpv3 = createVector();
}
function draw() {
  background(26);
  pixelDensity(displayDensity())
  //translate(width / 2 - World.ships[0].x, height / 2 - World.ships[0].y);
  translate(width / 2, height / 2)
  for (let i = 0; i < World.bullets.length; i++) {
    World.bullets[i].update();
    World.bullets[i].draw();
    if(abs(World.bullets[i].x) > width / 2 || abs(World.bullets[i].y) > height / 2){
      World.bullets.splice(i, 1)
    }
  }
  Tmpv1.set(mouseX - width / 2, mouseY - height / 2).normalize().mult(10);
  Tmpv2.set(Tmpv1).sub(World.ships[0].vel).limit(10 * Tmpv1.length * deltaTime)
  World.ships[0].vel.add(Tmpv2);
  for (let i = 0; i < World.ships.length; i++) {
    World.ships[i].update();
    World.ships[i].draw();
    World.ships[i].rotate(1);
    if(frameCount % 100 == 0)World.ships[i].shoot();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
