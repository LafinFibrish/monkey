var monkey, monkey_running;
var bk , jungle , ground;
var banana, bananaImg, bananaGroup;
var stone, stoneImg, stoneGroup;
var score;

function preload() {
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  jungle = loadImage("jungle.jpg");
  bananaImg = loadImage("banana.png");
  stoneImg = loadImage("stone.png");
  
}

function setup() {
  createCanvas(450, 400);
  monkey = createSprite(50,330,20,20);
  monkey.scale = 0.09;
  monkey.addAnimation("run",monkey_running);
  
  bk = createSprite(200,200,400,400);
  bk.scale = 0.5;
  bk.addImage(jungle);
  bk.depth = 0.1;
  
  ground = createSprite(200,370,400,20);
  ground.visible = false;
  
  banana = createSprite(450,200,20,20);
  banana.visible = false;
  
  stone = createSprite(450,330,20,20);
  stone.visible = false;
  
  bananaGroup = new Group();
  stoneGroup = new Group();
  
  score = 0;
}

function draw() {
  
  monkey.velocityY = monkey.velocityY + 0.8;
  score = score + Math.round(getFrameRate()/61);
  
  if(keyDown("space")){
    monkey.velocityY = -12;
  }
  
  if(monkey.isTouching(bananaGroup)){
    score = score +5;
    bananaGroup.destroyEach();
  }
  
  if(monkey.isTouching(stoneGroup)){
   monkey.scale = monkey.scale - 0.002; 
  }
  
  switch(score){
    case 100: monkey.scale = monkey.scale + 0.02;
      break;
      default:break;
  }
  
  spawnBananas();
  spawnStones();
  
  createEdgeSprites();
  monkey.collide(ground);
  

  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score : "+ score,300,50);
}

function spawnBananas(){
  if (frameCount % 60 === 0) {
    banana = createSprite(450,200,20,20);
    banana.addImage(bananaImg);
    banana.scale = 0.05;
    banana.visible = true;
    banana.y = random(180,280);
    banana.velocityX = -5;
    banana.lifetime = 90;
    bananaGroup.add(banana);
  }
}

function spawnStones(){
  if(frameCount % 300 === 0){
    stone = createSprite(450,330,20,20);
    stone.addImage(stoneImg);
    stone.scale = 0.2;
    stone.visible = true;
    stone.velocityX = -7;
    stone.lifetime = 60;
    stoneGroup.add(stone);
  }
}