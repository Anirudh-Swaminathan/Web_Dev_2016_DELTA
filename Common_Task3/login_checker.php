<?php
   session_start();
   $logged_in_status = false;
   $redirect_page1 = '/../Spider_2016_4/index.php';
   function redirect($redirect_page){
   		
		header('Location: '.$redirect_page);
   }
   if(!isset($_SESSION['username'])){
       redirect($redirect_page1);
   }
   $user_name = $_SESSION['username'];
   $logged_in_status = $_SESSION['login_status'];
   if(!isset($_SESSION['login_status'])){
	   reditrect($redirect_page1);
   }
   if($logged_in_status);
   else{
	   session_unset();
	   session_destroy();
		redirect($redirect_page1);
   }

?>