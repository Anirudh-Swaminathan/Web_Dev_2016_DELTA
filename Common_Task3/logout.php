<?php
session_start();
require 'login_checker.php';
$redirect_page2 = '/../Delta_2016_3/';
session_unset();
session_destroy();
redirect($redirect_page2);
?>