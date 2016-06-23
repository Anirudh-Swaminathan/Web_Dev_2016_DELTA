function btnClick(){
	return validate();
}
function validate(){
	var n = document.getElementById("Name").value;
	var e = document.getElementById("email").value;
	var p = document.getElementById("Phone").value;
	var pass = document.getElementById("pass").value;
	var c = document.getElementById("conf").value;
	
	//Test name
	if (!(/[a-zA-Z]/.test(n))) {
		alert('No Letter Found in name');
		return false;
	}
	if(/\d/.test(n)){
		alert('Name shouldn\'t contain any number');  
		return false;
	}
	if (!(/\S/.test(n))) {
		alert('The name must not be only whiteSpace');
		return false;
		
	}

	//Check phone
	if(!(/\d/.test(p))){
		alert("Phone must contain only digits");
		return false;		
	}
	if(p.length !== 10){
		alert("Mobile number must contain 10 digits");
		return false;
	}
	 
	//Check mail
	if(e === ""){
		alert("Email must not be empty");
		return false;
	}
	if(!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.+[a-zA-Z]{2,4}$/.test(e))){
		alert("Invalid mail address");
		return false;
	}
	/*
	var atpos = e.lastIndexOf("@");
    var dotpos = e.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        alert("Not a valid e-mail address");
        return false;
    }
	*/
	//alert("Pass is "+pass+" Length of pass is "+pass.length);
	//alert("Conf is "+c+" length of conf is "+c.length);
	
	//Check pass
	if(!(/\S/.test(pass))){
		alert("The password must contain atleast 1 non-whitespace character, and must not be empty");
		return false;
	}
	if(!(/\S/.test(c))){
		alert("The Confirm password must contain atleast 1 non-whitespace character, and must not be empty");
		return false;
	}
	if(pass !== c){
		alert("Please re-enter the exact same password in the Confirm Password field");
		return false;
	}
	
	//Check the pic
	if( document.getElementById("imageUpload").files.length == 0 ){
		alert("no files selected");
		return false;
	}
	return true;	
}
document.getElementById('regis').addEventListener("submit",function(e){
	//alert('Clicked Button');
	e.preventDefault();
	var f = e.target;
	alert(f);
	var data = new FormData(f);
	alert(data);
	alert("Method is "+f.method);
	alert("Action is "+f.action);
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			alert(xhttp.responseText);
		}
	};
	xhttp.open(f.method,f.action,true);
	xhttp.send(data);
})
/*
document.getElementById('regis').addEventListener("submit", function(e) {
	if(validate()){
    e.preventDefault()
    var form = e.target
    var data = new FormData(form)

    var request = new XMLHttpRequest()

    request.onreadystatechange = function() {
      //document.getElementById("result").innerText = request.responseText
	  alert(request.responseText)
    }

    request.open(form.method, form.action)
    request.send(data)
	}
  })
  */