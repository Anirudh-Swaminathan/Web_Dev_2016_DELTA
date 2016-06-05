//alert('Hi');

var dinosaur;
var jump = 0;
var cactii = [];
var randPos = 0;

function startGame(){
	Anigame.start();
	dinosaur = new component(100,50,"dino.png",10,100,"image");
	//cactus = new component(10,30,"green",300,120);
	//alert('In startGame()');
}

var Anigame = {
	canvas: document.createElement("canvas"),
	start: function(){
		this.canvas.width = 480;
		this.canvas.height = 270;
		this.context = this.canvas.getContext('2d');
		//document.body.insertBefore(this.canvas,document.body.childNodes[0]);
		document.body.appendChild(this.canvas);
		this.context.fillStyle = "#f2f2f2";
		this.context.fillRect(0,0,480,270);
		this.frameNo = 0;
		//FPS is 50
		this.interval = setInterval(updateArena,20);
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
	}
}

function component(width,height,color,x,y,type){
	this.type = type;
	if(type == "image"){
		this.imag = new Image();
		this.imag.src = color;
	}
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.update = function(){
		ctx = Anigame.context;
		if(type == "image"){
			ctx.drawImage(this.imag,this.x,this.y,this.width,this.height);
		} else{
			ctx.fillStyle = color;
			ctx.fillRect(this.x,this.y,this.width,this.height);
		}
	}
	this.newPos = function(){
		this.x+=this.speedX;
		this.y+=this.speedY;
	}
	this.crashWith = function(cactii) {
        var dinol = this.x + 35;
        var dinor = this.x + (this.width)-35;
        //var dinotop = this.y;
        var dinobot = this.y + (this.height);
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
			Anigame.stop();
			return;
		}
	}
	Anigame.clear();
	
	Anigame.context.fillStyle = "#f7f7f7";//#f0f0f0 #f8f8f8
	Anigame.context.fillRect(0,0,480,270);
	
	
	Anigame.frameNo+=1;
	if(Anigame.frameNo == 150+randPos){
		x = Anigame.canvas.width;
		y = Anigame.canvas.height - 148;
		cactii.push(new component(10,24,"green",x,y,"rect"));
		randPos = Math.floor(Math.random()*50);
		Anigame.frameNo = 0;
	}
	
	dinosaur.speedX=0;
	dinosaur.speedY = 0;
	if(Anigame.key && Anigame.key == 32){
	//dinosaur.speedX = 0;
	//dinosaur.speedY = -1;
		if(jump == 0) jump = 90;
	}
	if(jump>55) {
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
	dinosaur.update();
	Anigame.context.beginPath();
	Anigame.context.moveTo(0,146);
	Anigame.context.lineTo(480,146);
	Anigame.context.stroke();
	for(var i=0; i<cactii.length; ++i){
		cactii[i].x+=-1;
		cactii[i].update();
	}
	
}