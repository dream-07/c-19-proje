var PLAY = 1;
var END = 0;
var gameState = PLAY;

var pick,diamondsGroup,back,ghost,ghostG;

var point=0, gameOver, restart;

function preload(){
pickImage = loadImage("sprite_0 (2).png")
diamondsImage = loadImage("sprite_0.png")
gameOverImg = loadImage("gameOver.png");
ghostImg = loadImage("sprite_0 (3).png");
restartImg = loadImage("restart.png");
backImg = loadImage("sprite_0 copy.png");
}

function setup() {
createCanvas(1200,300);

back = createSprite(600,150);
 back.addImage(backImg);
   
pick = createSprite(100,150);
pick.addImage(pickImage);
pick.scale=0.03;

 gameOver = createSprite(600,100);
 gameOver.addImage(gameOverImg);
 
 restart = createSprite(600,140);
 restart.addImage(restartImg);
 
 gameOver.scale = 0.5;
 restart.scale = 0.5;

 gameOver.visible = false;
 restart.visible = false;

 diamondsGroup = new Group();
 ghostG = new Group();
}

function draw() {
  drawSprites();
  textSize(20);
  fill(255);
  text("point: "+ point,830,30);


  if(gameState===PLAY){
    pick.y = World.mouseY;
    edges= createEdgeSprites();
    pick .collide(edges);

    if(ghostG.isTouching(pick)){
      gameState = END;
  }

    var select_oppPlayer = Math.round(random(1,2));

    if (World.frameCount % 150 == 0) {
      if (select_oppPlayer == 1) {
        spawnghost();
      } else if (select_oppPlayer == 2) {
        spawnDiamond();
  }
}

else if (gameState === END) {
  gameOver.visible = true;
  restart.visible = true;
  

  diamondsGroup.setVelocityXEach(0);
  ghostG.setVelocityXEach(0);

  diamondsGroup.setLifetimeEach(-1);
  ghostG.setLifetimeEach(-1);
  
}
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }

drawSprites(); 
}

function spawnDiamond(){
  if (frameCount % 60 === 0) {
  var diamonds=createSprite(1100,Math.round(random(5,300)));
  diamonds.addImage(diamondsImage);
  diamonds.scale = 0.02;
  diamonds.velocityX = -4;
  diamonds.setLifetime=1200;
 diamondsGroup.add(diamonds);
  } 
}


function spawnghost(){
  if (frameCount % 60 === 0) {
  var ghost=createSprite(1100,Math.round(random(10,295)));
  ghost.addImage(ghostImg);
  ghost.scale = 0.02;
  ghost.velocityX = -5;
  ghost.setLifetime=1200;
 ghostG.add(ghost);
  } 
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  diamondsGroup.destroyEach();
  ghostG.destroyEach();
}