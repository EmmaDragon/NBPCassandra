<?php


class User {
   public $id;
   public $firstName;
   public $lastName;
   public $email;
   public $password;
   public $freeSpace;
   public $confirmNumber;
   
   function  __construct($id,$firstName,$lastName,$email,$password,$freeSpace,$confirmNumber){
      
      $this->id=$id;
      $this->firstName=$firstName;
      $this->lastName=$lastName;
      $this->email=$email;
      $this->password=$password;
      $this->freeSpace=$freeSpace;
      $this->confirmNumber=$confirmNumber;
   }
   
}
