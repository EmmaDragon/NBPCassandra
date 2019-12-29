<?php


class UserActivity {
   public $user;
   public $upload;
   public $downlaod;
   public $delete;
   public $logIn;
   public $logOut;
   
   
   function  __construct($user,$logIn,$logOut,$upload,$download,$delete){
      
      $this->user=$user;
      $this->logIn=$logIn;
      $this->logOut=$logOut;
      $this->upload=$upload;
      $this->downlaod=$download;
      $this->delete=$delete;
     
   }
   
}
