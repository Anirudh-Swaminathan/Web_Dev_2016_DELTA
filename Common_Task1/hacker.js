//set is whether the timer has been set(started) and run is the running status of the timer.
var set = false;
var run = false;
//Accessing buttons
var start = document.getElementById('start');
var pause = document.getElementById('pause');
var rese = document.getElementById('reset');
//Checking the status of the timer.
var ended = false;
var toBe;

//accessing the divs
var day = document.getElementById('day');
var hour = document.getElementById('hour');
var minu = document.getElementById('minu');
var seco = document.getElementById('seco');
//Initializing the time left to 0
day.innerHTML = "Days <br/>"+0;
hour.innerHTML = "Hours <br/>"+0;
minu.innerHTML = "Minutes <br/>"+0;
seco.innerHTML = "Seconds <br/>"+0;
//The function that changes the display time
var calcIt = function(){
	var now = new Date();
	//alert('The present date is '+now.toDateString());
	
	var day = document.getElementById('day');
	var hour = document.getElementById('hour');
	var minu = document.getElementById('minu');
	var seco = document.getElementById('seco');
	
	if(!set || !run){
		ended = true;
		//set = false;
		//alert('Please set the time');
	}
	if(set && !run) ended = true;
	else if (set && run) ended = false;
	
	if(toBe<now && !ended){
		alert('THE DEADLINE IS PAST!!!!');
		ended = true;
		set = false;
		run = false;
		
		document.getElementById('dateIn').style.visibility = "visible";
		document.getElementById('start').style.visibility = "visible";
		document.getElementById('start').value = "Start";
		
		var timLe = document.getElementById('timLeft');
		timLe.innerHTML = "Time Left for ";
		//The deadline has ended.
	}
	else if(!ended){
		var diff = toBe - now;
		//alert('The difference is '+diff);
		
		var day_diff = Math.floor(diff/(1000*60*60*24));
		day.innerHTML = "Days <br/>"+day_diff;
		diff = diff%(1000*60*60*24);
		
		var hour_diff = Math.floor(diff/(1000*60*60));
		hour.innerHTML = "Hours<br/>"+hour_diff;
		diff = diff%(1000*60*60);
		
		var min_diff = Math.floor(diff/(1000*60));
		minu.innerHTML = "Minutes <br/>"+min_diff;
		diff = diff%(1000*60);
		
		var sec_diff = Math.floor(diff/1000);
		seco.innerHTML = "Seconds <br/>"+sec_diff;
		diff = diff%1000;
		//Setting the divs with the time left.
		
		//alert('The diff is Days:'+day_diff+' Hours:'+hour_diff+' Minutes:'+min_diff+' Seconds:'+sec_diff);
	}
};
//Event listener for start
start.onclick = function(){
	if(!set && !run){
		var date = document.getElementById('dateIn').value;
		if(date === ""){
			alert('Please set the deadline');
			return;
		}
		//alert(typeof(date));
		var y = date.slice(0,4);
		var m = date.slice(5,7);
		var d = date.slice(8,10);
		//alert('Year: '+y+' Month: '+m+' Day: '+d);
	
		if(m === "01") m = "January";
		else if(m==="02") m = "February";
		else if(m==="03") m = "March";
		else if(m==="04") m = "April";
		else if(m==="05") m = "May";
		else if(m==="06") m = "June";
		else if(m==="07") m = "July";
		else if(m==="08") m = "August";
		else if(m==="09") m = "September";
		else if(m==="10") m = "October";
		else if(m==="11") m = "November";
		else if(m==="12") m = "December";
	
		var msec = Date.parse(m+d+', '+y);
		toBe = new Date(msec);
	
		alert('The deadline for this task is '+toBe.toDateString()+" :P ");
		//alert('The date to be is '+date);
		//Make the time set and clock run
		set=true;
		run=true;
		//ended = false;
		document.getElementById('dateIn').style.visibility = "hidden";
		document.getElementById('start').style.visibility = "hidden";
		
		var timLe = document.getElementById('timLeft');
		timLe.innerHTML = "Time Left for "+toBe + " is ";
	}
	else if(set && !run){
		run = true;
		document.getElementById('start').style.visibility = "hidden";
	}
};
//event listener for pause button click
pause.onclick = function(){
	if(set && run){
		run = false;
		document.getElementById('start').style.visibility = "visible";
		document.getElementById('start').innerHTML = "Resume";
	}
};
//event listener for reset button click
rese.onclick = function(){
	if(set){
		set = false;
		//ended = true;
		run = false;
		day.innerHTML = "Days <br/>"+0;
		hour.innerHTML = "Hours <br/>"+0;
		minu.innerHTML = "Minutes <br/>"+0;
		seco.innerHTML = "Seconds <br/>"+0;
		document.getElementById('dateIn').style.visibility = "visible";
		document.getElementById('start').style.visibility = "visible";
		document.getElementById('start').innerHTML = "Start";
		
		var timLe = document.getElementById('timLeft');
		timLe.innerHTML = "Time Left for ";
	}
};
setInterval(calcIt,1000);