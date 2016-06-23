<?php
session_start();
$redirect_page = '/../Spider_2016_4/bulletin.php';
if(isset($_SESSION['login_status']) && $_SESSION['login_status']){
	header('Location: '.$redirect_page);
}
?>
<!DOCTYPE html>
<html>
<head>
	<title>Registration Page</title>
	<link rel="stylesheet" type="text/css" href="register.css">
</head>
<body>
<div id="login">
	<form id="regis" action="reg_auth.php" method="POST" enctype="multipart/form-data">
		<header>Member Login</header>
	
		<label>Name</label>
		<input required name="Name" pattern="[a-zA-Z][a-zA-Z ]+|[a-zA-Z]" title="Enter only alphabets and spaces" id="Name"/>
		<br/>
		
		<label>Phone</label>
		<input required name="Phone" maxlength = "10" pattern="^[0-9]{10}$" title="Enter a valid 10 digit phone number" id="Phone"/>
		<br/>
	
		<label>Email</label>
		<input required name="email" type="email" placeholder="Enter you Email" id="email"/>
		<br/>
	
		<label>Pic</label>
		<!--<input required name="imageUpload" type="file" id="imageUpload"/>-->
		<input required type="file" name="imageUpload" id="imageUpload">
		<br/>
	
		<label>Password</label>
		<input required name="pass" type="password" id="pass" id="pass"/>
		<br/>
		
		<label>Confirm Password</label>
		<input required name="conf" type="password" id="conf" id="conf"/>
		<br/>

		<button id="logBtn" onclick="return btnClick()" >Register</button> <!-- onclick="return btnClick()" -->
		<center><div id="register">Login <a href="index.php">HERE</a></div></center>
	</form>
</div>
<script src="register.js" type='text/javascript'>
</script>
</body>
</html>