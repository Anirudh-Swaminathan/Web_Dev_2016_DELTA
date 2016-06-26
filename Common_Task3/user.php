<?php
require "login_checker.php";

if(isset($_SESSION["login_status"]) && isset($_SESSION["username"]) && isset($_SESSION["phone"]) &&isset($_SESSION["email"]) &&isset($_SESSION["pic"]) ){ 
	$user = $_SESSION["username"];
	$phone = $_SESSION["phone"];
	$email = $_SESSION["email"];
	$pic = $_SESSION["pic"];
}
else{
	$redirect_pag = '/../Delta_2016_3/';
	session_unset();
	session_destroy();
	redirect($redirect_pag);
}
?>
<!DOCTYPE html>
<html>
<head>
	<title><?php global $user; echo "$user";?></title>
	<link rel="stylesheet" href="user.css" type="text/css"/>
</head>
<body>
	<ul id="drop-nav">
		<li><a href="search.html">View All Users</a></li>
		<li><a href="#">Update details</a>
		<ul>
			<li><a href="update.php">Update Password<br/>(Pic Optional)</a></li>
			<li><a href="upPa.php">Update Picture Only</a></li>
		</ul>
		</li>
  		<li><a href="logout.php">Logout</a></li>
	</ul>
	<!-- End of menu -->
	<div id="details">
		<h4><?php global $user; echo "$user"?></h4>
		<img src="<?php global $user,$pic; echo "$user/images/$pic"; ?>" alt="Profile Picture" width="450" height="450"/>
		<p>Phone: <?php global $phone; echo "$phone"; ?></p>
		<p>Email ID: <?php global $email; echo "$email"; ?></p>
	</div>
</body>
</html>