class Enemy {
    constructor(x, y, scale) {
        this.enemy = createSprite(x, y, 20, 20);
        var rand = getRandom(1, 5);
        var src1 = "images/";
        var src2 = "images/";
        this.scoreToGive
        switch (rand) {
            case 1:
                src1 = src1 + "Adventurer/Poses/adventurer_walk1.png";
                src2 = src2 + "Adventurer/Poses/adventurer_walk2.png";
                this.scoreToGive = 250;
            break;
            case 2:
                src1 = src1 + "Female/Poses/female_walk1.png";
                src2 = src2 + "Female/Poses/female_walk2.png";
                this.scoreToGive = 200;
            break;
            case 3:
                src1 = src1 + "Guy/Poses/player_walk1.png";
                src2 = src2 + "Guy/Poses/player_walk2.png";
                this.scoreToGive = 300;
            break;
            case 4:
                src1 = src1 + "Soldier/Poses/soldier_walk1.png";
                src2 = src2 + "Soldier/Poses/soldier_walk2.png";
                this.scoreToGive = 350;
            break;
            case 5:
                src1 = src1 + "Zombie/Poses/zombie_walk1.png";
                src2 = src2 + "Zombie/Poses/zombie_walk2.png";
                this.scoreToGive = 400;
            break;
            default:
                break;
        };
        this.enemy.addAnimation("enemy", loadAnimation(src1, src2));
        this.enemy.scale = scale;
        this.enemy.velocityX = -speed - 4;
        this.enemy.lifetime = (canvas.width / (this.enemy.velocityX * -1)) + 10;
    }
    sting() {
        if (this.enemy.isTouching(player)) {
            lives = UIManager.removeLives(lives, 1);
            player.velocityY = -(canvas.height / 55);
            if (lives <= 0) {
                lives = 0;
            }
            console.log("Lives: " + lives);
            enemies.splice(i, 1);
            this.enemy.destroy();
        }
    }
}