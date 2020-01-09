<?php


interface IUserService {
    //put your code here
    function addUser($user);
    function getUser($username);
    function userExist($email,$password);
    function getUserById($id);
    function changeUserData($id);
    function getFileIfExist($idUser,$fileName);
    function addFile($file);
    function getFile($idUser,$idFile);
    function getAllFilesByUser($idUser);
    function getFreeSpace($idUser);
    function updateFreeSpace($idUser,$newFreeSpace);
    function updateFile($idUser,$nameOfFile,$data,$dateAndTime);
    function deleteFile($idUser,$idFile);
    function getFilesByName($idUser,$nameOfFile);
    function getFilesBySize($idUser,$relation,$value);
    function getFilesByExt($idUser,$extension);
    function getFilesByDate($idUser,$dateModified);
    function addDownloadActivity($idUser,$fileName,$date);
    function getHistoryOfUser($idUser);
    function deleteHistoryOfUser($idUser);
    function addLogIn($idUser);
    function addLogOut($idUser);
    function updateLogIn($idUser,$date);
    function updateLogOut($idUser,$date);
    function updateDownload($idUser,$date);
    function updateUpload($idUser,$date);
    function updateDelete($idUser,$date);
    function getActivityOfUser($idUser);
    function getAllLogIn($idUser);
    function getAllLogOut($idUser);
    function addUpload($idUser,$date,$nameOfFile,$comment);
    function addDownload($idUser,$date,$nameOfFile,$comment);
    function addDelete($idUser,$date,$nameOfFile,$comment);
    function getDataForPie($idUser);
    function getAllUploaded($idUser);
    function getAllDownloaded($idUser);
    function getAllDeleted($idUser);
    function addComment($comment);
    function getAllComments();
    


    
     
}
