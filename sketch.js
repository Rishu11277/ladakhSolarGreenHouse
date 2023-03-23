//Global variables for images
var bg, sun, sunR, sunL, s_pan, fan_anim,fan_img,display, g_house_img;

//Global variables for Sprites
var g_house, pan1,pan2,fan,fan2;

//Creating a ray group
var rayGroup;

//Creating temprature and voltage variables
var temp = 10
var panel1_voltage =0;
var panel2_voltage = 0;
var power_gen = 0;
var energy1 = 0
var energy2 = 0


function preload()
{
  sunR = loadImage("sunrays.png");
  sunL = loadImage("sunrays1.png");
  bg = loadImage("bgimage.png")
  s_pan = loadImage("s_panel.png");
  fan_img = loadImage("fan01.png");
  display = loadImage("disp.png");
  g_house_img = loadImage("greenhouse.png")
  
  //Add animation for moving Fan
  fan_anim = loadAnimation("fan01.png", "fan02.png", "fan03.png", "fan04.png", "fan05.png")
 
  
}

function setup() 
{
  createCanvas(windowWidth, windowHeight);
  
  g_house = createSprite(width / 2,300,100,100);
  g_house.addImage(g_house_img);
  g_house.scale = 1.00;
  g_house.debug = true;
  g_house.setCollider("rectangle",0,40,570, 290)

  pan1 = createSprite(width/5,height-50,80,80);
  pan1.addImage(s_pan);
  pan1.scale = 0.75;

  pan2 = createSprite(width-220,height-50,80,80);
  pan2.addImage(s_pan);
  pan2.scale = 0.75;

  
  fan = createSprite (width / 3,300,20,20);
  fan.addImage(fan_img);
  fan.scale = 0.3;
  fan.addAnimation('run',fan_anim)
  

  
  fan2 = createSprite(width / 1.5,300,20,20);
  fan2.addImage(fan_img);
  fan2.scale = 0.3;
  fan2.addAnimation('run', fan_anim);
  textSize(15);

  rayGroup = createGroup()
  
}

function draw() 
{
  background(220);
  makeRay()

  //Add Images for Background & Panel
  
  image(bg, 0, 0, width, height)
  image(display, width / 2.5, 10, 200, 60)

  if (temp >= 30 && power_gen >= 4) {
    fan.changeAnimation('run')
    temp -= 0.75
    power_gen -= 0.35
  }

  if (temp >= 30 && power_gen >= 8) {
    fan2.changeAnimation('run')
    temp -= 1.50
    power_gen -= 0.75
  }

 



  
  power_gen = energy1 + energy2
  
  push();
  noStroke();
  fill("black")
  text("Voltage : " + power_gen,width/2 - 70,55)



  text("Temprature : " + temp,width/2 - 70, 35)

  pop();
  
 
  drawSprites();  
}

function makeRay() {
  if (frameCount % 60 === 0) {
    var x = Math.round(random(10,width));
    rayL = createSprite(x,50,10,10);
    var xr = Math.round(random(350,750));
    rayR = createSprite(xr,50,10,10);
    
    rayL.addImage(sunL);
    rayR.addImage(sunR);
    
    rayL.scale = 0.08;
    rayR.scale = 0.08;
    
    vx = random(-1,1);
    
    rayGroup.add(rayL);
    rayGroup.add(rayR);
    
    rayGroup.setVelocityYEach(2)
    rayGroup.setVelocityXEach(vx)
    
    rayGroup.setLifetimeEach(134)
   
  }
   
  rayGroup.overlap(pan1, charge1); 
  
  function charge1(spriteA) { 
    spriteA.remove();
    energy1 += 1

  }

  rayGroup.overlap(pan2, charge2); 
  
  function charge2(spriteA) { 
    spriteA.remove();
    energy2 += 1

  }

  rayGroup.overlap(g_house, tempRise); 
  
  function tempRise(spriteA) { 
    spriteA.remove();
    temp += 1

  }

  }
