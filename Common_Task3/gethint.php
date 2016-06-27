<?php
require "connect.php";
// Array with names
$sql = $conn->prepare("SELECT Username from delta_2016_3");
$sql->execute();
$sql->bind_result($user);
while($sql->fetch()){
	$a[] = $user;
}

// get the q parameter from POST Request
$q = $_POST["q"];

$hint = "";

// lookup all hints from array if $q is different from "" 
if ($q !== "") {
    $q = strtolower($q);
    $len=strlen($q);
    foreach($a as $name) {
        if (stristr($q, substr($name, 0, $len))) {
            if ($hint === "") {
                $hint = $name;
            } else {
                $hint .= ", $name";
            }
        }
    }
}

// Output "no suggestion" if no hint was found or output correct values 
echo $hint === "" ? "no suggestion" : $hint;
?>