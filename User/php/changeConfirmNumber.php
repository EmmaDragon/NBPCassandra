
<?php

include_once 'lib.php';
$base=new UserService();

if(isset($_POST["Id"]))
{
  $user=$base->changeUserData($_POST["Id"]);
 
}

?>

