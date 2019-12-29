<?php

require '/usr/share/php/libphp-phpmailer/class.phpmailer.php';
require '/usr/share/php/libphp-phpmailer/class.smtp.php';

include_once 'lib.php';
$baza=new UserService();
$randomNumber=rand(1000,9999);

if(isset($_POST["Email"]))
{
   
    $password= password_hash($_POST['Password'], PASSWORD_BCRYPT);
    $user=new User(0,$_POST['FirstName'],$_POST['LastName'],
    $_POST['Email'],$password,
    $_POST['FreeSpace'],$randomNumber);

 $baza->addUser($user);
 

 $mail=new PHPMailer;
 $mail->isHTML(true);
 $mail->setFrom('emilija.s.s.s.b@gmail.com');
 $mail->addAddress($_POST["Email"]);
 $mail->Subject="Registration Successful!";
 
 $mail->Body="Dear,<br><br>"
         . "You have successfully registered your MyCloud account.<br><br>"
         . "Your Username is ".$_POST["Email"].".<br><br>"
         . "Your secure code is ".$randomNumber." .<br><br>"
         . "Thank you for your trust!<br><br>"
         . "Best regards,<br>"
         . "MyCloud.";
 
 $mail->isSMTP();
 $mail->SMTPSecure='ssl';
 $mail->Host='ssl://smtp.gmail.com';
 $mail->SMTPAuth=true;
 $mail->Port=465;
 $mail->Username='emilija.s.s.s.b@gmail.com';
 $mail->Password='Ema@03071997';
 

 
 if($mail->send())
     echo "Email sent!";
 else
     echo "Wrong!".$mail->ErrorInfo;
 


}
else
{
    echo "Error - send";
   
}


?>
