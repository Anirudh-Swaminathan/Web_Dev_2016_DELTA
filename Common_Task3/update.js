function btnClick(){
	return validate();
}
function validate(){
	var pass = document.getElementById("pass").value;
	var c = document.getElementById("conf").value;
	
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
		alert("Updating only password");
	}
	return true;	
}
document.getElementById('logi').addEventListener("submit",function(e){
	
	e.preventDefault();
	var f = e.target;
	var data = new FormData(f);
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			if(xhttp.responseText === "Success"){
				document.getElementById('logi').reset();
				
				alert('Successfully updated. Taking you to profile page now');
				window.location.href = '/../Delta_2016_3/user.php';
            }
            else{
				if(xhttp.responseText === "Not logged in"){
					alert('Please Login');
					location.reload();
				}
                else alert(xhttp.responseText);
            }
		}
	};
	xhttp.open(f.method,f.action,true);
	xhttp.send(data);
})
