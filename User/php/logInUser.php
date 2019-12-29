<?php
//require_once "config.php";
include_once 'lib.php';
$base=new UserService();
$user=null;
if(isset($_POST["Id"]))
{
// Define variables and initialize with empty values
$username = $password = "";

$user=$base->getUserById($_POST["Id"]);
$base->addLogIn($_POST["Id"]);
$username=$user->email;
$password=$user->password;

session_start();
                            
// Store data in session variables
$_SESSION["loggedin"] = true;
$_SESSION["id"] =$_POST["Id"];
$_SESSION["username"] = $username;                            
                            
// Redirect user to welcome page
//header("Location: ../html/profile.html");
echo json_encode(true);

} 

