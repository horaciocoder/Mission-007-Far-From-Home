class Obstacle {
    constructor(x, y, scale) {
        this.obstacle = createSprite(x, y, 20, 20);
        var rand = getRandom(1, 5);
        var src = "images/Obstacles/Laser ";
        switch (rand) {
            case 1:
                src = src + "Beige";
            break;
            case 2:
                src = src + "Blue";
            break;
            case 3:
                src = src + "Green";
            break;
            case 4:
                src = src + "Pink";
            break;
            case 5:
                src = src + "Yellow";
            break;
            default:
                break;
        };
        src = src + ".png";
        this.obstacle.addImage("obstacle", loadImage(src));
        this.obstacle.velocityX = -speed;
        this.obstacle.scale = scale;
        this.obstacle.lifetime = (canvas.width / (this.obstacle.velocityX * -1)) + 50;
    }
    sting() {
        if (this.obstacle.isTouching(player)) {
            lives = UIManager.removeLives(lives, 1);
            if (lives <= 0) {
                lives = 0;
            }
            console.log("Lives: " + lives);
            player.velocityY = -(canvas.height / 55);
            obstacles.splice(i, 1);
            this.obstacle.destroy();
        }
    }
}