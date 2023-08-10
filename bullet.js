class BulletType{
    constructor(damage, speed){
        this.damage = damage;
        this.speed = speed;
        this.drag = 0;
        this.homing = false;
        this.homingPower = 0;
        this.homingRange = 0;
        this.w = 5;
        this.h = 10;
        this.color = 255;
    }
    create(x, y, rotation){
        let bullet = new Bullet(x, y, rotation, this);
        World.addBullet(bullet);
    }
    draw(bullet){
        
    }
    update(bullet){

    }
}
class Bullet{
    constructor(x, y, rotation, type){
        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.type = type;
        this.vel = p5.Vector.fromAngle(radians(rotation), type.speed);
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
}





class PulseBulletType extends BulletType{
    draw(bullet){
        stroke(this.color);
        strokeWeight(this.w);
        line(bullet.x, bullet.y, bullet.x + cos(radians(bullet.rotation)) * this.h, bullet.y + sin(radians(bullet.rotation)) * this.h);
    }
}