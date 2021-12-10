class Life {
    constructor(x, y, scale) {
        this.life = createSprite(x, y, 20, 20);
        this.life.addImage("life", lifeImg);
        this.life.velocityX = -speed;
        this.life.scale = scale;
        this.life.lifetime = (canvas.width / (this.life.velocityX * -1)) + 50;
    }
    check() {
        if (this.life.isTouching(player)) {
            lives = UIManager.addLives(lives, 1);
            if (lives >= 3) {
                lives = 3;
            };
            console.log("Lives: " + lives);
            scoreToGive = 150;
            score = UIManager.addScore(score, scoreToGive);
            livesArray.splice(i, 1);
            this.life.destroy();
        }
    }
}