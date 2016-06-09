//alert('Hi');
//All variables are declared here.
var dinosaur;
var jump = 0;
var cactii = [];
var randPos = 0;
var bg,bg1;
var score = document.getElementById("scores");
var tot=0;
var hiscore = 0;
var msg = "SCORE: ";

//variables to add sound to the game
var jumpSound;
var hitSound;
var highSound;

function getHi(){
	if(sessionStorage.getItem("hiScore")!==null){
		hiscore = parseInt(sessionStorage.getItem("hiScore"));
		msg = "HI: "+hiscore+"&nbsp;&nbsp;SCORE: ";
	}
}

function startGame(){
	Anigame.start();
	getHi();
	dinosaur = new component(100,50,"dino.png",55,172,"image");
	bg = new component(600,270,"dino_bg.png",0,0,"background");
	bg1 = new component(600,270,"dino_bg.png",600,0,"background");
	
	jumpSound = new playSound("dino_jump.mp3");
	hitSound = new playSound("dino_hit.mp3");
	highSound = new playSound("dino_high.mp3");
	//score = new component("20px ","Arial","black",280,40,"text");
	//cactus = new component(10,30,"green",300,120);
	//alert('In startGame()');
}

var Anigame = {
	canvas: document.createElement("canvas"),
	start: function(){
		this.canvas.width = 600;
		this.canvas.height = 270;
		this.context = this.canvas.getContext('2d');
		//document.body.insertBefore(this.canvas,document.body.childNodes[0]);
		document.body.appendChild(this.canvas);
		this.context.fillStyle = "#f2f2f2";
		this.context.fillRect(0,0,600,270);
		this.frameNo = 0;
		//FPS is (50)NO. It is now 125.
		this.interval = setInterval(updateArena,8);
		window.addEventListener('keydown',function(e){
			Anigame.key = e.keyCode;
		})
		window.addEventListener('keyup',function(e){
			Anigame.key = false;
		})
		window.addEventListener('touchstart',function(e){
			Anigame.key = 32;
		})
		window.addEventListener('touchend',function(e){
			Anigame.key = false;
		})
		//alert('Created canvas');
	},
	clear: function(){
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	},
	stop: function(){
		clearInterval(this.interval);
		if(Math.floor(tot/15) > hiscore) hiscore = Math.floor(tot/15);
		msg = "HI: "+hiscore+"&nbsp;&nbsp;SCORE: ";
		score.innerHTML = msg+Math.floor(tot/15);
		sessionStorage.setItem("hiScore",hiscore);
	}
}

function component(width,height,color,x,y,type){
	this.type = type;
	if(type == "image" || type=="background"){
		this.imag = new Image();
		this.imag.src = color;
	}
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	
	this.update = function(){
		ctx = Anigame.context;
		if(type == "image" || type == "background"){
			ctx.drawImage(this.imag,this.x,this.y,this.width,this.height);
		}
		
		else{
			ctx.fillStyle = color;
			ctx.fillRect(this.x,this.y,this.width,this.height);
		}
		/*
			if(type == "text"){
			ctx.font = this.width+this.height;
			ctx.fillStyle = color;
			ctx.fillText(this.textH,this.x,this.y);
		}	
		this.textH = "SCORE: ";
	if(type == "text"){
			ctx.font = this.width+this.height;
			ctx.fillStyle = color;
			ctx.fillText(this.textH,this.x,this.y);
	}
		
		*/
	}
	this.newPos = function(){
		this.x+=this.speedX;
		this.y+=this.speedY;
		if(this.type == "background"){
			if(this.x == -(this.width)){
				this.x=this.width;
			}
		}
	}
	this.crashWith = function(cactii) {
        var dinol = this.x + 35;
        var dinor = this.x + (this.width)-35;
        //var dinotop = this.y;
        var dinobot = this.y + (this.height) - 5;
        var cactl = cactii.x;
        var cactr = cactii.x + (cactii.width);
        var cacttop = cactii.y;
        //var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((dinobot < cacttop) || (dinor < cactl) || (dinol > cactr)) {
            crash = false;
        }
        return crash;
    }
}
function updateArena(){
	var x,y;
	for(var i=0; i<cactii.length; ++i){
		if(dinosaur.crashWith(cactii[i])){
			hitSound.play();
			Anigame.stop();
			return;
		}
	}
	Anigame.clear();
	
	Anigame.context.fillStyle = "#f7f7f7";//#f0f0f0 #f8f8f8
	Anigame.context.fillRect(0,0,600,270);
	
	
	Anigame.frameNo+=1;
	tot++;
	if(Anigame.frameNo == 150+randPos){
		x = Anigame.canvas.width;
		y = Anigame.canvas.height - 78;
		cactii.push(new component(10,24,"green",x,y,"rect"));
		randPos = Math.floor(Math.random()*50);
		Anigame.frameNo = 0;
	}
	
	dinosaur.speedX=0;
	dinosaur.speedY = 0;

	if(Anigame.key && Anigame.key == 32){
	//dinosaur.speedX = 0;
	//dinosaur.speedY = -1;
		if(jump == 0) {
			jump = 100;
			jumpSound.play();
		}
	}
	if(jump>65) {
		dinosaur.speedX = 0;
		dinosaur.speedY = -2;
		dinosaur.newPos();
		jump--;
	}
	else if(jump>35){
		dinosaur.speedX = 0;
		dinosaur.speedY = 0;
		dinosaur.newPos();
		jump--;
	}
	else if(jump>0){
		dinosaur.speedX = 0;
		dinosaur.speedY = 2;
		dinosaur.newPos();
		jump--;
	}
	//cactus.x+=-1;
	//cactus.update();
	bg.speedX = -1;
	bg.speedY = 0;
	bg1.speedX = -1;
	bg1.speedY = 0;
	bg.newPos();
	bg.update();
	bg1.newPos();
	bg1.update();
	Anigame.context.fillStyle = "#f7f7f7";//#f0f0f0 #f8f8f8
	Anigame.context.fillRect(55,172,100,50);
	dinosaur.update();
	Anigame.context.beginPath();
	Anigame.context.moveTo(55,215.5);
	Anigame.context.lineTo(155,215.5);
	Anigame.context.stroke();
	
	for(var i=0; i<cactii.length; ++i){
		cactii[i].x+=-1;
		cactii[i].update();
	}
	
	score.innerHTML = msg+Math.floor(tot/15);
	if(Math.floor(tot/15) == hiscore && Math.floor(tot/15)!==0) highSound.play();
	if(Math.floor(tot/15)%100 == 0 && Math.floor(tot/15)!==0) highSound.play();
	
}
//Function to add sound
function playSound(src){
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload","auto");
	this.sound.setAttribute("controls","none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	this.play = function(){
		this.sound.play();
	}
}