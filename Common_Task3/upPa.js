function btnClick(){
	return validate();
}
function validate(){
	
	//Check the pic
	if( document.getElementById("imageUpload").files.length == 0 ){
		alert("no files selected");
		return false;
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
