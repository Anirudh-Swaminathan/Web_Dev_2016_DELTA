function btnClick(){
	return validate();
}
function validate(){
	var n = document.getElementById('user_name').value;
	var p = document.getElementById('password').value;
	if(n === ''){
		alert('username must not be empty');
		return false;
	}
	if(p === ''){
		alert('Password must not be empty');
		return false;
	}
	return true;
}