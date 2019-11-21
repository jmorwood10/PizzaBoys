$(function(){
    var canvas=document.getElementById("canvas");
    var ctx=canvas.getContext("2d");
    
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    
    var spawnRate=1000;

    var lastSpawn=-1;

    var objects=[];

    var pizza = new Image();
    pizza.src = "images/pizza.png"

    var spiderman;
    var spiderimg = new Image();
    spiderimg.src = "images/spiderR.gif"

    var MoveUp = false;
    var MoveDownRight = false;
    var MoveRight = false;
    var MoveDown = false;
    var LastDirection;
    var NewDirection;
    var MoveLeft = false;

    var music;
    music = new Audio("PizzaTime.ogg");
    music.addEventListener('ended', LoopMusic)

    function LoopMusic(){
        music.currentTime = 0;
        music.play();
    }

    makeSpider();
    animate();

    document.addEventListener('keydown', BeginMovement)

    function BeginMovement(x) {
        music.play();
        if (x.keyCode === 65 && x.keyCode === 39)  {
          MoveDownRight = true;
          NewDirection = 4;
      
      }
        if (x.keyCode === 87) { 
              MoveUp = true;
              NewDirection = 0;
              
        }
      
        if (x.keyCode === 68)  {
            MoveRight = true;
            NewDirection = 1;
            if(xcoord > window.innerWidth * 0.7){
            window.scrollBy(10,0);}
            
        }
      
        if (x.keyCode === 83)  {
            MoveDown = true;
            NewDirection = 2;
      
        }
      
        if (x.keyCode === 65)  {
            MoveLeft = true;
            NewDirection = 3;
        }
      
        ChangeDirection(NewDirection);
         
        }

        document.addEventListener('keyup', releaseKey)

    function releaseKey(x) {

        if (x.keyCode === 65 && x.keyCode === 39)  {
            MoveDownRight = false;
            LastDirection = 4;
        }
        if (x.keyCode === 87) { 
            MoveUp = false;
            LastDirection = 0;
        }
          
        if (x.keyCode === 68)  {
            MoveRight = false;
            LastDirection = 1;
        }
              
        if (x.keyCode === 83){ 
            MoveDown = false; 
            LastDirection = 2;
        }
              
        if (x.keyCode === 65)  {
            MoveLeft = false;
            LastDirection = 3;
            }
          
              
        }

    function Movementloop() {
        
        spider = spiderman;
            
        if(MoveUp === true){
            spider.y = (spider.y - 5);
        }
        
        if (MoveRight === true) {
            spider.x = (spider.x + 5);
        }
        
        if (MoveDown === true){
            spider.y = (spider.y + 5)
        }
        
        if (MoveLeft === true){
            spider.x = (spider.x - 5);
        }
                
        window.requestAnimationFrame(Movementloop)
                
        }

    function ChangeDirection(NewDirection){

        spider = spiderman;

        if (NewDirection !== LastDirection ){
            if (NewDirection === 0){
                spiderimg.src="images/spiderU.gif"
                LastDirection = NewDirection;
            }
            if (NewDirection === 1){
                spiderimg.src="images/spiderR.gif"
                LastDirection = NewDirection;
            }
            if (NewDirection === 2){
                spiderimg.src="images/spiderD.gif"
                LastDirection = NewDirection;
            }
            if (NewDirection === 3){
                spiderimg.src="images/spiderL.gif"
                LastDirection = NewDirection;
            }
            if (NewDirection === 4){
                spiderimg.src="images/spiderRD.gif"
                LastDirection = NewDirection;
            }
            }
        }
        
        window.requestAnimationFrame(Movementloop)


    function spawnObject(){


        var object={
            x:Math.random()*(canvas.width-30)+15,

            y:Math.random() * (canvas.height) + 100 ,

            width: 30,
            height: 30,

            image: pizza
        }


        objects.push(object);
    }
    function makeSpider(){
        var spider={
            x:50,
      
            y:50 ,
      
            width: 75,
            height: 75,
      
            image: spiderimg
      
            }
      
            spiderman = spider;
    
    }


    function animate(){

        var time=Date.now();

        if(time>(lastSpawn+spawnRate)){
            lastSpawn=time;
            spawnObject();
        }
        requestAnimationFrame(animate);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var spider = spiderman;
        for (var i = 0; i < objects.length; i++) {
            var object = objects[i];
            ctx.drawImage(object.image, object.x, object.y, object.width, object.height);           
            ctx.drawImage(spider.image, spider.x, spider.y, spider.height, spider.width);

            if(spider.x < object.x + object.width &&
                spider.x + spider.width > object.x &&
                spider.y < object.y + object.height &&
                spider.y + spider.height > object.y){
                    ctx.clearRect(object.x, object.y, object.width, object.height)
                    objects.splice(i, 1)

                }
            
        }
        
    }
});