<?php
use PHPMailer\PHPMailer\PHPMailer;
require_once '../../PHPMailer/PHPMailer.php';
require_once '../../PHPMailer/SMTP.php';
require_once '../../PHPMailer/Exception.php';
include_once '../../User/php/lib.php';

 $randomNumber=rand(1000,9999);
 $mail=new PHPMailer();
 $mail->isSMTP();
 $mail->Host="smtp.gmail.com";
 $mail->SMTPAuth=true;
 $mail->Username="emilija.s.s.s.b@gmail.com";
 $mail->Password="Ema@03071997";
 $mail->Port="465";
 $mail->SMTPSecure="ssl";
 
 $mail->isHTML(true);
 $mail->setFrom($_POST["email"],"MyCloud");
 $mail->addAddress($_POST["email"]);
 $mail->AddAttachment($file_name); 
 $mail->Subject="New Account";
 $mail->Body = "Dear,<br><br>"
         . "You have successfully created an account..<br><br>"
         . "Your confirm number is: ".$randomNumber
         . "Best regards,<br>"
         . "MyCloud.";

 if($mail->send())
 {
     echo "Email sent!";
 }
 else
     echo "Wrong!".$mail->ErrorInfo;
