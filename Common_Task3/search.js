function showHint(str) {
    if (str.length == 0) { 
        document.getElementById("txtHint").innerHTML = "";
        return;
    } else {
        var xmlhttp = new XMLHttpRequest();
		var formdata  = new FormData();
		formdata.append("q",str);
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                //document.getElementById("txtHint").innerHTML = xmlhttp.responseText;
				var a = xmlhttp.responseText;
				if(a==="no suggestion"){
					document.getElementById("users").innerHTML = a;
				}
				else{
					var users = document.getElementById("users");
					users.innerHTML = "";
					a.split(/\s*,\s*/).forEach(function(user) {
						//alert(""+user);
						users.innerHTML += "<a href='/../Delta_2016_3/" +user+ "' target='__blank'><div class = 'user'>" +
						"<h4>" +user+ "</h4>" +
						"</div></a>";
					});
				}
            }
        };
        xmlhttp.open("POST", "gethint.php", true);
        xmlhttp.send(formdata);
    }
}