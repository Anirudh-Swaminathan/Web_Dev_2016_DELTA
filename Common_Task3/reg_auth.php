<?php
require "connect.php";

if(!(isset($_POST["Name"]) && isset($_POST["Phone"]) && isset($_POST["email"])  && isset($_POST["pass"]) && isset($_POST["conf"]))){
	echo "Please fill the form first";
}
//echo "Hello. AJAX was successful";

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

$message = "Hello";

function validateInp($n,$p,$e,$f,$pa,$c){
	global $message;
	if(!(preg_match('/[a-zA-Z][a-zA-Z ]+|[a-zA-Z]/',$n))){
		$message = 'Username must not be empty';
		return false;
	}
	if(strlen(trim($n)) == 0){
		$message = 'Username must contain atleast 1 non-whitespace character';
		return false;
	}
	if(!strcmp($p,'')){
		$message = 'Phone number must not be empty';
		return false;
	}
	if(strlen(trim($p)) == 0){
		$message = 'Phone number must contain atleast 1 non-whitespace character';
		return false;
	}
	if(!(preg_match("/^[0-9]{10}$/",$p))){
		$message = "Invalid phone number";
		//echo "<script>alert('$message');</script>";
		//^[0-9]{2}$
		//\d{9}
		return false;
	}
	
	//Check mail
	if(!filter_var($e,FILTER_VALIDATE_EMAIL)){
		$message = "Invalid email";
		return false;
	}
	
	//Check if upload was an image
	if ($_FILES['imageUpload']['error'] !== UPLOAD_ERR_OK) {
		//die("Upload failed with error code " . $_FILES['file']['error']);
		$message = "Upload failed with error code ". $_FILES['imageUpload']['error'];
		return false;
	}

	$info = getimagesize($_FILES['imageUpload']['tmp_name']);
	if ($info === FALSE) {
		//die("Unable to determine image type of uploaded file");
		$message = "Unable to determine image type of uploaded file";
		return false;
	}

	if (($info[2] !== IMAGETYPE_GIF) && ($info[2] !== IMAGETYPE_JPEG) && ($info[2] !== IMAGETYPE_PNG)) {
		//die("Not a gif/jpeg/png");
		$message = "Not a gif/jpeg/png";
		return false;
	}
	
	//Check the passwords
	if(!(preg_match('/\S/',$pa))){
		$message = 'Password must not be empty and must contain atleast 1 non-whitespace character';
		return false;
	}
	if(!strcmp($c,'')){
		$message = 'Confirm Password must not be empty and must contain atleast 1 non-whitespace character';
		return false;
	}
	if(strcmp($pa,$c)){
		$message = 'Confirm Password must be the same as that of the Password';
		return false;
	}
	return true;
}

$name = $_POST["Name"];
$phone = $_POST["Phone"];
$email = $_POST["email"];
$filename = basename($_FILES["imageUpload"]["tmp_name"]);
$pass = $_POST["pass"];
$conf = $_POST["conf"];

echo "The posted details are '$name' <br/> '$phone' <br/> '$email' <br/> '$filename' <br/> '$pass' <br/> '$conf' ";

if(validateInp($name,$phone,$email,$filename,$pass,$conf)){
	echo "All details were valid";
}
else{
	echo "Invalid details due to <br/> '$message'";
}

?>