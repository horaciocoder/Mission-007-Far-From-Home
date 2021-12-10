class Bullet {
    constructor(x, y, scale, type) {
        this.bullet = createSprite(x, y, 20, 20);
        this.bullet.velocityX = -speed - 6;
        this.bullet.lifetime = (canvas.width * (3/4)) / (this.bullet.velocityX * -1);
        this.bullet.scale = scale;
        this.type = type;
        if (this.type === "Player") {
            this.bullet.velocityX = speed + 6;
            this.bullet.addImage(loadImage("images/Bullet/Player.png"));
        }
        else if (this.type === "Enemy") {
            this.bullet.velocityX = -speed -10;
            this.bullet.addImage(loadImage("images/Bullet/Enemy.png"));
        }
    }
    shock() {
        if (this.type !== null) {
        var destroyed = false;
        if (this.type === "Player" && GameStateManager.compareState(gameState, PLAY)) {
            for (let x = 0; x < enemies.length; x++) {
            if (enemies[i] !== undefined) {
            if (destroyed === false && this.bullet.isTouching(enemies[i].enemy)) {
                scoreToGive = enemies[i].scoreToGive;
                enemies[i].enemy.lifetime = 1;
                enemies.splice(i, 1);
                bullets.splice(i, 1);
                score = UIManager.addScore(score, scoreToGive);
                destroyed = true;
                bulletActive = false;
                this.bullet.destroy();
                defeatSound.play();
                defeatSound2.play();
            }
            }
        }
        }
        else if (this.type === "Enemy" && GameStateManager.compareState(gameState, PLAY)) {
            if (this.bullet.isTouching(player)) {
                player.velocityY = -(canvas.height / 55);
                lives = UIManager.removeLives(lives, 1);
                this.bullet.lifetime = 0;
            }
        }
        }
    }
}