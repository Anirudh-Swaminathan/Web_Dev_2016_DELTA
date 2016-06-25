function btnClick(){
	return validate();
}
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
document.getElementById('logi').addEventListener("submit",function(e){
	//alert('Clicked');
	e.preventDefault();
	var f = e.target;
	var data = new FormData(f);
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			//alert(xhttp.responseText);
			if(xhttp.responseText === "Success"){
				document.getElementById('logi').reset();
				
				//alert('Login Successful');
				window.location.href = '/../Delta_2016_3/user.php';
            }
            else{
				if(xhttp.responseText === "Already logged in"){
					alert('User already logged in');
					location.reload();
				}
				else if(xhttp.responseText === "It seems you have not registered yet"){
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