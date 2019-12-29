<?php
include_once 'lib.php';

$chunkSize=1048576;//1MB ----> 1048576B
$base=new UserService();

$data="";
if(isset($_POST["nameRequest"]))
{
    $file=$base->getFile($_POST["idUser"], $_POST["idFile"]);
    echo json_encode($file->nameOfFile);
}
if(isset($_POST["crcRequest"]))
{
    $file=$base->getFile($_POST["idUser"], $_POST["idFile"]);
    echo json_encode($file->crc);
}
if(isset($_POST["getFileChunkByChunk"]))
{
    $file=$base->getFile($_POST["idUser"], $_POST["idFile"]);
    $date=date("Y/m/d");
    $time=date("h:i:sa");
    $dateAndTime=$date." ".$time;
    $base->addDownloadActivity($_POST["idUser"],$file->nameOfFile,$dateAndTime);
    $base->updateDownload($_POST["idUser"],$dateAndTime);
    $file=$base->getFile($_POST["idUser"], $_POST["idFile"]);
    $base->addDownload($_POST["idUser"],$dateAndTime,$file->nameOfFile,$_POST["comment"]);
    if($_POST["start"]<$_POST["end"])
    {
         
        
        $data.=substr($file->content, $_POST["start"],$chunkSize);
        echo json_encode($data);
        
    }
    else
         echo json_encode($data);
}
if(isset($_POST["requestDownload"]))
{
     $sizes = array();
     array_push($sizes,$chunkSize);
     $file=$base->getFile($_POST["idUser"], $_POST["idFile"]);
     array_push($sizes,strlen(strval($file->content)));
    
     echo json_encode($sizes);
}
if(isset($_POST["getFile"]))
{
    $file=$base->getFile($_POST["idUser"], $_POST["idFile"]);
    echo json_encode($file);
}
if(isset($_POST["request"]))
{
   //klijent zahteva od nas ChunkSize
    echo json_encode($chunkSize);

} 
else if(isset($_POST["fileExist"]))
{
    $file=$base->getFileIfExist($_POST["idUser"], $_POST["fileName"]);
    echo json_encode($file);
}
else if(isset($_POST["DeleteFile"]))
{

    $date=date("Y/m/d");
    $time=date("h:i:sa");
    $dateAndTime=$date." ".$time;
    $file=$base->getFile($_POST["idUser"], $_POST["idFile"]);
    $base->addDelete($_POST["idUser"],$dateAndTime,$file->nameOfFile,$_POST["comment"]);
    $base->deleteFile($_POST["idUser"],$_POST["idFile"]);
    $base->updateDelete($_POST["idUser"],$dateAndTime);
    
}
else if( isset($_POST["uploadChunkByChunk"]))
{
   
    
    if($_POST["end"]<$_POST["size"])
    {
         $date=date("Y/m/d");
         $time=date("h:i:sa");
         $dateAndTime=$date." ".$time;
         $data.=$_POST["data"];
         $base->addUpload($_POST["idUser"],$dateAndTime,$_POST["fileName"],$_POST["comment"]);
         $base->updateUpload($_POST["idUser"],$dateAndTime);
         echo json_encode("succ");
        
    }
    else
    {
        $data.=$_POST["data"];
        $date=date("Y/m/d");
        $time=date("h:i:sa");
        $dateAndTime=$date." ".$time;
        $freeSpace=($base->getFreeSpace($_POST["idUser"]));//freeSpace je u bajtovima
        $freeSpace-=strlen($_POST["data"]);
        $base->updateFreeSpace($_POST["idUser"], $freeSpace);
        $file=new File($_POST["fileName"],$_POST["fileName"],$data,$_POST["crc"],$dateAndTime,
                $_POST["idUser"]);
        $base->addFile($file);
        $base->addUpload($_POST["idUser"],$dateAndTime,$_POST["fileName"],$_POST["comment"]);
        $base->updateUpload($_POST["idUser"],$dateAndTime);
        echo json_encode("succ");
    }
   
    
}

else if(isset($_POST["download"]))
{
    $file=$base->getFile($_POST["idUser"], $_POST["idFile"]);
    echo json_encode($file);
}
else if(isset ($_POST["files"]))
{
    $files=null;
    $files=$base->getAllFilesByUser($_POST["idUser"]);
    echo json_encode($files);
}
else if(isset($_POST["FreeSpaceRequest"])&& isset($_POST["idUser"]))
{
    $freeSpace=null;
    $freeSpace=$base->getFreeSpace($_POST["idUser"]); //freeSpace u bajtovima
    echo json_encode($freeSpace);
}
else if(isset($_POST["filterName"]))
{
    $result=null;
    $result=$base->getFilesByName($_POST["idUser"],$_POST["filterName"]);
    echo json_encode($result);

}
else if(isset($_POST["relation"]))
{
    $result=null;
    $result=$base->getFilesBySize($_POST["idUser"],$_POST["relation"],$_POST["value"]);
    echo json_encode($result);
}
else if(isset($_POST["extension"]))
{
    $result=null;
    $result=$base->getFilesByExt($_POST["idUser"],$_POST["extension"]);
    echo json_encode($result);
}
else if(isset($_POST["dateModified"]))
{
    $result=null;
    $result=$base->getFilesByDate($_POST["idUser"],$_POST["dateModified"]);
    echo json_encode($result);
}
else if(isset($_POST["history"]))
{
    $result=null;
    $result=$base->getHistoryOfUser($_POST["idUser"]);
    echo json_encode($result);
}
else if(isset($_POST["clean"]))
{
    
    $result=$base->deleteHistoryOfUser($_POST["idUser"]);
    
}
else if(isset($_POST["activity"]))
{
    $result=null;
    $result=$base->getActivityOfUser($_POST["idUser"]);
    echo json_encode($result);
}
else if(isset($_POST["allLogIn"]))
{
    $result=null;
    $result=$base->getAllLogIn($_POST["idUser"]);
    echo json_encode($result);

}
else if(isset($_POST["allLogOut"]))
{
    $result=null;
    $result=$base->getAllLogOut($_POST["idUser"]);
    echo json_encode($result);

}
else if(isset($_POST["statistics"]))
{
    $result=null;
    $result=$base->getDataForPie($_POST["idUser"]);
    echo json_encode($result);

}
else if(isset($_POST["allDownloaded"]))
{
    $result=null;
    $result=$base->getAllDownloaded($_POST["idUser"]);
    echo json_encode($result);

}
else if(isset($_POST["allUploaded"]))
{
    $result=null;
    $result=$base->getAllUploaded($_POST["idUser"]);
    echo json_encode($result);

}
else if(isset($_POST["allDeleted"]))
{
    $result=null;
    $result=$base->getAllDeleted($_POST["idUser"]);
    echo json_encode($result);

}