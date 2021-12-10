class Coin {
    constructor(x, y, scale) {
        this.coin = createSprite(x, y, scale);
        this.coin.addImage("coin", coinImg);
        this.coin.scale = scale;
        this.coin.velocityX = -speed;
        this.coin.lifetime = (canvas.width / (this.coin.velocityX * -1)) + 50;
    }
    check() {
        if (this.coin.isTouching(player)) {
            scoreToGive = 200;
            coins = UIManager.addCoins(coins, 1);
            console.log("Coins: " + coins);
            score = UIManager.addScore(score, scoreToGive);
            coinsArray.splice(i, 1);
            this.coin.destroy();
        }
    }
}