class UIManagementTool {
    removeLives(lives, amount) {
        playerDamageSound.play();
        console.log("Player crashed and its lives are now " + (lives - amount));
        return lives - amount;
    }
    addLives(lives, amount) {
        lifeSound.play();
        console.log("Player was cured and its lives are now " + (lives + amount));
        return lives + amount;
    }
    addCoins(coins, amount) {
        coinSound.play();
        console.log("Coins: " + (coins + amount));
        return coins + amount;
    }
    addScore(score, amount) {
        showScore = true;
        var stop = setTimeout(()=> {
            showScore = false;
        }, 1000);
        console.log("+" + scoreToGive);
        return score + amount;
    }
    updateBest(newBest, oldBest) {
        console.log("New Best!");
        if (newBest > oldBest) {
            GetNewBest = true;
            return newBest;
        }
        else {
            return oldBest;
        }
    }
    setFeedbackImg() {
        var group = getRandom(1, 2);
        if (group === 1) {
        var rand = getRandom(1, 3);
        var src = "images/Feedback/Auto/";
        switch (rand) {
            case 1:
                src = src + "Awesome";
            break;
            case 2:
                src = src + "Super";
            break;
            case 3:
                src = src + "Wow";
                smaller = true;
            break;
            default:
                break;
        };
        src = src + ".png";
        return loadImage(src);
    }
    else if (group === 2) {
        var rand = getRandom(1, 5);
        var src = "images/Feedback/Trigger/";
        switch (rand) {
            case 1:
                src = src + "Bam";
                smaller = true;
            break;
            case 2:
                src = src + "Bang";
            break;
            case 3:
                src = src + "Crash";
                smaller = true;
            break;
            case 4:
                src = src + "Kapow";
                smaller = true;
            break;
            case 5:
                src = src + "Pow";
                smaller = true;
            break;
            default:
                break;
        };
        src = src + ".png";
        return loadImage(src);
    }
    }
    static updateDatabaseBest(newBest) {
        database.ref("UIManager").update({
            Best: newBest
        });
    }
    // GET BEST FROM DATABASE
    async getBest() 
    {
        await database.ref("UIManager/Best").on("value", (data)=> {
            best = data.val();
        });
    }
}
const UIManager = new UIManagementTool();