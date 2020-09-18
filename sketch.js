//Declaring constants for engine, world and bodies.
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

//Declaring variables for engine and world to access it easily.
var myEngine, myWorld;

//Declaring variables for sprites, their images, bodies and options for package and ground.
var helicopter, helicopterImage;
var package, packageImage, packageBody, package_options;
var ground, ground_options;

function preload(){

    //Loading helicopter and package images.
    helicopterImage = loadImage("helicopter.png");
    packageImage = loadImage("package.png");

}

function setup(){

    //Creating canvas.
    createCanvas(800, 600);

    //Accessing the engine and world from the engine and world variables.
    myEngine = Engine.create();
    myWorld = myEngine.world;

    //Creating helicopter, adding its image and making it small.
    helicopter = createSprite(400, 100, 50, 20);
    helicopter.addImage(helicopterImage);
    helicopter.scale = 0.75;

    //Preventing the package to fall from the starting.
    package_options = {
      isStatic : true
    }

    //Creating package body, adding its options and adding it to the world.
    packageBody = Bodies.circle(400, 150, 25, package_options);
    World.add(myWorld, packageBody);

    //Creating package, adding its image, making it small, and hiding it.
    package = createSprite(400, 200, 150, 50);
    package.addImage(packageImage);
    package.scale = 0.3;
    package.visible = false;

    //Preventing the ground from falling down.
    ground_options = {
      isStatic : true
    }
    
    //Creating ground, adiing its options and adding it to the world.
    ground = Bodies.rectangle(400, 580, 800, 15, ground_options);
    World.add(myWorld, ground);

}

function draw(){
  
    //Setting the ellipse mode to radius and drawing a circle for the package body.
    ellipseMode(RADIUS);
    circle(packageBody.position.x, packageBody.position.y, 25);
  
    //Hiding multiple sprites and bodies.
    background(0);

    //Using the laws of physics.
    Engine.update(myEngine);

    //Setting the rectangle mode to center and drawing it for the ground and coloring it.
    rectMode(CENTER);
    fill("white");
    rect(ground.position.x, ground.position.y, 800, 15);

    //Keeping the y value of package and package body the same.
    package.y = packageBody.position.y;

    //Dropping the package when down arrow key is pressed.
    if(keyDown("DOWN_ARROW")){
      package.visible = true;
      Matter.Body.setStatic(packageBody, false);
      packageBody.restitution = 0.3;
    }

    //Showing text for "You have dropped the medicine safely".
    if(package.y >= 520){
      textSize(20);
      fill("lightgreen");
      text("You have dropped the medicine safely.", 230, 300)
    }

    //Drawing the sprites.
    drawSprites();

}