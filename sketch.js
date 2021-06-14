var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var lastFed 
//create feed and lastFed variable here
var feed 

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed=createButton("Feed Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  var lastFed = hour()
  //write code to read fedtime value from the database 
 lastFed=database.ref('FeedTime');
 lastFed.on("value",readTime);

 textSize(20)
 fill("black")
var lol = hour()
 if(lol>=12){
  text("Last Feed: "+ lol+" PM",250,30)
}
else if(lol == 0){
  text("Last Feed: 12 AM",250,30)
}
else{
  text("Last Feed: "+ lol+" AM",250,30)
}

  drawSprites();

}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function readTime(data){
  lastFed=data.val()
  foodObj.getFedTime()
 
}

function feedDog(){
 

  dog.addImage(happyDog);
  foodS = foodS - 1
  database.ref('/').update({
    Food:foodS
  })
  //write code here to update food stock and last fed time
  database.ref('/').update({
    FeedTime: hour()
  })
 
 
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
