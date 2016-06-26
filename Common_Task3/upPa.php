<?php
require "connect.php";
require "login_checker.php";
?>
<!DOCTYPE html>
<html>
<head>
	<title>Update details</title>
	<link rel="stylesheet" type="text/css" href="update.css">
</head>
<body>
<div id="login">
	<form id = "logi" action = "upPa_auth.php" method="POST" enctype="multipart/form-data">
		<header>Update Details</header>
		<label>Username: </label>
		<?php echo "".$_SESSION['username']; ?>
		<br/>
		<label>Email: </label>
		<?php echo "".$_SESSION['email']; ?>
		<br/>
		<label>Phone: </label>
		<?php echo"".$_SESSION['phone'];?>
		<br/>
		<label>Change Pic</label>
		<input required type="file" name="imageUpload" id="imageUpload">
		<button id="upBtn" onclick="return btnClick()">Update</button>
		<center><div id="register">Profile Page <a href="user.php">HERE</a></div></center>
	</form>
</div>
<script src="upPa.js" type='text/javascript'>
</script>
</body>
</html>