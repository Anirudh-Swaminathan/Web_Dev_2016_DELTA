<?php
session_start();
?>
<?php
	require "connect.php";
	
	header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
	header("Cache-Control: post-check=0, pre-check=0", false);
	header("Pragma: no-cache");

	$message = "Hello";

	if(isset($_SESSION['login_status']) && $_SESSION['login_status'] == true){
		//echo "You have already logged in another tab";
		//header("Location: /Spider_2016_4/bulletin.php");
		die("Already logged in");
	}

	//Function to validate input
	function validateInp($n,$p){
		global $message;
		//Test name
		if(!(preg_match('/[a-zA-Z][a-zA-Z ]+|[a-zA-Z]/',$n))){
			$message = 'Username must not be empty';
			return false;
		}
		if(strlen(trim($n)) == 0){
			$message = 'Username must contain atleast 1 non-whitespace character';
			return false;
		}
		//Check the password
		if(!(preg_match('/\S/',$p))){
			$message = 'Password must not be empty and must contain atleast 1 non-whitespace character';
			return false;
		}
		return true;
	}
	if(!(isset($_POST["user_name"]) && isset($_POST["password"]))){
		$message = "Please fill the login details";
		die("Please fill the login details");
		//echo "<script type='text/javascript'>alert('$message');window.location.href='/Spider_2016_4/';</script>";
	}
	$user_name = $_POST["user_name"];
	$user_pass = $_POST["password"];

	$_SESSION['login_status'] = false;
	$_SESSION['username'] = $user_name;
	
	if(validateInp($user_name,$user_pass)){
		$sql = $conn->prepare("SELECT Password,Phone,Email,Picture FROM delta_2016_3 where Username = ?");
		$sql->bind_param("s",$user_name);
		$sql->execute();
		$sql->bind_result($pass,$phone,$emai,$pic);
		$sql->store_result();
		
		if($sql->num_rows == 0){
			//User hasn't registered yet
			$message = "It seems you have not registered yet";
			session_unset();
			session_destroy();
			echo "$message";
		} else {
			while($sql->fetch()){
				//do nothing
			}
			if(password_verify($user_pass,$pass)){
				echo "Success";
				$_SESSION['login_status'] = true;
				$_SESSION['phone'] = $phone;
				$_SESSION['email'] = $emai;
				$_SESSION['pic'] = $pic;
			} else {
				//Incorrect password for the given username
				$message = "Incorrect password for the given username";
				session_unset();
				session_destroy();
				echo "$message";
			}
		}
		$sql->close();
		$conn->close();
	}
	else{
		session_unset();
		session_destroy();
		echo "$message";
	}
?>