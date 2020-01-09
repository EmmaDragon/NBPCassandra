<?php
class Comment {
   public $firstName;
   public $lastName;
   public $email;
   public $content;
   public $date;
 
   
   function  __construct($firstName,$lastName,$email,$comment,$date){
      
     $this->firstName=$firstName;
     $this->lastName=$lastName;
     $this->email=$email;
     $this->content=$comment;
     $this->date=$date;

   }
   
}

