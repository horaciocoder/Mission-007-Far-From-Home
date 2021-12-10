/*
Copyright © All Rights Reserved
Every single line of code written by Horacio Ruggeri Ruiz, owner of Boom Games.
This game was finished December 6th, 2021.
Meet Jacub, Bloomy, Nam-Nam, Fleena and Taz, five heroes that are going to save
the world from the invasion of foreign aliens, that disguise themselves as humans and even zombies!
Get on this amazing journey, trust me, you'll never regret!
Enjoy!!

Mission 007: Far From Home version 1.0.1 is currently owned by Boom Games (owned by Horacio Ruggeri Ruiz).

*/ 

// VARIABLES
var screenWidth, screenHeight, canvas;
var ground;
var bgImagePosX = 0, bgImage;
var player;
var playerImg;
var yellow = false;
var pink = false;
var obstacles = [];
var obs;
var enemies = [];
var i;
var lives, livesArray = [], lifeImg;
var coins, coinsArray, coinImg;
var UILives = [];
var speed = 0;
var bullets = [];
var enemyBullets = [];
var bulletActive = false;
var UICoin, UICoinText;
var score, UIScore;
var scoreToGive;
var showScore, showedScorePos;
var gameState;
var best;
var GetNewBest;

// CONSTANTS
const PAUSE = -1, INTRO = 0, MENU = 1, PLAY = 2, OVER = 3, SET = -2;

// OTHER VARIABLES
var GDD;
var UIFont;
var retryButton, retryImg;
var playerOverImg;
var titleColor, subtitleColor, groundColor, increaseRate, decreaseRate, rate;
var LOGOImg;
var upRate, upRate;
var mainMenuGround, mainMenuPlayer;
var blue = false;
var jumpTrigger = false;
var playButton, playImg, reloadButton, reloadImg;
var pauseButton, pauseImage, pausePanel;
var pausedFrameCount;
var resumeButton, resumeImg;
var menuButton, menuImg;
var introLogo;
var introLogoSize, introLogoAlpha;
var duration;
var instructions, giveInstructions;
var alphaRate;
var nameVerified, nameColor;
var menuBgMusic, menuPlaying;
var feedbackImg, feedbackSound, feedbackPlaying;
var smaller;
var gameBgMusic, gameBgPlaying;
var gameOverSound, gameOverPlaying;
var pauseMusic, pausePlaying;
var playButtonSound, menuButtonSound, pauseButtonSound;
var playerDamageSound, coinSound, lifeSound;
var noShootSound, shootSound, defeatSound, defeatSound2;
var jumpButton, jumpImg, unactiveJumpImg, jumpSound;
var bulletButton, emptyBulletImg, fullBulletImg;
var enemyShootSound;
var introSound, introPlaying;
var touches = [];

var database;

// PRE-DEFINED BY P5 ASYNC FUNCTION CALLBACK
function preload() {
    smaller = false;
    database = firebase.database();
    if (database !== null) {
        UIManager.getBest();
    }
    bgImage = loadImage("images/Cyber City.png");
    var rand = getRandom(1, 5);
    var src= "images/Player/";
    switch (rand) {
        case 1:
            src = src + "Beige";
            nameVerified = "Nam-Nam";
        break;
        case 2:
            src = src + "Blue";
            nameVerified = "Jacub";
            blue = true;
        break;
        case 3:
            src = src + "Green";
            nameVerified = "Taz";
        break;
        case 4:
            src = src + "Pink";
            nameVerified = "Fleena";
            pink = true;
        break;
        case 5:
            src = src + "Yellow";
            nameVerified = "Bloomy";
            yellow = true;
        break;
        default:
            break;
    };
    src = src + ".png";

    playerImg = loadImage(src);

    console.log("Character: " + nameVerified);
    coinImg = loadImage("images/UI/Coin.png");

    lifeImg = loadImage("images/UI/Life.png");

    UIFont = loadFont("fonts/Distant Galaxy.ttf");

    retryImg = loadImage("images/UI/Retry Button.png");

    LOGOImg = loadImage("images/UI/Boom Games LOGO.png");

    playImg = loadImage("images/UI/Play Button.png");

    reloadImg = loadImage("images/UI/Reload Button.png");

    pauseImage = loadImage("images/UI/Pause Button.png");

    resumeImg = loadImage("images/UI/Resume Button.png");

    menuImg = loadImage("images/UI/Menu Button.png");

    jumpImg = loadImage("images/UI/Jump Button.png");
    unactiveJumpImg = loadImage("images/UI/Unactive Jump Button.png");

    emptyBulletImg = loadImage("images/UI/Empty Bullet Button.png");
    fullBulletImg = loadImage("images/UI/Full Bullet Button.png");

    feedbackImg = UIManager.setFeedbackImg();

    feedbackSound = loadSound("audio/Menu/Feedback.mp3");

    menuBgMusic = loadSound("audio/Menu/Menu BG Music.mp3");
    gameBgMusic = loadSound("audio/Game/bg/Game BG Music.mp3");

    gameOverSound = new Audio();
    gameOverSound.src = "audio/Game/Game Over/Game Over.mp3";

    pauseMusic = loadSound("audio/Pause/Pause Music.mp3");
    
    playButtonSound = new Audio();
    playButtonSound.src = "audio/Buttons/Play Button.mp3";

    menuButtonSound = new Audio();
    menuButtonSound.src = "audio/Buttons/Menu Button.mp3";

    pauseButtonSound = new Audio();
    pauseButtonSound.src = "audio/Buttons/Pause Button.mp3";

    playerDamageSound = new Audio();
    playerDamageSound.src = "audio/Game/Player/Crash.mp3";

    coinSound = new Audio();
    coinSound.src = "audio/Game/Player/Coin.mp3";

    lifeSound = new Audio();
    lifeSound.src = "audio/Game/Player/Life.mp3";

    noShootSound = new Audio();
    noShootSound.src = "audio/Game/Player/No Shoot.mp3";

    shootSound = new Audio();
    shootSound.src = "audio/Game/Player/Shoot.mp3";

    defeatSound = new Audio();
    defeatSound.src = "audio/Game/Player/Defeat.mp3";

    defeatSound2 = new Audio();
    defeatSound2.src = "audio/Game/Player/Defeat Sound 2.mp3";

    jumpSound = new Audio();
    jumpSound.src = "audio/Game/Player/Jump.mp3";

    introSound = new Audio();
    introSound.src = "audio/Intro/Intro.mp3";

    enemyShootSound = new Audio();
    enemyShootSound.src = "audio/Enemy/Shoot.mp3";
};

// PRE-DEFINED BY P5 FUNCTION CALLBACK
function setup() {
    screenWidth = window.innerWidth - 25;
    screenHeight = window.innerHeight - 25;
    canvas = createCanvas(screenWidth, screenHeight);
    console.log("Canvas: Width: " + canvas.width + ", Height: " + canvas.height);
    ground = createSprite(canvas.width / 2, canvas.height - 25, canvas.width * 2, 50);
    ground.visible = false;
    player = createSprite(canvas.width * (1/4), canvas.height * (3/4), 50, 50);
    player.addImage("player", playerImg);
    player.scale = canvas.width / 1200;
    if (yellow && canvas.height > 550) {
        player.scale = canvas.width / 1300;
    }
    else if (yellow) {
        player.scale = canvas.width / 1100;
    }
    else if (pink && canvas.height > 550) {
        player.scale = canvas.width / 1400;
    }
    lives = 3;
    console.log("Lives: " + lives);
    coins = 0;
    score = 0;
    coinsArray = [];
    var UILifePosX = 70;
    for (let x = 0; x < 3; x++) {
        var l = createSprite(UILifePosX, 50, 20, 20);
        l.scale = ((canvas.width + canvas.height) / 2) / 11000;
        l.addImage("life", lifeImg);
        UILives.push(l);
        if (canvas.width > 900) {
        UILifePosX += canvas.width / 12.5;
        }
        else {
        UILifePosX += canvas.width / 7.5;
        }
    }
    showScore = false;
    showedScorePos = canvas.height / 3;
    gameState = GameStateManager.setState(SET);
    best = 0;
    GetNewBest = false;
    textFont(UIFont);
    retryButton = createSprite(canvas.width / 2, canvas.height * (4/5), 20, 20);
    retryButton.addImage("retry", retryImg);
    retryButton.scale = (canvas.width + canvas.height / 2) / 9000;
    retryButton.visible = false;
    playerOverImg = createSprite(canvas.width / 2, canvas.height * (0.85/2), 20, 20);
    playerOverImg.addImage(playerImg);
    playerOverImg.scale = (player.scale * 0.8);
    playerOverImg.visible = false;
    increaseRate = 255;
    decreaseRate = 0;
    rate = true;
    upperRate = 0;
    upRate = true;

    mainMenuGround = new Ground(canvas.width / 1.18, canvas.height * (6/7), canvas.width / 4, canvas.height * (1/6));
    if (canvas.width > canvas.height) {
    if (blue === true) {
        mainMenuPlayer = new Player(canvas.width / 1.18, canvas.height * (4/7), canvas.width / 12, canvas.height / 5, playerImg);
    }
    else {
        mainMenuPlayer = new Player(canvas.width / 1.18, canvas.height * (4/7), canvas.width / 12, canvas.height / 6, playerImg);
    }
}
    else if (canvas.height > canvas.width) {
        if (blue === true) {
            mainMenuPlayer = new Player(canvas.width / 1.18, canvas.height * (4/7), canvas.width / 6, canvas.height / 5, playerImg);
        }
        else {
            mainMenuPlayer = new Player(canvas.width / 1.18, canvas.height * (4/7), canvas.width / 6, canvas.height / 6, playerImg);
        }
    }

    playButton = createSprite(canvas.width / 2, canvas.height / 2, 20, 20);
    playButton.addImage("play", playImg);
    playButton.scale = (canvas.width + canvas.height) / 7000;
    playButton.visible = true;

    reloadButton = createSprite(canvas.width * (9/10), canvas.height  / 10, 20, 20);
    reloadButton.addImage("reload", reloadImg);
    reloadButton.scale = (canvas.width + canvas.height) / 25000;
    reloadButton.visible = true;

    pauseButton = createSprite(canvas.width / 2.2, canvas.height / 10, 20, 20);
    pauseButton.addImage("pause", pauseImage);
    pauseButton.visible = false;
    pauseButton.scale = ((canvas.width + canvas.height) / 2) / 7000;

    resumeButton = createSprite(canvas.width / 2, canvas.height * (3/4), 20, 20);
    resumeButton.addImage("resume", resumeImg);
    resumeButton.scale = ((canvas.width + canvas.height) / 2) / 5000;
    resumeButton.visible = false;
    
    menuButton = createSprite(canvas.width / 1.8, canvas.height / 10, 20, 20);
    menuButton.addImage("menu", menuImg);
    menuButton.scale = ((canvas.width + canvas.height) / 2) / 1500;
    menuButton.visible = false;

    jumpButton = createSprite(canvas.width * (14/15), canvas.height / 3, 20, 20);
    jumpButton.addImage("jump", jumpImg);
    jumpButton.addImage("unactive", unactiveJumpImg);
    jumpButton.changeImage("jump");
    jumpButton.scale = ((canvas.width + canvas.height) / 2) / 5000;
    jumpButton.visible = false;

    bulletButton = createSprite(canvas.width * (14/15), canvas.height / 3 + (jumpButton.height * jumpButton.scale) + 50, 20, 20);
    bulletButton.addImage("empty", emptyBulletImg);
    bulletButton.addImage("full", fullBulletImg);
    bulletButton.changeImage("full");
    bulletButton.scale = ((canvas.width + canvas.height) / 2) / 5000;
    bulletButton.visible = false;

    introLogoSize = ((canvas.width + canvas.height) / 2) / 10;
    introLogoAlpha = 0;
    alphaRate = true;
    feedbackPlaying = false;
    menuPlaying = true;
    gameBgPlaying = false;
    gameOverPlaying = false;
    pausePlaying = false;
    giveInstructions = false;
    introPlaying = false;
    if (GDD == null) { 
    GDD = window.open("GDD/Game Design Document.html");
    }
}

// PRE-DEFINED BY P5 INTERVAL FUNCTION CALLBACK
function draw() {
    background(0);
    UIManager.getBest();
    if (GameStateManager.compareState(gameState, SET)) {
        StartSettings();
    }
    else if (GameStateManager.compareState(gameState, INTRO)) {
        IntroSettings();
    }
    else if (GameStateManager.compareState(gameState, MENU)) {
        MainMenuSettings();
    }
    else if (GameStateManager.compareState(gameState, PLAY)) {
    backgroundSettings();
    GameSettings();
    UISettings();
    }
    else if (GameStateManager.compareState(gameState, OVER)) {
        GameOverSettings();
    }
    else if (GameStateManager.compareState(gameState, PAUSE)) {
        PauseSettings();
    }
    drawSprites();
}

// START SETTINGS
function StartSettings() {
    if (player.visible) {
        player.visible = false;
    }
    if (playButton.visible) {
        playButton.visible = false;
    }
    for (let x = 0; x < UILives.length; x++) {
        if (UILives[x].visible) {
            UILives[x].visible = false;
        }
    }
    if (reloadButton.visible) {
        reloadButton.visible = false;
    }

    textAlign(CENTER);
    textSize(Math.sqrt((canvas.width + canvas.height) / 2) * 1.5);
    fill("#FFFFFF");
    text("Click to Play!", canvas.width / 2, canvas.height / 2);

    if (touched() && GameStateManager.compareState(gameState, SET) || mouseWentDown("left") && GameStateManager.compareState(gameState, SET)|| mouseWentDown("right") && GameStateManager.compareState(gameState, SET)) {
        gameState = GameStateManager.setState(INTRO);
    }
}

// GAME INTRO
function IntroSettings() {
    if (!introPlaying) {
        introSound.play();
        introPlaying = true;
    }
    console.log("BOOM Games Presents:");
    if (player.visible) {
        player.visible = false;
    }
    if (playButton.visible) {
        playButton.visible = false;
    }
    for (let x = 0; x < UILives.length; x++) {
        if (UILives[x].visible) {
            UILives[x].visible = false;
        }
    }
    if (reloadButton.visible) {
        reloadButton.visible = false;
    }
    introLogoSize += 2.5;
    if (introLogoAlpha < 255 && alphaRate) {
        introLogoAlpha += 10;
    }
    if (introLogoAlpha >= 255) {
        alphaRate = false;
    }
    if (introLogoAlpha > 0 && alphaRate === false) {
        introLogoAlpha -= 10;
    }
    imageMode(CENTER);
    tint(255, introLogoAlpha);
    introLogo = image(LOGOImg, canvas.width / 2, canvas.height / 2, introLogoSize * 2.5, introLogoSize);
    if (GameStateManager.compareState(gameState, INTRO)) {
    duration = setTimeout(()=> {
        if (GameStateManager.compareState(gameState, INTRO)) {
              giveInstructions = true;
            }
    }, 3000);
}
    if (giveInstructions) {
        fill("white");
        textAlign(CENTER);
        textSize(Math.sqrt((canvas.width + canvas.height) / 2) * 1.5);
        text("Boom Games Presents...", canvas.width / 2, canvas.height / 3);
        instructions = setTimeout(()=> {
            if (GameStateManager.compareState(gameState, INTRO)) {
                giveInstructions = false;
                menuBgMusic.loop();
            if (!menuBgMusic.isPlaying()) {
                menuBgMusic.play();
            }
                gameState = GameStateManager.setState(MENU);    
        }
    }, 2000);
    }
}

// MAIN MENU
function MainMenuSettings() {
    clear();
    clearTimeout(duration);
    bulletActive = false;
    playButton.visible = true;
    if (reloadButton.visible === false) {
        reloadButton.visible = true;
    }
    if (!jumpButton.visible) {
        jumpButton.visible = !false;
    } 
    if (bulletButton.visible) {
        bulletButton.visible = false;
    }
    for (i = 0; i < obstacles.length; i++) {
        obstacles[i].obstacle.destroy();
        obstacles.splice(i, 1);
    }
    for (i = 0; i < enemies.length; i++) {
        enemies[i].enemy.destroy();
        enemies.splice(i, 1);
    }
    for (i = 0; i < coinsArray.length; i++) {
        coinsArray[i].coin.destroy();
        coinsArray.splice(i, 1);
    }
    for (i = 0; i < livesArray.length; i++) {
        livesArray[i].life.destroy();
        livesArray.splice(i, 1);
    }
    for (i = 0; i < bullets.length; i++) {
        bullets[i].bullet.destroy();
        bullets.splice(i, 1);
    }
    for (i = 0; i < enemyBullets.length; i++) {
        enemyBullets[i].bullet.destroy();
        enemyBullets.splice(i, 1);
    }
    if (player.visible === true) {
        player.visible = false;
    }
    image(bgImage, 0, 0, canvas.width, canvas.height);
    if (increaseRate < 255 && rate) {
        increaseRate += 5;
        decreaseRate -= 5;
    }
    if (increaseRate === 255) {
        rate = false;
    }
    if (increaseRate > 0 && rate === false) {
        increaseRate -= 5;
        decreaseRate += 5;
    }
    if (increaseRate === 0) {
        rate = true;
    }
    titleColor = color(0, increaseRate, increaseRate);
    fill(titleColor);
    textAlign(CENTER);
    textSize((canvas.width + canvas.height) / 30);
    strokeWeight((canvas.width + canvas.height) / 300);
    stroke(decreaseRate);
    for (let x = 0; x < UILives.length; x++) {
        UILives[x].visible = false;
    }
    text("Mission 007: Far From Home", canvas.width / 2, canvas.height / 3.5);
    textSize((canvas.width + canvas.height) / 60);
    subtitleColor = color(0, increaseRate, decreaseRate);
    fill(subtitleColor);
    stroke(increaseRate);
    text("By: Horacio Ruggeri Ruiz", canvas.width / 2, canvas.height * (4/5));
    imageMode(CENTER);
    push();
    if (upperRate < 30 && upRate) {
        upperRate += 1;
    }
    if (upperRate === 30) {
        upRate = false;
    }
    if (upperRate > -30 && upRate === false) {
        upperRate -= 1;
    }
    if (upperRate === -30) {
        upRate = true;
    }
    translate(0, upperRate);
    if (canvas.width > canvas.height) {
        image(LOGOImg, canvas.width / 7, canvas.height * (3/4), canvas.width / 4, canvas.height / 4);
    }
    else if (canvas.height > canvas.width) {
        image(LOGOImg, canvas.width / 8, canvas.height * (3/4), canvas.width / 4, canvas.height / 8);
    }
    pop();
    groundColor = color(decreaseRate, 0, 0);
    fill(groundColor);
    mainMenuGround.display();
    if (jumpTrigger) {
        if (mainMenuPlayer.body.position.y > canvas.height / 2) {
            Body.applyForce(mainMenuPlayer.body, mainMenuPlayer.body.position, {x: 0, y: -(canvas.height / 275)});
        }
        else if (mainMenuPlayer.body.position.y < canvas.height / 2) {
            jumpTrigger = false;
            jumpButton.changeImage("jump");
        }
    }
    if (keyWentDown("space") || mousePressedOver(jumpButton) || touchTarget(jumpButton)) {
        jumpTrigger = true;
        jumpButton.changeImage("unactive");
        jumpSound.play();
    }
    mainMenuPlayer.display();
    switch (nameVerified) {
        case "Nam-Nam":
            nameColor = color(increaseRate, increaseRate, increaseRate);
        break;
        case "Jacub":
            nameColor = color(0, increaseRate, increaseRate);
        break;
        case "Taz":
            nameColor = color(0, increaseRate, (increaseRate / 2));
        break;
        case "Fleena":
            nameColor = color(increaseRate, (increaseRate / 2), increaseRate);
        break;
        case "Bloomy":
            nameColor = color(increaseRate, increaseRate, 0);
        break;
        default:
            break;
    };
    fill(nameColor);
    stroke(decreaseRate);
    text(nameVerified, mainMenuPlayer.body.position.x, mainMenuPlayer.body.position.y - (canvas.height / 7));
    if (mousePressedOver(playButton) || touchTarget(playButton)) {
        touches = [];
        clear();
        clearTimeout(duration);
        playButton.visible = false;
        reloadButton.visible = false;
        player.visible = true;
        pauseButton.visible = true;
        menuButton.visible = true;
        frameCount = 0;
        playButtonSound.play();
        gameState = GameStateManager.setState(PLAY);
    }
    imageMode(CENTER);
    if (smaller === false && frameCount % 50 < 15) {
        image(feedbackImg, canvas.width / 7, canvas.height / 2.25, canvas.width / 5, canvas.height / 5);
        if (feedbackPlaying === false) {
            feedbackSound.play();
            feedbackPlaying = true;
        }
    }
    else if (smaller === !false && frameCount % 50 < 15) {
        image(feedbackImg, canvas.width / 7, canvas.height / 2.25, canvas.width / 5, canvas.height / 3);
        if (feedbackPlaying === false) {
            feedbackSound.play();
            feedbackPlaying = true;
        }
    }
    else {
        smaller = false;
        feedbackPlaying = false;
        feedbackImg = UIManager.setFeedbackImg();
    }
    if (mousePressedOver(reloadButton) || touchTarget(reloadButton)) {
        if (GDD !== null) {
        GDD.close();
        }
        window.location.reload();
    }
    if (menuPlaying === false) {
        menuBgMusic.loop();
        menuPlaying = true;
    }
    if (gameBgPlaying)
        gameBgPlaying = false;
        gameBgMusic.stop();
}

// BACKGROUND
function backgroundSettings() {
    speed = 5 + (frameCount / 500);
    if (speed >= 50) {
        speed = 50;
    }
    image(bgImage, bgImagePosX, 0, canvas.width, canvas.height);
    image(bgImage, bgImagePosX + canvas.width, 0, canvas.width, canvas.height);
    bgImagePosX -= speed;
    if (bgImagePosX <= -canvas.width) {
        bgImagePosX = 0;
    }
}

// USER INTERFACE SETTINGS
function UISettings() {
    if (jumpButton.visible === false) {
        jumpButton.visible = true;
    }
    switch (lives) {
        case 3:
            for (i = 0; i < UILives.length; i++) {
                UILives[i].visible = true;
            }
        break;
        case 2:
            for (i = 0; i < UILives.length - 1; i++) {
                UILives[i].visible = true;
            }
            UILives[2].visible = false;
        break;
        case 1:
            for (i = 1; i < UILives.length; i++) {
                UILives[i].visible = false;
            }
            UILives[0].visible = true;
        break;
        default:
            for (i = 0; i < UILives.length; i++) {
                UILives[i].visible = false;
            }
        break;
    };
    imageMode(CENTER);
    textAlign(CENTER);
    fill("#00FF00");
    textSize(Math.sqrt((canvas.width + canvas.height) / 0.5));
    UICoin = image(coinImg, UILives[0].x, UILives[0].y + canvas.height / 5, ((canvas.width + canvas.height) / 2) / 10, ((canvas.width + canvas.height) / 2) / 10);
    UICoinText = text(coins, UILives[0].x + canvas.width / 10, UILives[0].y + canvas.height / 4.125 - 5);
    fill("#FFFF00");
    UIScore = text("Score: " + score,  canvas.width - (canvas.width / 5), canvas.height / 7.5);
    if (mousePressedOver(pauseButton)) {
        pausedFrameCount = frameCount;
        pauseButtonSound.play();
        touches = [];
        gameState = GameStateManager.setState(PAUSE);
    }
}

// GAME SETTINGS
function GameSettings() {
    if (jumpButton.visible !== true) {
        jumpButton.visible = true;
    }
    if (bulletButton.visible !== true) {
        bulletButton.visible = true;
    }
    if (touchTarget(pauseButton)) {
        pausedFrameCount = frameCount;
        pauseButtonSound.play();
        touches = [];
        gameState = GameStateManager.setState(PAUSE);
    }
    if (gameOverPlaying) {
        gameOverPlaying = false;
    }
    if (menuPlaying) {
    menuBgMusic.stop();
    menuPlaying = false;
    }
    if (gameBgPlaying === false) {
        gameBgMusic.loop();
        gameBgPlaying = true;
    }
    if (pausePlaying) {
        pauseMusic.stop();
        pausePlaying = false;
    }
    menuButton.x = canvas.width / 1.8;
    menuButton.y = canvas.height / 10;
    if (mousePressedOver(menuButton) || touchTarget(menuButton)) {
        menuButton.visible = false;
        touches = [];
        ReturnToMenuSettings();
    }
    if (lives <= 0) {
        if (!GameStateManager.compareState(OVER)) {
            player.visible = false;
        }
        gameState = GameStateManager.setState(OVER);
    }
    player.x = canvas.width * (1/4);
    //console.log(player.y);
    if (player.y >= (canvas.height * 0.68)) {
        if (keyDown("space") || mousePressedOver(jumpButton) || touchTarget(jumpButton)) {
        Jump(canvas.height / 50);
        }
        jumpButton.changeImage("jump");
    }
    else {
        jumpButton.changeImage("unactive");
    }
    Gravity(3);
    player.collide(ground);
    if (frameCount % 200 === 0) {
        spawnObstacle();
    }
    if (frameCount % 170 === 0) {
        spawnEnemy();
    }
    if (frameCount % 250 === 0) {
        spawnUI();
    }
    if (bulletActive === false) {
        if (mousePressedOver(bulletButton) || touchTarget(bulletButton)) {
        spawnBullet("Player");
        bulletActive = true;
        }
        bulletButton.changeImage("full");
    }
    else if (bulletActive === true) {
        if (mousePressedOver(bulletButton) || touchTarget(bulletButton)) {
        noShootSound.play();
        }
        bulletButton.changeImage("empty");
    }
    for (i = 0; i < obstacles.length; i++) {
        if (obstacles[i].obstacle.lifetime <= 0) {
            obstacles.splice(i, 1);
        }
        else {
        obstacles[i].sting();
        }
    }
    for (i = 0; i < enemies.length; i++) {
        if (enemies[i].enemy.lifetime <= 0) {
            enemies.splice(i, 1);
        }
        else {
        enemies[i].sting();
        if (frameCount % 50 === 0) {
            spawnBullet("Enemy");
        }
        }

    }
    for (i = 0; i < coinsArray.length; i++) {
        if (coinsArray[i].coin.lifetime <= 0) {
            coinsArray.splice(i, 1);
        }
        else {
        coinsArray[i].check();
        }

    }
    for (i = 0; i < livesArray.length; i++) {
        if (livesArray[i].life.lifetime <= 0) {
            livesArray.splice(i, 1);
        }
        else {
        livesArray[i].check();
        }

    }
    for (i = 0; i < bullets.length; i++) {
        if (bullets[i].bullet.lifetime <= 0) {
            bullets.splice(i, 1);
            bulletActive = false;
        }
        else {
        bullets[i].shock();
        }

    }
    for (i = 0; i < enemyBullets.length; i++) {
        if (enemyBullets[i].bullet.lifetime <= 0) {
            enemyBullets.splice(i, 1);
        }
        else {
        enemyBullets[i].shock();
        }

    }
    if (showScore) {
        textSize(Math.sqrt((canvas.width + canvas.height) / 0.5));
        fill("#00FF00");
        textAlign(CENTER);
        text("+" + scoreToGive, canvas.width / 2, showedScorePos);
        showedScorePos -= 3;
    }
    else {
        showedScorePos = canvas.height / 3;
    }
}

// PAUSE MENU
function PauseSettings() {
    if (jumpButton.visible === !false) {
        jumpButton.visible = !true;
    }
    if (bulletButton.visible) {
        bulletButton.visible = false;
    }
    if (gameBgPlaying) {
        gameBgMusic.stop();
        gameBgPlaying = false;
    }
    if (!pausePlaying) {
        pauseMusic.loop();
        pausePlaying = true;
    }
    menuButton.x = canvas.width * (9/10);
    menuButton.y = canvas.height / 2;
    if (mousePressedOver(menuButton) || touchTarget(menuButton)) {
        menuButton.visible = false;
        bulletActive = false;
        resumeButton.visible = false;
        touches = [];
        ReturnToMenuSettings();
    }
    else {
    pauseButton.visible = false;
    player.velocityY = 0;
    player.visible = false;
    resumeButton.visible = true;
    speed = 0;
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].bullet.velocityX = 0;
        bullets[i].bullet.visible = false;
    }
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].enemy.velocityX = 0;
        enemies[i].enemy.visible = false;
    }
    for (let i = 0; i < enemyBullets.length; i++) {
        enemyBullets[i].bullet.velocityX = 0;
        enemyBullets[i].bullet.visible = false;
    }
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].obstacle.velocityX = 0;
        obstacles[i].obstacle.visible = false;
    }
    for (let i = 0; i < coinsArray.length; i++) {
        coinsArray[i].coin.velocityX = 0;
        coinsArray[i].coin.visible = false;
    }
    for (let i = 0; i < livesArray.length; i++) {
        livesArray[i].life.velocityX = 0;
        livesArray[i].life.visible = false;
    }
    for (let i = 0; i < UILives.length; i++) {
        UILives[i].visible = false;
    }
    fill("#0000FF");
    rectMode(CENTER);
    pausePanel = rect(canvas.width / 2, canvas.height / 2, canvas.width, canvas.height);
    textSize(Math.sqrt((canvas.width + canvas.height) / 0.5));
    fill("#FFFF00");
    textAlign(CENTER);
    var PauseText = text("Pause", canvas.width / 2, canvas.height / 5);
    fill("#00FF00");
    textSize(Math.sqrt((canvas.width + canvas.height) / 0.75));
    var ScoreText = text("Score: " + score, canvas.width / 4, canvas.height / 3);
    best = UIManager.updateBest(score, best);
    var BestText = text("Best: " + best, canvas.width * (3 / 4), canvas.height / 3);
    imageMode(CENTER);
    var coinsImg = image(coinImg, canvas.width * (1.7/5), canvas.height * (0.9/2), ((canvas.width + canvas.height) / 2) / 10, ((canvas.width + canvas.height) / 2) / 10);
    var CoinsText = text("Coins: " + coins, canvas.width / 2, canvas.height / 2);
    if (mousePressedOver(resumeButton) || touchTarget(resumeButton)) {
        pauseButton.visible = true;
        player.visible = true;
        frameCount = pausedFrameCount;
        if (speed === 0) {
        speed = 5 + (pausedFrameCount / 500);
        }
        for (let i = 0; i < bullets.length; i++) {
            bullets[i].bullet.visible = true;
            bullets[i].bullet.velocityX = speed + 6;
        }
        for (let i = 0; i < enemies.length; i++) {
            enemies[i].enemy.visible = true;
            enemies[i].enemy.velocityX = -speed - 4;
        }
        for (let i = 0; i < enemyBullets.length; i++) {
            enemyBullets[i].bullet.visible = true;
            enemyBullets[i].bullet.velocityX = -speed - 6;
        }
        for (let i = 0; i < obstacles.length; i++) {
            obstacles[i].obstacle.velocityX = -speed;
            obstacles[i].obstacle.visible = true;
        }
        for (let i = 0; i < coinsArray.length; i++) {
            coinsArray[i].coin.velocityX = -speed;
            coinsArray[i].coin.visible = true;
        }
        for (let i = 0; i < livesArray.length; i++) {
            livesArray[i].life.velocityX = -speed;
            livesArray[i].life.visible = true;
        }
        resumeButton.visible = false;
        playButtonSound.play();
        gameState = GameStateManager.setState(PLAY);
    }
}
}

// RETURN TO MENU
function ReturnToMenuSettings() {
    playButton.visible = true;
    player.velocityY = 0;
    pauseButton.visible = false;
    bulletActive = false;
    jumpButton.visible = true;
    jumpButton.changeImage("jump");
    bulletButton.visible = true;
    player.y = canvas.height * (3/4);
    if (pausePlaying) {
        pauseMusic.stop();
        pausePlaying = false;
    }
    for (i = 0; i < obstacles.length; i++) {
        obstacles[i].obstacle.destroy();
        obstacles.splice(i, 1);
    }
    for (i = 0; i < enemies.length; i++) {
        enemies[i].enemy.destroy();
        enemies.splice(i, 1);
    }
    for (i = 0; i < coinsArray.length; i++) {
        coinsArray[i].coin.destroy();
        coinsArray.splice(i, 1);
    }
    for (i = 0; i < livesArray.length; i++) {
        livesArray[i].life.destroy();
        livesArray.splice(i, 1);
    }
    for (i = 0; i < bullets.length; i++) {
        bullets[i].bullet.destroy();
        bullets.splice(i, 1);
    }
    for (i = 0; i < enemyBullets.length; i++) {
        enemyBullets[i].bullet.destroy();
        enemyBullets.splice(i, 1);
    }
    best = UIManager.updateBest(score, best);
    GetNewBest = false;
    score = 0;
    coins = 0;
    lives = 3;
    menuButtonSound.play();
    gameState = GameStateManager.setState(MENU);
}

// GAME OVER
function GameOverSettings() {
    if (jumpButton.visible) {
        jumpButton.visible = !true;
    }
    if (bulletButton.visible) {
        bulletButton.visible = !true;
    }
    if (!gameOverPlaying) {
        gameOverSound.play();
        gameOverPlaying = true;
    }
    if (gameBgPlaying) {
        gameBgMusic.stop();
        gameBgPlaying = false;
    }
    menuButton.x = canvas.width * (9/10);
    menuButton.y = canvas.height * (3/4);
    if (mousePressedOver(menuButton) || touchTarget(menuButton)) {
        menuButton.visible = false;
        bulletActive = false;
        retryButton.visible = false;
        playerOverImg.visible = false;
        ReturnToMenuSettings();
    }
    else {
    player.velocityY = 0;
    pauseButton.visible = false;
    bulletActive = false;
    player.y = canvas.height * (3/4);
    for (i = 0; i < obstacles.length; i++) {
        obstacles[i].obstacle.destroy();
        obstacles.splice(i, 1);
    }
    for (i = 0; i < enemies.length; i++) {
        enemies[i].enemy.destroy();
        enemies.splice(i, 1);
    }
    for (i = 0; i < coinsArray.length; i++) {
        coinsArray[i].coin.destroy();
        coinsArray.splice(i, 1);
    }
    for (i = 0; i < livesArray.length; i++) {
        livesArray[i].life.destroy();
        livesArray.splice(i, 1);
    }
    for (i = 0; i < bullets.length; i++) {
        bullets[i].bullet.destroy();
        bullets.splice(i, 1);
    }
    for (i = 0; i < enemyBullets.length; i++) {
        enemyBullets[i].bullet.destroy();
        enemyBullets.splice(i, 1);
    }
    best = UIManager.updateBest(score, best);
    rectMode(CENTER);
    fill("#0000FF")
    rect(canvas.width / 2, canvas.height / 2, canvas.width * (9/10), canvas.height * (9/10));
    textSize(Math.sqrt((canvas.width + canvas.height) / 0.5));
    fill("#FF0000");
    textAlign(CENTER);
    var GameOverText = text("Game Over!", canvas.width / 2, canvas.height / 4);
    fill("#00FF00");
    textSize(Math.sqrt((canvas.width + canvas.height) / 0.75));
    var ScoreText = text("Score: " + score, canvas.width / 4, canvas.height / 2);
    if (GetNewBest) {
        var newBest = text("New Best!", canvas.width * (3 / 4), canvas.height * (1/3))
        var BestText = text("Best: " + best, canvas.width * (3 / 4), canvas.height / 2);
        UIManagementTool.updateDatabaseBest(best);
    }
    else {
    var BestText = text("Best: " + best, canvas.width * (3 / 4), canvas.height / 2);
    }
    imageMode(CENTER);
    var coinsImg = image(coinImg, canvas.width * (1.7/5), canvas.height * (1.9/3), ((canvas.width + canvas.height) / 2) / 10, ((canvas.width + canvas.height) / 2) / 10);
    var CoinsText = text("Coins: " + coins, canvas.width / 2, canvas.height * (2/3));
    playerOverImg.visible = true;
    retryButton.visible = true;
    if (mousePressedOver(retryButton) || touchTarget(retryButton)) {
        playerOverImg.visible = false;
        player.visible = true;
        pauseButton.visible = true;
        for (let UILivesCounter = lives; UILivesCounter < 3; UILivesCounter++) {
            lives = UIManager.addLives(lives, 1);
        }
        score = 0;
        coins = 0;
        GetNewBest = false;
        frameCount = 0;
        retryButton.visible = false;
        playButtonSound.play();
        gameState = GameStateManager.setState(PLAY);
    }
}
}


// JUMP
function Jump(amount) {
    player.velocityY = -amount;
    jumpSound.play();
}


// FALL
function Gravity(intensity) {
    player.velocityY = player.velocityY + (intensity / 10);
}


// RANDOM
function getRandom(min, max) {
    return Math.round(Math.floor((Math.random() * max) + min));
}


// CREATE NEW OBSTACLE
function spawnObstacle() {
    obstacles.push(new Obstacle(canvas.width + 50, canvas.height - 100, ((canvas.height / 1100) + (canvas.width / 1100)) / 2));
}


// CREATE ENEMY
function spawnEnemy() {
    enemies.push(new Enemy(canvas.width + 50, canvas.height - 100, ((canvas.height / 500) + (canvas.width / 1000)) / 2));
}


// CREATE BONUS
function spawnUI() {
    var rand = getRandom(1, 2);
    if (rand === 1) {
    coinsArray.push(new Coin(canvas.width + 50, getRandom(canvas.height * 0.3, canvas.height * 0.5), ((canvas.width + canvas.height) / 2) / 1000));
    }
    else {
        livesArray.push(new Life(canvas.width + 50, getRandom(canvas.height * 0.3, canvas.height * 0.5), ((canvas.width + canvas.height) / 2) / 9000));
    }
}


// CREATE BULLET
function spawnBullet(type) {
    if (type === "Player") {
        var bullet = new Bullet(player.x, player.y + 10, ((canvas.width + canvas.height) / 2) / 7000, "Player");
        bullets.push(bullet);
        shootSound.play();
    }
    else if (type === "Enemy") {
        var bullet = new Bullet(enemies[i].enemy.x - 30, enemies[i].enemy.y, ((canvas.width + canvas.height) / 2) / 7000, "Enemy");
        enemyBullets.push(bullet);
        enemyShootSound.play();
    }
}

// RESIZE CANVAS AND RESTART
function windowResized() {
    if (GDD !== null) {
    GDD.close();
    }
    window.location.reload();
}


// DETECT TOUCH
function touched() {
    if (touches.length > 0) {
        touches = [];
        return true;
    }
    else {
        return false;
    }
}


// DETECT TOUCH ON BUTTON
function touchTarget(target) {
    if (touches.length > 0) {
        var width = target.width * target.scale;
        var height = target.height * target.scale;
        if (touches[0].x < (target.x + (width / 2)) && touches[0].x > (target.x - (width / 2)) && touches[0].y < (target.y + (height / 2)) && touches[0].y > (target.y - (height / 2))) {
            return true;
        }
        else {
            return false;
        }
    }
}