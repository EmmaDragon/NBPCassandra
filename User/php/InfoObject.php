<?php
class InfoObject {
   public $user;
   public $nameOfFile;
   public $date;
   public $commnet;
 
   
   function  __construct($id,$name,$date,$comment){
      
     $this->user=$id;
     $this->nameOfFile=$name;
     $this->comment=$comment;
     $this->date=$date;
  

   }
   
}