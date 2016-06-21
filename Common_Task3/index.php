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
	<title>Member Login Page</title>
	<link rel="stylesheet" type="text/css" href="login.css">
</head>
<body>
<div id="login">
	<form action = "login_auth.php" method="POST">
		<header>Member Login</header>
		<label>Username</label>
		<input required name = "user_name" id="user_name"/>
		<label>Password</label>
		<input type="password" required name = "password" id="password"/>
		<button id="logBtn" onclick="return btnClick()">Login</button>
		<center><div id="register">New User? Register <a href="register.php">HERE</a></div></center>
	</form>
</div>
<script src="login.js" type='text/javascript'>
</script>
</body>
</html>