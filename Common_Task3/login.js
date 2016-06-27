function btnClick(){
	return validate();
}

//Function to validate user input
function validate(){
	var n = document.getElementById('user_name').value;
	var p = document.getElementById('password').value;
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
	//Check pass
	if(!(/\S/.test(p))){
		alert("The password must contain atleast 1 non-whitespace character, and must not be empty");
		return false;
	}
	return true;
}
//Code for AJAX request
document.getElementById('logi').addEventListener("submit",function(e){
	//Prevent default action for the form
	e.preventDefault();
	var f = e.target;
	var data = new FormData(f);
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			if(xhttp.responseText === "Success"){
				//Successful login attempt
				document.getElementById('logi').reset();
				window.location.href = '/../Delta_2016_3/user.php';
            }
            else{
				if(xhttp.responseText === "Already logged in"){
					//user was already logged in another tab
					alert('User already logged in');
					location.reload();
				}
				else if(xhttp.responseText === "It seems you have not registered yet"){
					//User had not registered yet.
					alert("It seems you have not registered yet.Redirecting to the register page");
					document.getElementById('logi').reset();
					window.location.href = '/../Delta_2016_3/register.php';
				}
                else alert(xhttp.responseText);
            }
		}
	};
	
	xhttp.open(f.method,f.action,true);
	xhttp.send(data);
})