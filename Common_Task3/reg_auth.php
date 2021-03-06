<?php
session_start();
require "connect.php";

if(!(isset($_POST["Name"]) && isset($_POST["Phone"]) && isset($_POST["email"])  && isset($_POST["pass"]) && isset($_POST["conf"]))){
	die("Please fill the form first");
}


header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

$message = "Hello";

	if(isset($_SESSION['login_status']) && $_SESSION['login_status'] == true){
		//User already logged in another tab
		die("Already logged in");
	}

//Function to validate the input
function validateInp($n,$p,$e,$f,$pa,$c){
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
	//Test phone number
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


if(validateInp($name,$phone,$email,$filename,$pass,$conf)){
	//All details were valid
	
	$filename = basename($_FILES['imageUpload']['name']);
	
	$store = password_hash($pass,PASSWORD_BCRYPT);
	
	$sql = $conn->prepare("INSERT INTO `delta_2016_3` (`Username`, `Phone`, `Email`, `Picture`, `Password`) VALUES (?, ?, ?, ?, ?)");
	$sql->bind_param("sssss",$name,$phone,$email,$filename,$store);
	$bo = $sql->execute();
	if($bo){
		//Insert was successful
		
		mkdir($name.'/images',0777,true);
		chmod($name,0777);
		chmod($name.'/images',0777);
		$target_dir = $name . '/' . 'images/';
		$target_file = $target_dir . basename($_FILES["imageUpload"]["name"]);
		$uploadOk = 1;
		$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
		if(move_uploaded_file($_FILES["imageUpload"]["tmp_name"],$target_file)){
			//echo "The file ". basename($_FILES["imageUpload"]["name"]). " has been uploaded.";
			echo "Success";
		} else {
			echo "Sorry, there was an error uploading your file.";
		}
		
		$myFile = "./".$name."/index.php";
		$fh = fopen($myFile, 'w') or die("error");
		$stringData = "<?php
		echo '<h3>$name</h3><br/>';
		echo '<img src = \'images/$filename \' width=\'300px\' height=\'300px\' alt= \'Sorry No Image was found \' />';
		echo '<br/><h4>Phone: $phone</h4><br/>';
		echo '<p>Email: $email</p><br/>';
		?>";	
		
		fwrite($fh,$stringData);
	}
	else{
		echo "Could not insert into the table.Someone might have registered with the same username, phone or email";
	}
}
else{
	echo "Invalid details. '$message'";
}

?>