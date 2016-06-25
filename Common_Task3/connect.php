<?php
$db_name = "delta_2016";
$mysql_username = "root";
$mysql_password = "Cjul1968ScB";
$server_name = "localhost";
$conn = mysqli_connect($server_name, $mysql_username, $mysql_password, $db_name);
if($conn->connect_error){
		die("Connection failed : " . $conn->connect_error);
}
?>