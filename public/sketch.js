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
let tx = 0;
let ty = 0;

let world;

var socket;

function setup() {
  createCanvas(windowWidth, windowHeight);
  socket = io.connect('http://localhost:3000');
  ShipTypes.load();
  //BulletTypes.pulse.create(0, 0, 90);
  ShipTypes.basicShip.create(0, 0, 90);
  Tmpv1 = createVector();
  Tmpv2 = createVector();
  Tmpv3 = createVector();
  noCursor();
}
function draw() {
  requestPointerLock();
  background(26);
  pixelDensity(displayDensity());
  tx = lerp(tx, World.ships[0].x, 0.1)
  ty = lerp(ty, World.ships[0].y, 0.1)
  translate(width / 2 - tx, height / 2 - ty);
  //translate(width / 2, height / 2);
  for (let i = 0; i < World.bullets.length; i++) {
    World.bullets[i].update();
    World.bullets[i].draw();
    if(abs(World.bullets[i].x) > width / 2 || abs(World.bullets[i].y) > height / 2){
      World.bullets.splice(i, 1)
    }
  }
  if(keyIsDown(87) && keyIsPressed){
    //Tmpv1.set(createVector(mouseX - pmouseX, mouseY - pmouseY)).normalize().mult(10);
    Tmpv1.set(createVector(movedX, movedY)).normalize().mult(10);
    Tmpv2.set(Tmpv1).sub(World.ships[0].vel).limit(0.005 * Tmpv1.mag() * deltaTime)
    World.ships[0].vel.add(Tmpv2);
    //let angleTarget = atan2(mouseY - height / 2, mouseX - width / 2);
    let angleTarget = World.ships[0].vel.heading();
    World.ships[0].rotation = degrees(angleTarget) - 90;
  }
  World.ships[0].vel.mult(0.99);
//print(Tmpv2.mag());
for (let i = 0; i < World.ships.length; i++) {
  World.ships[i].update();
  World.ships[i].draw();
}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed(){
  World.ships[0].shoot();
}
