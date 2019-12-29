<?php

include_once 'lib.php';

$base=new UserService();

$base->addLogOut($_POST["idUser"]);
// Initialize the session
session_start();
 
// Unset all of the session variables

$_SESSION = array();

// Destroy the session.
session_destroy();
 
// Redirect to login page
//header("Location: ../html/index.html");
//exit;
echo json_encode(true);
?>
