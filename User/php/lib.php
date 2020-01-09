<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
include_once 'IUserService.php';
include_once 'User.php';
include_once 'File.php';
include_once 'UserActivity.php';
include_once 'StatisticObject.php';
include_once 'InfoObject.php';
include_once 'Comment.php';


class UserService implements IUserService
{
  

    
    public function addUser($user) {
       
    $cluster   = Cassandra::cluster()->build();
    $keyspace  = 'mycloudstore2019';
	$session   = $cluster->connect($keyspace); 
    $queryString="INSERT INTO mycloudstore2019.user ( firstname, lastname," 
    ." email, password, freespace, confirm)"
    . " VALUES "
    . "( '$user->firstName', '$user->lastName', '$user->email', '$user->password', "
    . "$user->freeSpace, $user->confirmNumber)";

    $statement = new Cassandra\SimpleStatement($queryString);
    $result    = $session->execute($statement);

    $queryString="INSERT INTO mycloudstore2019.activityofuser ( user)"
    . " VALUES "
    . "('$user->email')";

    $statement = new Cassandra\SimpleStatement($queryString);
    $result    = $session->execute($statement);
	
    }



    public function getUser($username) {
   	$cluster   = Cassandra::cluster()->build();
           
    $keyspace  = 'mycloudstore2019';

    $session   = $cluster->connect($keyspace); 
   $queryString="SELECT * FROM mycloudstore2019.user WHERE email='$username'";
 
    $statement =new Cassandra\SimpleStatement($queryString);
    $result=$session->execute($statement);
	$user=null;
    if($result->count()!=0)			
	{

        foreach($result as $row)
        $user=new User($row['email'],$row['firstname'],$row['lastname'],
$row['email'],$row['password'],$row['freespace'],$row['confirm']);           
    }

            
    return $user;

    
    }


  public function userExist($email, $password) {
        $cluster   = Cassandra::cluster()->build();
        $keyspace  = 'mycloudstore2019';
        $session   = $cluster->connect($keyspace);
        $queryString="SELECT * FROM mycloudstore2019.user WHERE email='$email'";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result=$session->execute($statement);
        if($result->count()!=0)
        {
            foreach($result as $row)
            {
                if($row['password']==$password)
                 {
                     $user=new User($row['email'],$row['firstname'],
$row['lastname'],$row['email'],$row['password'],$row['freespace'],
$row['confirm']);
                 }
                 else
                 {
                     $user = null;
                 }
            }
        }
		else
		{
			   $user = null;
		}
    
        return $user;
        
    }

   public function getUserById($id) {
	$cluster   = Cassandra::cluster()->build();
    $keyspace  = 'mycloudstore2019';
    $session   = $cluster->connect($keyspace); 
    $queryString="SELECT * FROM mycloudstore2019.user WHERE email='$id'";
    $statement =new Cassandra\SimpleStatement();
    $result=$session->execute($queryString);
	$user=null;
    if($result->count()!=0)			
	{

        foreach($result as $row)
        $user=new User($row['email'],$row['firstname'],$row['lastname'],
$row['email'],$row['password'],$row['freespace'],$row['confirm']);
    }

    return $user;
    }


    public function changeUserData($id) {
    $cluster   = Cassandra::cluster()->build();
    $keyspace  = 'mycloudstore2019';
	$session   = $cluster->connect($keyspace); 
$queryString="UPDATE mycloudstore2019.user SET confirm = 0 WHERE email= '$id'"; 
    $statement = new Cassandra\SimpleStatement($queryString);
    $result    = $session->execute($statement);
	//return null; 
        
    }

    public function addFile($file) {
        $cluster   = Cassandra::cluster()->build();
        $keyspace  = 'mycloudstore2019';
        $session   = $cluster->connect($keyspace); 
        $queryString="INSERT INTO mycloudstore2019.files ( nameoffile, user, content, crc, date)"
        . " VALUES "
        . "('$file->nameOfFile','$file->user', asciiAsBlob('$file->content'), asciiAsBlob('$file->crc'),'$file->date')"; 
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);

        $size=strlen(strval($file->content));
        $queryString="INSERT INTO mycloudstore2019.filesbyname ( nameoffile, date, size, user)"
        . " VALUES "
        . "('$file->nameOfFile','$file->date', $size,'$file->user')"; 
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);

        $index = strrpos($file->nameOfFile,".");
        $extension = substr($file->nameOfFile,$index);
        $queryString="INSERT INTO mycloudstore2019.filesbyext ( nameoffile, extension, size, date, user)"
        . " VALUES "
        . "('$file->nameOfFile','$extension' ,$size,'$file->date','$file->user')"; 
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);

        $queryString="INSERT INTO mycloudstore2019.filesbysize ( nameoffile, size, date, user)"
        . " VALUES "
        . "('$file->nameOfFile',$size,'$file->date','$file->user')"; 
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);
       
        $queryString="INSERT INTO mycloudstore2019.filesbydate( nameoffile, size, date, user)"
        . " VALUES "
        . "('$file->nameOfFile',$size,'$file->date','$file->user')"; 
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);

        $queryString="INSERT INTO mycloudstore2019.useractivity ( nameoffile, user, date, state)"
        . " VALUES "
        . "('$file->nameOfFile','$file->user','$file->date', 'Uploaded')"; 
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);
            
    }
     //ovo je ok
    public function getFileIfExist($idUser, $fileName) {
        $cluster   = Cassandra::cluster()->build();
        $keyspace  = 'mycloudstore2019';
        $session   = $cluster->connect($keyspace); 
        $queryString="SELECT nameoffile, blobAsascii(content) as content, blobAsascii(crc) as crc, date, user from mycloudstore2019.files where user= '$idUser' and nameoffile='$fileName'";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);
        $file=null;
		foreach($result as $row)		
				$file=new File($row['nameoffile'],$row['nameoffile'],$row['content'], $row['crc'],$row['date'],
                                       $row['user']);
                                       
            
        return $file;
     
    }
    //ovo je ok
    public function getFile($idUser, $idFile) {
        $cluster   = Cassandra::cluster()->build();
        $keyspace  = 'mycloudstore2019';
        $session   = $cluster->connect($keyspace); 
        $queryString="SELECT nameoffile, blobAsascii(content) as content, blobAsascii(crc) as crc, date, user FROM mycloudstore2019.files WHERE user= '$idUser' AND nameoffile='$idFile'";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);
        $file=null;
		foreach($result as $row)		
				$file=new File($row['nameoffile'],$row['nameoffile'],$row['content'], $row['crc'],$row['date'],
                                       $row['user']);
                                       
         
        return $file;
     
    }
    //ovo je ok
    public function getAllFilesByUser($idUser) {
 
            $cluster   = Cassandra::cluster()->build();
            $keyspace  = 'mycloudstore2019';
            $session   = $cluster->connect($keyspace);
            $queryString="SELECT nameoffile, blobAsascii(content) as content, blobAsascii(crc) as crc, date, user FROM mycloudstore2019.files";
            $statement = new Cassandra\SimpleStatement($queryString);
            $result=$session->execute($statement);
            $files = array();
            foreach($result as $row)
            {
                if($row['user']==$idUser)
                    array_push($files, new File($row['nameoffile'],$row['nameoffile'],$row['content'], $row['crc'],$row['date'],
                    $row['user']));


            }	
                                       

           
            
            return $files;

    }

//ovo je ok
  public function getFreeSpace($idUser) {
    
                $cluster   = Cassandra::cluster()->build();
                $keyspace  = 'mycloudstore2019';
                $session   = $cluster->connect($keyspace); 
                $queryString="SELECT * from mycloudstore2019.user where email= '$idUser'";
                $statement = new Cassandra\SimpleStatement($queryString);
                $result    = $session->execute($statement);
                $freeSpace = null;
                foreach($result as $row)		
                    $freeSpace=$row['freespace'];                       
        
    
            
                return $freeSpace;
     
        
    }

    public function updateFreeSpace($idUser,$newFreeSpace) {
        $cluster   = Cassandra::cluster()->build();
        $keyspace  = 'mycloudstore2019';
        $session   = $cluster->connect($keyspace); 
        $queryString="UPDATE mycloudstore2019.user SET freespace = $newFreeSpace WHERE email= '$idUser'";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);
            
    }

    public function updateFile($idUser,$nameOfFile, $data, $dateAndTime) {
        $cluster   = Cassandra::cluster()->build();
        $keyspace  = 'mycloudstore2019';
        $session   = $cluster->connect($keyspace); 
        $queryString="UPDATE mycloudstore2019.files SET content=asciiAsBlob('$data'), date='$dateAndTime' WHERE user ='$idUser' AND nameoffile='$nameOfFile'";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);
        
            
    }

    public function deleteFile( $idUser,$idFile) {

        $fileSize=0;
        $freeSpace=0;

        $cluster   = Cassandra::cluster()->build();
        $keyspace  = 'mycloudstore2019';
        $session   = $cluster->connect($keyspace); 
        $queryString="SELECT nameoffile, blobAsascii(content) as content, blobAsascii(crc) as crc, date, user from mycloudstore2019.files WHERE nameoffile='$idFile' AND user='$idUser'";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);
        $fileName="";
        foreach($result as $row)
            {
                $file=new File($row['nameoffile'],$row['nameoffile'],null,null,$row['date'],
                $row['user']);
                $fileName=$row["nameoffile"];
                $data=strval($row["content"]);
                $fileSize=strlen($data);
                
            }

        $queryStringSecond="SELECT * from mycloudstore2019.user WHERE email='$idUser'";
        $statementSecond = new Cassandra\SimpleStatement($queryStringSecond);
        $resultSecond    = $session->execute($statementSecond);
        foreach($resultSecond as $row)        		
				$freeSpace=$row['freespace'];

       
        $freeSpace+=$fileSize;
       
        $this->updateFreeSpace($idUser, $freeSpace);
        
        $queryStringThird="DELETE FROM mycloudstore2019.files WHERE nameoffile='$idFile' AND user='$idUser'";
        $statementThird = new Cassandra\SimpleStatement($queryStringThird);
        $resultThird   = $session->execute($statementThird);
        
        $date=date("Y/m/d");
        $time=date("h:i:sa");
        $dateAndTime=$date." ".$time;
        $queryString="INSERT INTO mycloudstore2019.useractivity( nameoffile, user, date, state)"
        . " VALUES "
        . "('$fileName','$idUser','$dateAndTime','Deleted')"; 
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);

        $queryString="DELETE FROM mycloudstore2019.filesbyname WHERE nameoffile='$file->nameOfFile' AND user='$file->user'";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);

        $fileExtension=strrchr($file->nameOfFile,'.');
        $queryString="DELETE FROM mycloudstore2019.filesbyext WHERE nameoffile='$file->nameOfFile' AND user='$file->user' AND extension='$fileExtension'";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);

        $queryString="DELETE FROM mycloudstore2019.filesbysize WHERE nameoffile='$file->nameOfFile' AND user='$file->user' AND size=$fileSize";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);

        $queryString="DELETE FROM mycloudstore2019.filesbydate WHERE  user='$file->user' AND date='$file->date'";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);
       
       
    }
    public function getFilesByName($idUser,$nameOfFile)
    {
        $cluster   = Cassandra::cluster()->build();
        $keyspace  = 'mycloudstore2019';
        $session   = $cluster->connect($keyspace); 
        $queryString="SELECT * from mycloudstore2019.filesbyname WHERE nameoffile ='$nameOfFile' AND user='$idUser'";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);
        $files=array();
        foreach($result as $row)
            {
                $file=new File($row['nameoffile'],$row['nameoffile'],null,null,$row['date'],
                $row['user']);
                $file->size=$row['size'];
                $file->nameWithoutExt=$row['nameoffile'];
                array_push($files, $file);
                
            }
        return $files;
    }
    public function getFilesBySize($idUser,$relation,$value)
    {
        $cluster   = Cassandra::cluster()->build();
        $keyspace  = 'mycloudstore2019';
        $session   = $cluster->connect($keyspace); 
        $queryString="SELECT * from mycloudstore2019.filesbysize";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);
        $files=array();
        foreach($result as $row)
            {
                $file=new File($row['nameoffile'],$row['nameoffile'],null,null,$row['date'],
                $row['user']);
                $file->size=$row['size'];
                $file->nameWithoutExt=$row['nameoffile'];
                if($file->user==$idUser)
                {
                    if($relation=="greater")
                    {
                        if(($file->size/1024) > intval($value))
                         array_push($files, $file);
                    }
                    else if($relation=="less")
                    {
                        if(($file->size/1024) < intval($value))
                         array_push($files, $file);
                    }
                    else
                    {
                        if(($file->size/1024)==intval($value))
                        array_push($files, $file);

                    }

                } 
                
            }
        return $files;

    }
    public function getFilesByExt($idUser,$extension)
    {
        $cluster   = Cassandra::cluster()->build();
        $keyspace  = 'mycloudstore2019';
        $session   = $cluster->connect($keyspace); 
        $fileName="";
        $queryString="SELECT * from mycloudstore2019.filesbyext WHERE user='$idUser' AND extension='$extension' AND nameoffile > '$fileName'";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);
        $files=array();
        foreach($result as $row)
            {
                $file=new File($row['nameoffile'],$row['nameoffile'],null,null,$row['date'],
                $row['user']);
                $file->size=$row['size'];
                $file->nameWithoutExt=$row['nameoffile'];
                array_push($files,$file);
            }
        return $files;

    }
    public function getFilesByDate($idUser,$dateModified)
    {
        
        $cluster   = Cassandra::cluster()->build();
        $keyspace  = 'mycloudstore2019';
        $session   = $cluster->connect($keyspace); 
        $dateFrom = $dateModified.' 00:00:01am';
        $dateTo = $dateModified.' 23:59:59pm';
        
        $queryString="SELECT * from mycloudstore2019.filesbydate WHERE user = '$idUser' and date > '$dateFrom' and date < '$dateTo'";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);
      
        $files=array();
        foreach($result as $row)
            {
                $file=new File($row['nameoffile'],$row['nameoffile'],null,null,$row['date'],
                $row['user']);
                $file->size=$row['size'];
                $file->nameWithoutExt=$row['nameoffile'];
                array_push($files,$file);
            }
        return $files;
    }
    public function addDownloadActivity($idUser,$fileName,$date)
    {
        $cluster   = Cassandra::cluster()->build();
        $keyspace  = 'mycloudstore2019';
        $session   = $cluster->connect($keyspace); 
        $queryString="INSERT INTO mycloudstore2019.useractivity( nameoffile, user, date, state)"
        . " VALUES "
        . "('$fileName','$idUser','$date','Downloaded')"; 
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);

    }
    public function getHistoryOfUser($idUser)
    {
        $cluster   = Cassandra::cluster()->build();
        $keyspace  = 'mycloudstore2019';
        $session   = $cluster->connect($keyspace); 

        
        $queryString="SELECT * from mycloudstore2019.useractivity WHERE user = '$idUser'";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);
      
        $files=array();
        foreach($result as $row)
            {
                $file=new File($row['nameoffile'],$row['nameoffile'],null,null,$row['date'],
                $row['user']);
                $file->state=$row['state'];
                array_push($files,$file);
            }
        return $files;

    }
    public function deleteHistoryOfUser($idUser)
    {
        $cluster   = Cassandra::cluster()->build();
        $keyspace  = 'mycloudstore2019';
        $session   = $cluster->connect($keyspace); 

        
        $queryString="DELETE from mycloudstore2019.useractivity WHERE user = '$idUser'";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);
    }
    public function addLogIn($idUser)
    {
        $cluster   = Cassandra::cluster()->build();
        $keyspace  = 'mycloudstore2019';
        $session   = $cluster->connect($keyspace); 
        $date=date("Y/m/d");
        $time=date("h:i:sa");
        $dateAndTime=$date." ".$time;
        $queryString="INSERT INTO mycloudstore2019.login ( user, date)"
        . " VALUES "
        . "('$idUser','$dateAndTime')"; 
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);
        $this->updateLogIn($idUser,$dateAndTime);
    }
    public function addLogOut($idUser)
    {
        $cluster   = Cassandra::cluster()->build();
        $keyspace  = 'mycloudstore2019';
        $session   = $cluster->connect($keyspace); 
        $date=date("Y/m/d");
        $time=date("h:i:sa");
        $dateAndTime=$date." ".$time;
        $queryString="INSERT INTO mycloudstore2019.logout ( user, date)"
        . " VALUES "
        . "('$idUser','$dateAndTime')"; 
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);
        $this->updateLogOut($idUser,$dateAndTime);
        

    }
    public function updateLogIn($idUser,$date)
    {
        $cluster   = Cassandra::cluster()->build();
        $keyspace  = 'mycloudstore2019';
        $session   = $cluster->connect($keyspace); 
        $queryString="UPDATE mycloudstore2019.activityofuser SET login = '$date' WHERE user = '$idUser'";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);

    }
    public function updateLogOut($idUser,$date)
    {
        $cluster   = Cassandra::cluster()->build();
        $keyspace  = 'mycloudstore2019';
        $session   = $cluster->connect($keyspace); 
        $queryString="UPDATE mycloudstore2019.activityofuser SET logout = '$date' WHERE user = '$idUser'";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);

    }
    public function updateDownload($idUser,$date)
    {
        $cluster   = Cassandra::cluster()->build();
        $keyspace  = 'mycloudstore2019';
        $session   = $cluster->connect($keyspace); 
        $queryString="UPDATE mycloudstore2019.activityofuser SET download = '$date' WHERE user = '$idUser'";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);
       

    }
    public function updateUpload($idUser,$date)
    {
        $cluster   = Cassandra::cluster()->build();
        $keyspace  = 'mycloudstore2019';
        $session   = $cluster->connect($keyspace); 
        $queryString="UPDATE mycloudstore2019.activityofuser SET upload = '$date' WHERE user = '$idUser'";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);
       

    }
    public function updateDelete($idUser,$date)
    {
        $cluster   = Cassandra::cluster()->build();
        $keyspace  = 'mycloudstore2019';
        $session   = $cluster->connect($keyspace); 
        $queryString="UPDATE mycloudstore2019.activityofuser SET deletefile = '$date' WHERE user = '$idUser'";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);
        

    }
    public function getActivityOfUser($idUser)
    {
        $cluster   = Cassandra::cluster()->build();
        $keyspace  = 'mycloudstore2019';
        $session   = $cluster->connect($keyspace); 
        $queryString="SELECT * FROM mycloudstore2019.activityofuser WHERE user = '$idUser'";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);
        $activity=null;
        foreach($result as $row)
        {
            $activity=new UserActivity($row['user'],$row['login'],$row['logout'],
            $row['upload'],$row['download'],$row['deletefile']);
        }
        return $activity;

    }
    public function getAllLogIn($idUser)
    {
        $cluster   = Cassandra::cluster()->build();
        $keyspace  = 'mycloudstore2019';
        $session   = $cluster->connect($keyspace); 
        $queryString="SELECT * FROM mycloudstore2019.login WHERE user = '$idUser'";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);
        $res=array();
        foreach($result as $row)
        {
           array_push($res,$row['date']);
        }
        return $res;

    }
    public function getAllLogOut($idUser)
    {
        $cluster   = Cassandra::cluster()->build();
        $keyspace  = 'mycloudstore2019';
        $session   = $cluster->connect($keyspace); 
        $queryString="SELECT * FROM mycloudstore2019.logout WHERE user = '$idUser'";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);
        $res=array();
        foreach($result as $row)
        {
           array_push($res,$row['date']);
        }
        return $res;
    }
    public function addUpload($idUser,$date,$nameOfFile,$comment)
    {
        $cluster   = Cassandra::cluster()->build();
        $keyspace  = 'mycloudstore2019';
        $session   = $cluster->connect($keyspace); 
        $queryString="INSERT INTO mycloudstore2019.uploaded (user,date,nameoffile,comment) VALUES ('$idUser','$date','$nameOfFile','$comment')";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);


    }
    public function addDownload($idUser,$date,$nameOfFile,$comment)
    {
        $cluster   = Cassandra::cluster()->build();
        $keyspace  = 'mycloudstore2019';
        $session   = $cluster->connect($keyspace); 
        $queryString="INSERT INTO mycloudstore2019.downloaded (user,date,nameoffile,comment) VALUES ('$idUser','$date','$nameOfFile','$comment')";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);


    }
    public function addDelete($idUser,$date,$nameOfFile,$comment)
    {
        $cluster   = Cassandra::cluster()->build();
        $keyspace  = 'mycloudstore2019';
        $session   = $cluster->connect($keyspace); 
        $queryString="INSERT INTO mycloudstore2019.deleted (user,date,nameoffile,comment) VALUES ('$idUser','$date','$nameOfFile','$comment')";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);


    }
    public function getDataForPie($idUser)
    {
        $cluster   = Cassandra::cluster()->build();
        $keyspace  = 'mycloudstore2019';
        $session   = $cluster->connect($keyspace); 
        $queryString="SELECT * FROM mycloudstore2019.deleted WHERE user='$idUser'";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);
        $deleted= $result ->count();
        $queryString="SELECT * FROM mycloudstore2019.downloaded WHERE user='$idUser'";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);
        $downloaded= $result ->count();
        $queryString="SELECT * FROM mycloudstore2019.uploaded WHERE user='$idUser'";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);
        $uploaded= $result ->count();

        $statistic=new StatisticObject($idUser,$downloaded,$uploaded,$deleted);
        return $statistic;

    }
    public function getAllUploaded($idUser)
    {
        $cluster   = Cassandra::cluster()->build();
        $keyspace  = 'mycloudstore2019';
        $session   = $cluster->connect($keyspace); 
        $queryString="SELECT * FROM mycloudstore2019.uploaded WHERE user='$idUser'";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);
        $objects=array();
        foreach($result as $row)
        {
            array_push($objects,new InfoObject($row['user'],$row['nameoffile'],$row['date'],$row['comment']));
        }
        return $objects;

    }
    function getAllDownloaded($idUser)
    {
        $cluster   = Cassandra::cluster()->build();
        $keyspace  = 'mycloudstore2019';
        $session   = $cluster->connect($keyspace); 
        $queryString="SELECT * FROM mycloudstore2019.downloaded WHERE user='$idUser'";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);
        $objects=array();
        foreach($result as $row)
        {
            array_push($objects,new InfoObject($row['user'],$row['nameoffile'],$row['date'],$row['comment']));
        }
        return $objects;

    }
    function getAllDeleted($idUser)
    {
        $cluster   = Cassandra::cluster()->build();
        $keyspace  = 'mycloudstore2019';
        $session   = $cluster->connect($keyspace); 
        $queryString="SELECT * FROM mycloudstore2019.deleted WHERE user='$idUser'";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);
        $objects=array();
        foreach($result as $row)
        {
            array_push($objects,new InfoObject($row['user'],$row['nameoffile'],$row['date'],$row['comment']));
        }
        return $objects;

    }
    public function addComment($comment)
    {
        $cluster   = Cassandra::cluster()->build();
        $keyspace  = 'mycloudstore2019';
        $session   = $cluster->connect($keyspace); 
        $queryString="INSERT INTO mycloudstore2019.comments (firstname,lastname,user,comment,date) VALUES ('$comment->firstName','$comment->lastName','$comment->email','$comment->content','$comment->date')";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);

    }
    public function getAllComments()
    {
        $cluster   = Cassandra::cluster()->build();
        $keyspace  = 'mycloudstore2019';
        $session   = $cluster->connect($keyspace); 
        $queryString="SELECT * FROM mycloudstore2019.comments";
        $statement = new Cassandra\SimpleStatement($queryString);
        $result    = $session->execute($statement);
        $objects=array();
        foreach($result as $row)
        {
            array_push($objects,new Comment($row['firstname'],$row['lastname'],$row['user'],$row['comment'],$row['date']));
        }
        return $objects;

    }
    

}
?>
