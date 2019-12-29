<?php

include_once 'lib.php';
$base=new UserService();
$user=null;
if(isset($_POST["Email"]))
{
  $user=$base->getUser($_POST["Email"]);
 
}
echo json_encode($user);
?>