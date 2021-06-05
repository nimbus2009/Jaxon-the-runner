

//declaring sprites and their respective animations
var jaxon, jax_ani;
var coin, coin_ani;
var path, path_ani;
var bomb, bomb2, bomb_ani, bomb2_ani;
var over, over_ani;

//score and lives
var score=0;
var lives=3;

//invisible boundaries
var boundary1,boundary2;

//UI buttons- right arrow, left arrow, pause, play, start and their animations
var left,leftArrow,right,rightArrow;
var pause,pauseBTN,play,playBTN;
var settings,setBTN;
var start,startBTN;
var restart,restartBTN;
var next;
var res;

//bomb boom effect
var boom,boom_ani;

//gamestate
var state="initial";

function preload(){
  //pre-load images and animations
  jax_ani=loadAnimation("Runner-1.png","Runner-2.png");
  coin_ani=loadImage("coin.png");
  path_ani=loadImage("path.png");
  bomb_ani=loadImage("bomb.png");
  bomb2_ani=loadImage("bomb2.png");
  leftArrow=loadImage("left.png");
  rightArrow=loadImage("right.png");
  pauseBTN=loadImage("pause.png");
  playBTN=loadImage("play.png");
  startBTN=loadImage("start0.png");
  boom_ani=loadImage("boom.png");
  over_ani=loadImage("over.png");
  restartBTN=loadImage("greenBTN.png");
  setBTN=loadImage("settings.png");
}

function setup(){
  createCanvas(500,700);

  //create sprites here

  path=createSprite(250,350,20,20);
  path.addAnimation("pa",path_ani); 

  coin=createSprite(randomNumber(250,350),randomNumber(50,400),40,40);
  coin.addAnimation("co",coin_ani);
  coin.scale=0.5;

  bomb=createSprite(randomNumber(250,350),randomNumber(50,400),40,40);
  bomb.addAnimation("bo",bomb_ani);
  bomb.scale=0.085;

  bomb2=createSprite(randomNumber(250,350),randomNumber(50,400),40,40);
  bomb2.addAnimation("bo2",bomb2_ani);
  bomb2.scale=0.085;

  left=createSprite(50,650,20,20);
  left.addAnimation("lb",leftArrow);

  right=createSprite(450,650,20,20);
  right.addAnimation("rb",rightArrow);

  pause=createSprite(50,550,20,20);
  pause.addAnimation("ps",pauseBTN);

  play=createSprite(50,500,20,20);
  play.addAnimation("pl",playBTN);
  play.visible=false;

  jaxon=createSprite(200,600,20,20);
  jaxon.addAnimation("jx",jax_ani);
  jaxon.scale=0.075;
  jaxon.setCollider("rectangle",0,0,1000,1000,0);
  
  boom=createSprite(200,200,40,40);
  boom.addAnimation("boa",boom_ani);
  boom.scale=0.2;
  boom.visible=false;

  boundary1=createSprite(100,350,10,700);
  boundary2=createSprite(400,350,10,700);

  settings=createSprite(450,550,20,30);
  settings.addAnimation("st",setBTN);

  over=createSprite(250,350,20,20);
  over.addAnimation("ov",over_ani);
  over.visible=false;

  restart=createSprite(250,500,20,20);
  restart.addAnimation("rs",restartBTN);
  restart.visible=false;

  start=createSprite(250,350,30,30);
  start.addAnimation("sr",startBTN);

  res=createSprite(250,400,20,20);
  res.addAnimation("res",restartBTN);
  res.visible=false;

  next=createSprite(250,300,20,20);
  next.addAnimation("nx",restartBTN);
  next.visible=false;

  boundary1.visible=false;
  boundary2.visible=false;

}

function draw() {
  background(0);

  drawSprites();

  fill("white");
  textSize(14);
  textFont("kenney future narrow");
  text("Lives - "+lives, 17,20);
  text("Score - "+score, 15,50);

  if(state=="initial") {
    jaxon.collide(boundary1);
    jaxon.collide(boundary2);

    start.visible=true;

    if(mousePressedOver(start)) {
      start.visible=false;
      state="play";
    }
  }
  
  if(state=="play"&&lives>0) {
    
    if(mouseX<400 && mouseX>100) {
      jaxon.x=mouseX;
    }

    coin.velocityY=6;
    bomb.velocityY=6;
    bomb2.velocityY=6;
    path.velocityY=6;
    
    if(coin.collide(jaxon)) {
      coin.position.y=-20;
      coin.velocityY=6;
      coin.position.x=randomNumber(250,350);

      score+=2;
    }
    if(bomb.collide(jaxon)) {
      boom.position.x=bomb.position.x;
      boom.position.y=bomb.position.y;
      boom.visible=true;
      boom.velocityY=5;

      bomb.position.y=-20;
      bomb.velocityY=6;
      bomb.position.x=randomNumber(250,350);

      lives-=1;
    }
    if(bomb2.collide(jaxon)) {
      boom.position.x=bomb2.position.x;
      boom.position.y=bomb2.position.y;
      boom.visible=true;
      boom.velocityY=4;

      bomb2.position.y=-20;
      bomb2.velocityY=6;
      bomb2.position.x=randomNumber(250,350);

      lives-=1;
    }

    if(keyDown("right")||mousePressedOver(right)) {
      jaxon.position.x+=3;
    }
    if(keyDown("left")||mousePressedOver(left)) {
      jaxon.position.x-=3;
    }

    jaxon.collide(boundary1);
    jaxon.collide(boundary2);

    if(coin.y>710) {
      coin.y=30;
      coin.position.x=randomNumber(250,350);
    }
    if(bomb.y>710) {
      bomb.y=-30
      bomb.position.x=randomNumber(250,350);
    }
    if(bomb2.y>710) {
      bomb2.y=-30
      bomb2.position.x=randomNumber(250,350);
    }
    if(path.y>500) {
      path.y=path.y/2;
    }
  }
  if(lives==0) {
    state="over";

    path.velocityY=0;
    coin.velocityY=0;
    bomb.velocityY=0;
    bomb2.velocityY=0;

    over.visible=true;

    fill("black");
    text("Restart",220,505);
    console.log(score + " " + lives);    
    restart.visible=true;

    if(mousePressedOver(restart)) {
      lives=3;
      score=0;

      state="initial";
      over.visible=false;
      restart.visible=false;
    }
  }

  if(mousePressedOver(pause)&&(state=="play")) {
    state="pause";

    path.velocityY=0;
    coin.velocityY=0;
    bomb.velocityY=0;
    bomb2.velocityY=0;

    play.visible=true;
    pause.visible=false;
  }
  if(mousePressedOver(play)&&(state=="pause")) {
    state="play";

    path.velocityY=6;
    coin.velocityY=6;
    bomb.velocityY=6;
    bomb2.velocityY=6;

    play.visible=false;
    pause.visible=true;
  }

  if(mousePressedOver(settings)) {
    state="settings";

    bomb.velocityY=0;
    bomb2.velocityY=0;
    coin.velocityY=0;
    path.velocityY=0;
  }

  if(state=="settings") {

    fill("black");
    text("Continue",220,305);
    text("Restart",220,405);

    next.visible=true;
    res.visible=true;

    if(mousePressedOver(next)) {
      state="play";

      next.visible=!true;
      res.visible=!true;

      pause.visible=true;
      play.visible=false;
    }
    if(mousePressedOver(res)) {
      next.visible=!true;
      res.visible=!true;

      pause.visible=true;
      play.visible=false;
      
      state="initial";
      score=0;
      lives=3;

      bomb.position.y=-30;
      bomb2.position.y=-30;
    }
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}