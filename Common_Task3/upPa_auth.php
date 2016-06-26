<?php
session_start();
require "connect.php";

//echo "Hello. AJAX was successful";

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

$message = "Hello";

if(!(isset($_SESSION['login_status']) && $_SESSION['login_status'] == true)){
	die("Not logged in");
}

function validateInp($f){
	global $message;
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
	return true;
}

$filename = basename($_FILES["imageUpload"]["tmp_name"]);


//echo "The posted details are '$name' <br/> '$phone' <br/> '$email' <br/> '$filename' <br/> '$pass' <br/> '$conf' ";

if(validateInp($filename)){
	//echo "All details were valid";
	$filename = basename($_FILES['imageUpload']['name']);
		
	$sql = $conn->prepare("UPDATE `delta_2016_3` SET `Picture` = ? WHERE `delta_2016_3`.`Username` = ?");
	$sql->bind_param("ss",$filename,$_SESSION['username']);
	$bo = $sql->execute();
	if($bo){
		//echo "Insert was successful";
		
		unlink("".$_SESSION["username"]."/images/".$_SESSION["pic"]);	
		
		$target_dir = $_SESSION["username"] . '/' . 'images/';
		$target_file = $target_dir . basename($_FILES["imageUpload"]["name"]);
		$uploadOk = 1;
		$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
		if(move_uploaded_file($_FILES["imageUpload"]["tmp_name"],$target_file)){
			//echo "The file ". basename($_FILES["imageUpload"]["name"]). " has been uploaded.";
			echo "Success";
		} else {
			echo "Sorry, there was an error uploading your file.";
		}
		$_SESSION["pic"] = $filename;
		
		$name = $_SESSION['username'];
		$phone = $_SESSION['phone'];
		$email = $_SESSION['email'];
			
		unlink("./".$name."/index.php");
		
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
		echo "Could not insert into the table.";
	}
	$sql->close();
	$conn->close();
}
else{
	echo "Invalid details. '$message'";
}

?>