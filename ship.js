class ShipType{
    constructor(){
        this.speed = 10;
        this.drag = 0;
        this.color = 255;
        this.bulletType = new BulletType;
    }
    create(x, y, rotation){
        let ship = new Ship(x, y, rotation, this);
        World.addShip(ship);
    }
    draw(ship){
        
    }
    update(ship){

    }
    shoot(ship){
        this.bulletType.create(ship.x, ship.y, ship.rotation + 90)
    }
}

class Ship{
    constructor(x, y, rotation, type){
        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.type = type;
        this.vel = createVector();
    }
    move(){
        this.x += this.vel.x;
        this.y += this.vel.y;
    }
    update(){
        this.type.update(this);
        this.move();
    }
    draw(){
        this.type.draw(this);
    }
    shoot(){
        this.type.shoot(this);
    }
    rotate(angle){
        this.rotation += angle;
    }
}




class BasicShipType extends ShipType{
    draw(ship){
        fill(this.color)
        noStroke();
        translate(ship.x, ship.y)
        rotate(radians(ship.rotation));
        triangle(
            0, 20,
            10, 0,
           -10, 0
        )
        triangle(
            0, -7,
            10, 0.1,
           -10, 0.1
        )
    }
}