<?php

include_once 'lib.php';
$base=new UserService();
$user=null;
if(isset($_POST["Email"]) && isset($_POST["Password"]))
{
  $user=$base->getUser($_POST["Email"]);
  if (!password_verify($_POST["Password"], $user->password)) {
    $user=null;
} 
 
}
echo json_encode($user);
?>