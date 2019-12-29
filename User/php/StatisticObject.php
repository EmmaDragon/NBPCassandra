<?php
class StatisticObject {
   public $user;
   public $downloaded;
   public $uploaded;
   public $deleted;
  
   
   function  __construct($user,$downloaded,$uploaded,$deleted){
      
     $this->user=$user;
     $this->downloaded=$downloaded;
     $this->uploaded=$uploaded;
     $this->deleted=$deleted;
   }
   
}

