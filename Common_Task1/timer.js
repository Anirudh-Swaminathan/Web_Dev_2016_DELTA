var toBe = new Date(2016,4,28,23,59,59,0);//year,month,date,hour,minute,second,millis
alert('The deadline for this task is '+toBe.toDateString()+" :P ");
//Set the deadline.
var ended = false;

var timLe = document.getElementById('timLeft');
timLe.innerHTML = timLe.innerHTML + toBe + " is ";
var calcIt = function(){
	var now = new Date();
	//alert('The present date is '+now.toDateString());
	
	var day = document.getElementById('day');
	var hour = document.getElementById('hour');
	var minu = document.getElementById('minu');
	var seco = document.getElementById('seco');
	
	if(toBe<now && !ended){
		alert('THE DEADLINE IS PAST!!!!');
		ended = true;
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
setInterval(calcIt,1000);