<?php
class File {
   public $id;
   public $nameOfFile;
   public $content;
   public $crc;
   public $date;
   public $user;
   public $nameWithoutExt;
   public $size;
   public $state;
   
   function  __construct($id,$name,$content,$crc,$date,$user){
      
     $this->id=$id;
     $this->nameOfFile=$name;
     $this->content=$content;
     $this->crc=$crc;
     $this->date=$date;
     $this->user=$user;

   }
   
}

