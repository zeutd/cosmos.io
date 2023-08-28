class World{
    static width = 1000;
    static height = 1000;
    static bullets = [];
    static ships = [];

    static addBullet(bullet){
        this.bullets.push(bullet);
    }
    static addShip(ship){
        this.ships.push(ship);
    }
}