<?php

include_once 'lib.php';
$base=new UserService();
$user=null;
if(isset($_POST["Id"]))
{
  $user=$base->getUserById($_POST["Id"]);
 
}
echo json_encode($user);
?>
