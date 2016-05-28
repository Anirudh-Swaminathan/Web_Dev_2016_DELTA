//set defines the timer set state. run signifies whether the timer is running
var set = false;
var run = false;
//Accessing buttons
var start = document.getElementById('start');
var pause = document.getElementById('pause');
var rese = document.getElementById('reset');
//Checking the status of the timer.
var ended = false;
//toBe is the deadline
var toBe;

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
		
		document.getElementById('year').style.visibility = "visible";
		document.getElementById('month').style.visibility = "visible";
		document.getElementById('date').style.visibility = "visible";
		document.getElementById('hourI').style.visibility = "visible";
		document.getElementById('minute').style.visibility = "visible";
		document.getElementById('secondI').style.visibility = "visible";
		
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
		
		//setting the default
		document.getElementById("year").defaultValue = 2016;
		document.getElementById("month").defaultValue = 5;
		document.getElementById("date").defaultValue = 30;
		document.getElementById("hourI").defaultValue = 23;
		document.getElementById("minute").defaultValue = 59;
		document.getElementById("secondI").defaultValue = 59;
		
		var y,m,d,h,mi,s; var dc = false;
		y = parseInt(document.getElementById("year").value);
		m = parseInt(document.getElementById("month").value);
		d = parseInt(document.getElementById("date").value);
		h = parseInt(document.getElementById("hourI").value);
		mi = parseInt(document.getElementById("minute").value);
		s = parseInt(document.getElementById("secondI").value);
		
		//alert('Year: '+y+' Month: '+m+' date: '+d+' hour: '+h+ ' minute: '+mi+' second: '+s);
		
		//Validation for the date
		//check year
		if(y<2016){
			alert('Invalid year. It is in the psst');
		}
		else{
			//check month
			if(m<1 || m>12){
				alert('Invalid Month');
			}
			else{
				//check date
				switch(m){
					case 1:
					case 3:
					case 5:
					case 7:
					case 8:
					case 10:
					case 12:
						if(d<1 || d>31) alert('Invalid date');
						else dc = true;
						break;
					case 4:
					case 6:
					case 9:
					case 11:
						if(d<1 || d>30) alert('Invalid date');
						else dc = true;
						break;
					case 2:
						//checking for leap year
						if(y%400 == 0){
							if(d<1 || d>29) alert('Invalid date');
							else dc = true;
							break;
						}
						else{
							if(y%100 == 0){
								if(d<1 || d>28) alert('Invalid Date');
								else dc = true;
								break;
							}
							else if(y%4 == 0){
								if(d<1 || d>29) alert('Invalid date');
								else dc = true;
								break;
							}
							else{
								if(d<1 || d>28) alert('Invalid date');
								else dc = true;
								break;
							}
						}
						break;
					default:
						alert('Wrong Month');
				}
				if(dc){
					//check the hour
				if(h<0 || h>23) alert('Incrroect hour');
				else{
					//check minute
					if(mi<0 || mi>59) alert('Incorrect minutes');
					else{
						//check seconds
						if(s<0 || s>59) alert('Incorrect seconds');
						else{
							toBe = new Date(y,m-1,d,h,mi,s,0);
							alert('The deadline for this task is '+toBe.toDateString()+" :P ");
							//alert('The date to be is '+date);
							//Make the time set and clock run
							set=true;
							run=true;
							//ended = false;
							document.getElementById('year').style.visibility = "hidden";
							document.getElementById('month').style.visibility = "hidden";
							document.getElementById('date').style.visibility = "hidden";
							document.getElementById('hourI').style.visibility = "hidden";
							document.getElementById('minute').style.visibility = "hidden";
							document.getElementById('secondI').style.visibility = "hidden";
							
							document.getElementById('start').style.visibility = "hidden";
			
							var timLe = document.getElementById('timLeft');
							timLe.innerHTML = "Time Left for "+toBe + " is ";
						}
					}
				}
				}
			}
		}
		
		
	}
	//the start button is resume button now
	else if(set && !run){
		run = true;
		document.getElementById('start').style.visibility = "hidden";
	}
};
//event listener for pause
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
		
		document.getElementById('year').style.visibility = "visible";
		document.getElementById('month').style.visibility = "visible";
		document.getElementById('date').style.visibility = "visible";
		document.getElementById('hourI').style.visibility = "visible";
		document.getElementById('minute').style.visibility = "visible";
		document.getElementById('secondI').style.visibility = "visible";
		
		document.getElementById('start').style.visibility = "visible";
		document.getElementById('start').innerHTML = "Start";
		
		var timLe = document.getElementById('timLeft');
		timLe.innerHTML = "Time Left for ";
	}
};
//set repeating function every second
setInterval(calcIt,1000);