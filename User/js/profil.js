
const aboutUser=document.getElementById("user");
const register=document.getElementById("confirm");
const logOut=document.getElementById("logOut");
const fileUpload=document.getElementById("file-input");
const fileDownload=document.getElementById("file-download");
const textArea=document.getElementById("file");
const algoritam=document.getElementById("algoritam");
const freeSpaceText=document.getElementById("heder");
const confirm=document.getElementById("confirm");
const editFile=document.getElementById("editFile");
const deleteFile=document.getElementById("delete");
const btnDelete=document.getElementById("confirmDelete");
const btnSelect=document.getElementById("selectFile");
const keyValue=document.getElementById("myKey");
//const btnDownload=document.getElementById("download");

confirm.onclick = (ev) =>
{
               $('#succ').modal('hide');
               location.reload();
}
btnSelect.onclick = (ev) =>
{
     $('#selectModal').modal('hide');  
            
}
editFile.onclick = (ev) =>
{
         $('#editModal').modal('hide');      
}
//------------------------------------------------- DELETE FILE-------------------------------------------------------------------
deleteFile.onclick = (ev) =>
{
            if(document.querySelector("input[name='files']:checked")==null)
            {
                    $('#selectModal').modal('show'); 
            }
            else
            {
                $('#deleteModal').modal('show');
            }      
}
btnDelete.onclick = (ev) =>
{
         $('#deleteModal').modal('hide');
         const formData = new FormData();
         formData.append("DeleteFile","true");
         formData.append("idUser",sessionStorage["id"]);
         formData.append("idFile",document.querySelector("input[name='files']:checked").value);
         formData.append("comment",document.getElementById("myComment").value);
         const fetchData =
                {
                    method:"POST",
                    body: formData
                }
             fetch("../php/server.php",fetchData)
                .then(response =>
               {
                   if(!response.ok)
                     throw new Error(response.statusText);
                   
                }).then(() => { osveziStranicu()
                  })

                .catch(error => console.log(error));
         
 
}
function osveziStranicu()
{
     location.reload(); 
}

//------------------------------------------------------------------------------------------------------------------------
var keyForDecription;
setFreeSpaceText();
var fileSize;
//prilikom ucitavanja stranice prikazuje koliko ima slobodnog prostora
function setFreeSpaceText()
{
     const formData = new FormData();
     formData.append("FreeSpaceRequest","true");
     formData.append("idUser",sessionStorage["id"]);
        const fetchData =
                {
                    method:"POST",
                    body: formData
                }
             fetch("../php/server.php",fetchData)
                .then(response =>
               {
                   if(!response.ok)
                     throw new Error(response.statusText);
                   else
                      return response.json();

                }).then((res) => {
                
                  var tmp=parseFloat((res/(1024*1024*1024).toFixed(3))).toFixed(5);
                  freeSpaceText.innerHTML="MyDocuments<br>FreeSpace: "+tmp.toString()+"GB";
                  })

                .catch(error => console.log(error));
    
}
var fileName;
var fileNameForDownload;
var uploadDocument;
//btnDownload.onclick = (ev) => preuzmiFajl();

logOut.onclick=(ev)=>leavePage();

//popunja podatke o korisniku prilikom logovanja
getDataAboutUser();

//----------------------------------------------------- UPLOAD FILE---------------------------------------------------
//za konverziju niza bajtova u string
function bin2String(array) {
  var result = "";
  for (var i = 0; i < array.length; i++) {
    result += String.fromCharCode(parseInt(array[i], 2));
  }
  return result;
}

//citanje fajla kao bajtova
function readAsBytes(file, done, doneContext){
    
    
  var fileReader = new FileReader;
  var c = doneContext || this;
  fileReader.onload = function(){
   done.call(c, fileReader.result);
  }
  fileSize=file.size;
  fileReader.readAsArrayBuffer(file);
}

function readAsDataURL(file, done, doneContext){
    
    
  var fileReader = new FileReader;
  var c = doneContext || this;
  fileReader.onload = function(){
   done.call(c, fileReader.result);
  }
  
  fileReader.readAsDataURL(file);
}
//citanje fajla kao txt
function readAsText(file, done, doneContext){
    
    
  var fileReader = new FileReader;
  var c = doneContext || this;
  fileReader.onload = function(){
   done.call(c, fileReader.result);
  }
  fileSize=file.size;
  fileReader.readAsText(file);
}

//logika za upload
fileUpload.onchange = function(){

    
   //citamo kao bajtove
   /*readAsBytes(this.files[0], function(res){
   uploadDocument=res;
   console.log(uploadDocument);
   
  
  });*/
  console.log(this.files[0].type);
    if(this.files[0].type=="image/png" || this.files[0].type=="image/jpeg" || this.files[0].type=="image/jpg" || this.files[0].type=="image/bmp")
    {
        readAsDataURL(this.files[0],function(res)
        {
                uploadDocument=res;
                fileSize=res.toString().length;
                var nameOfFile=document.getElementById('file-input').value.substring(12,document.getElementById('file-input').value.length);
                fileName=nameOfFile;
                //provera da li postoji fajl sa tim imenom
                const formData = new FormData();
                formData.append("fileExist","true");
                formData.append("idUser",sessionStorage["id"]);
                formData.append("fileName",nameOfFile);
                const fetchData =
                {
                    method:"POST",
                    body: formData
                }
                 fetch("../php/server.php",fetchData)
                .then(response =>
                {
                   if(!response.ok)
                     throw new Error(response.statusText);
                   else
                      return response.json();

                    }).then((exist) => {daLiVecPostoji(exist,res.toString())})

                .catch(error => console.log(error));
  
      
             });
    }
    else if(this.files[0].type=="application/pdf")
    {
        
        readAsDataURL(this.files[0],function(res)
        {
                uploadDocument=res;
                fileSize=res.toString().length;
                var nameOfFile=document.getElementById('file-input').value.substring(12,document.getElementById('file-input').value.length);
                fileName=nameOfFile;
                
                //provera da li postoji fajl sa tim imenom
                const formData = new FormData();
                formData.append("fileExist","true");
                formData.append("idUser",sessionStorage["id"]);
                formData.append("fileName",nameOfFile);
                const fetchData =
                {
                    method:"POST",
                    body: formData
                }
                 fetch("../php/server.php",fetchData)
                .then(response =>
                {
                   if(!response.ok)
                     throw new Error(response.statusText);
                   else
                      return response.json();

                    }).then((exist) => {daLiVecPostoji(exist,res.toString())})

                .catch(error => console.log(error));
  
      
             });
        
        
    }
else
{
    readAsText(this.files[0], function(res){
       
     var nameOfFile=document.getElementById('file-input').value.substring(12,document.getElementById('file-input').value.length);
     fileName=nameOfFile;
     //provera da li postoji fajl sa tim imenom
     const formData = new FormData();
     formData.append("fileExist","true");
     formData.append("idUser",sessionStorage["id"]);
     formData.append("fileName",nameOfFile);
        const fetchData =
                {
                    method:"POST",
                    body: formData
                }
             fetch("../php/server.php",fetchData)
                .then(response =>
               {
                   if(!response.ok)
                     throw new Error(response.statusText);
                   else
                      return response.json();

                }).then((exist) => {daLiVecPostoji(exist,res)})

                .catch(error => console.log(error));
   
  });
}
}
function daLiVecPostoji(exist,res)
{
    if(exist==null)
    {
            

            var uploadDocumentToString=res;
            textArea.innerHTML=res.toString();//ovde prikazujemo korisniku fajl u editoru
            document.getElementById("downloadPic").src=res;
            var crc=hash(uploadDocumentToString);//odredjujemo hash funkciju
            var nameOfFile=document.getElementById('file-input').value.substring(12,document.getElementById('file-input').value.length);
            if(algoritam.value=="1")
            {
                $('#uploadModal').modal('show');
                 var key=shuffle();
                 var fileName=nameOfFile+sessionStorage["id"].toString()+".txt";
                 var data="1 "+key;
                 WriteToTxt(fileName,data);
                 var coded=enSubstitute(uploadDocumentToString.toString(),key);
                 freeSpace(crc,coded,nameOfFile);
            }
            else if(algoritam.value=="2")
            {
                var keyRes=[];
                keyRes=keyValue.value.split(" ");
                let ind=true;
                //provera da li je unet niz od 10 vrednosti
                if(keyRes.length==10)
                {
                    for(var i=0;i<10;i++)
                        if(isNaN(keyRes[i]))
                            ind=false;
                    
                        
                    if(ind)
                    {
                        $('#uploadModal').modal('show');
                    
                        var privateKey = {
                        w: [],
                        wSum: 0,
                        q: 0,
                        r: 0
                        };
                        for(var i=0;i<8;i++)
                            privateKey.w[i]=keyRes[i];
                        privateKey.q=keyRes[8];
                        privateKey.r=keyRes[9];
                        var keys=[];
                        keys=generateKeyPair(privateKey);
                        var fileName=nameOfFile+sessionStorage["id"].toString()+".txt";
                        var privateKeyStr=keys[0].w.toString()+" "+keys[0].q.toString()+" "+keys[0].r.toString();
                        var data="2 "+privateKeyStr+" "+keys[1].w.toString();
                        WriteToTxt(fileName,data);

                        //{w: [295, 592, 301, 14, 28, 353, 120, 236]}
                        var coded=encrypt(uploadDocumentToString.toString(),keys[1]);
                        freeSpace(crc,coded,nameOfFile);
                    }
                    else
                    {
                        $('#errorModalType').modal('show');
                    
                    }
                }
                else
                {
                    
                    $('#errorModal').modal('show');
                    

                }
            }
            else if(algoritam.value=="3")
            {
                
                var password;
                //provera da li ima bar 16 karaktera
                if(keyValue.value.length>=16)
                {
                    $('#uploadModal').modal('show');
                    password=keyValue.value;
                    var fileName=nameOfFile+sessionStorage["id"].toString()+".txt";
                    var data="3 "+password;
                    WriteToTxt(fileName,data);
                    var coded=encryptXXTEA(uploadDocumentToString.toString(),password);
                    freeSpace(crc,coded,nameOfFile);
                    
                }
                else
                {
                    $('#errorModal').modal('show');
                    
                      
                }
            }
            else if(algoritam.value=="4")
            {
                var password;
                //provera da li ima bar neki karaktera
                if(keyValue.value.length!=0)
                {
                    $('#uploadModal').modal('show');
                    password=keyValue.value;
                    var fileName=nameOfFile+sessionStorage["id"].toString()+".txt";
                    var data="4 "+password;
                    WriteToTxt(fileName,data);
                    var coded=crypto.Blowfish.encrypt(uploadDocumentToString.toString(),password,crypto.cipherModes.PCBC);
                    freeSpace(crc,coded,nameOfFile);
                    
                }
                else
                {
                    $('#errorModal').modal('show');
                    
                   
                }
                
            }
    }
    else
    {
         $('#editModal').modal('show');
    }
}

const btnDownload=document.getElementById("download");
btnDownload.onclick = (ev) => 
{
    if(document.querySelector("input[name='files']:checked")==null)
    {
            $('#selectModal').modal('show'); 
    }
    else
    {
        document.getElementById('file-download').click();
    }
            
}
//za pamcenje algoritma i key na klijent strani
function WriteToTxt(fileName, file)
{
   blob = new Blob([file], {type: "text/plain;charset=utf-8"});
   saveAs(blob, fileName);

}
function SaveFile(file)
{
    
    //Ispitivanje ekstenzije biramo nacin cuvanja fajlova
    
    if( fileNameForDownload.lastIndexOf(".jpeg")==-1 && fileNameForDownload.lastIndexOf(".jpg")==-1 
            && fileNameForDownload.lastIndexOf(".png")==-1 && fileNameForDownload.lastIndexOf(".bmp")==-1
            && fileNameForDownload.lastIndexOf(".pdf")==-1 )
    {
        var name = fileNameForDownload;
        blob = new Blob([file], {type: "text/plain;charset=utf-8"});
        saveAs(blob, name);
    }
    else if(fileNameForDownload.lastIndexOf(".pdf")!=-1)
    {

           var name = fileNameForDownload;
            saveAs(file, name);       
    }
    else
    {
          
            var name = fileNameForDownload;
            saveAs(file, name);
    }



}

//proveravamo da li ima slobodnog prostora na drive-u
function freeSpace(crc,coded,nameOfFile)
{
     const formData = new FormData();
     formData.append("FreeSpaceRequest","true");
     formData.append("idUser",sessionStorage["id"]);
        const fetchData =
                {
                    method:"POST",
                    body: formData
                }
             fetch("../php/server.php",fetchData)
                .then(response =>
               {
                   if(!response.ok)
                     throw new Error(response.statusText);
                   else
                      return response.json();

                }).then((space) => {zakaciNaServer(space,crc,coded,nameOfFile,file)})

                .catch(error => console.log(error));
    
}
function zakaciNaServer(res,crc,data,nameOfFile)
{
   
    if(res>=data.length)
    {
        //sada zahtevamo da vidimo koliki je chunk size
        var chunkSize;
        const formData = new FormData();
        formData.append("request","true");
        const fetchData =
                {
                    method:"POST",
                    body: formData
                }
             fetch("../php/server.php",fetchData)
                .then(response =>
               {
                   if(!response.ok)
                     throw new Error(response.statusText);
                   else
                      return response.json();

                }).then((res) => nastaviSaSlanjem(res,crc,data,nameOfFile,file))

                .catch(error => console.log(error));
    }
    else
    {
        alert("We're sorry, but you don't have enough space!");
    }
}
function nastaviSaSlanjem(chunk,crc,data,nameOfFile)
{
  
  var size = fileSize;
  var sliceSize = chunk;
  var start = 0;

  setTimeout(loop, 1);

  function loop() {
    var end = start + sliceSize;
    
    if (size - end < 0) {
      end = size;
      setTimeout(function(){ { $('#uploadModal').modal('hide');
          $('#succ').modal('show');} }, 4000);
      
       
    }
    
    var s = slice(file, start, end);

    send(crc,data,nameOfFile,end,size);

    if (end < size) {
      start += sliceSize;
      setTimeout(loop, 1);
    }
  } 
}
function slice(file, start, end) {
  var slice = file.mozSlice ? file.mozSlice :
              file.webkitSlice ? file.webkitSlice :
              file.slice ? file.slice : noop;
  
  return slice.bind(file)(start, end);
}

function noop() {
  
}
function send(crc,data,nameOfFile,end,size)
{
         const formData = new FormData();
         formData.append("uploadChunkByChunk","true");
         formData.append("idUser",sessionStorage["id"]);
         formData.append("fileName",nameOfFile);
         formData.append("crc",crc);
         formData.append("comment",document.getElementById("myComment").value);
         var zaSlanje=btoa(data);
         console.log(zaSlanje);
         formData.append("data",zaSlanje);
         formData.append("end",end);
         formData.append("size",size);
         
         const fetchData =
            {
                method:"POST",
                body: formData
            }
         fetch("../php/server.php",fetchData)
            .then(response =>
           {
               if(!response.ok)
                 throw new Error(response.statusText);
               else
                  return response.json();

            }).then((res) => {console.log(res)})
    
            .catch(error => console.log(error));

}
//--------------------------------------------------------DOWNLOAD FILE----------------------------------------------------
//logika za download
fileDownload.onchange = function(){
    
         contentOfFile="";
         readAsText(this.files[0], function(res){
         //sada da odredimo hash funkciju
         var keyForDecription=[];
         fileName=document.getElementById('file-download').value.substring(12,document.getElementById('file-download').value.length-6);
         if(res[0]=="1")
         {
             //radi se o simple substitution
             var j=0;
             for(var i=2;i<res.length;i++)
             {
                 if(res[i]!=",")
                   keyForDecription[j++]=res[i];  
             }
             //sada pribavljamo fajl koji smo seelektovali iz baze
         }
         else if(res[0]=="2")
         {
             var params=res.split(" ");
             var privateKey = {
                w: [],
                wSum: 0,
                q: 0,
                r: 0
              };
              privateKey.w=params[1].split(",");
              for(var i=0;i<8;i++)
                  privateKey.w[i]=parseInt(privateKey.w[i],10);
              privateKey.q=parseInt(params[2],10);
              privateKey.r=parseInt(params[3],10);
            
              keyForDecription=privateKey;
                   
         }
         else if(res[0]=="3")
         {
              var params=res.split(" ");
              keyForDecription=params[1];
         }
         else if(res[0]=="4")
         {
              var params=res.split(" ");
              keyForDecription=params[1];
         }
         
         //sada zahtevamo da vidimo koliki je chunk size
        var chunkSize;
        const formData = new FormData();
        formData.append("requestDownload","true");
        formData.append("idUser",sessionStorage["id"]);
        formData.append("idFile",document.querySelector("input[name='files']:checked").value);
        const fetchData =
                {
                    method:"POST",
                    body: formData
                }
             fetch("../php/server.php",fetchData)
                .then(response =>
               {
                   if(!response.ok)
                     throw new Error(response.statusText);
                   else
                      return response.json();

                }).then((resNew) => nastaviSaSkidanjem(resNew[0],resNew[1],res[0],keyForDecription))

                .catch(error => console.log(error));

  
   
  });
             
     
    
}
function getNameOfFileForDownload(crc,algorithm,keyForDecription)
{
    const formData = new FormData();
    formData.append("nameRequest","true");
    formData.append("idUser",sessionStorage["id"]);
    formData.append("idFile",document.querySelector("input[name='files']:checked").value);
    const fetchData =
                {
                    method:"POST",
                    body: formData
                }
    fetch("../php/server.php",fetchData)
                .then(response =>
               {
                   if(!response.ok)
                     throw new Error(response.statusText);
                   else
                      return response.json();

                }).then((res) =>dekripcijaFajla(res,crc,algorithm,keyForDecription))

                .catch(error => console.log(error));
}

//ovde cemo dekriptovati fajlove
function dekripcijaFajla(res,crc,algorithm,keyForDecription)
{
    fileNameForDownload=res;
    console.log(fileNameForDownload);
    if(algorithm=="1")
    {
        var str=atob(contentOfFile);
        var decoded=deSubstitute(str,keyForDecription);
        if(crc!=hash(decoded))
        {
            $('#wrongCRC').modal('show');
        }
        else
        {
             
           textArea.innerHTML=decoded;
           document.getElementById("downloadPic").src=decoded;
          
           
           SaveFile(decoded);   
           console.log(decoded);
          
        }
            
    }
    else if(algorithm=="2")
    {
        var str=atob(contentOfFile);
        var decoded=decrypt(str,keyForDecription);
        if(crc!=hash(decoded))
        {
            $('#wrongCRC').modal('show');    
        }
        else
        {
           
           document.getElementById("downloadPic").src=decoded;
           textArea.innerHTML=decoded;
           SaveFile(decoded);   
           
        }
    }
    else if(algorithm=="3")
    {
        var str=atob(contentOfFile);
        var decoded=decryptXXTEA(str,keyForDecription);
  
        if(crc!=hash(decoded))
        {
            $('#wrongCRC').modal('show'); 
        }
        else
        {
           SaveFile(decoded);        
           textArea.innerHTML=decoded;
           document.getElementById("downloadPic").src=decoded;
           
        }
        
    }
    else if(algorithm=="4")
    {
        var str=atob(contentOfFile);
        
        var decoded=crypto.Blowfish.decrypt(str,keyForDecription,crypto.cipherModes.PCBC);
  
        if(crc!=hash(decoded))
        {
            $('#wrongCRC').modal('show');    
        }
        else
        {   
           SaveFile(decoded);    
           textArea.innerHTML=decoded;
           document.getElementById("downloadPic").src=decoded;
           
        }
        
    }
}


function nastaviSaSkidanjem(chunk,fileSize,algorithm,keyForDecription)
{
//moramo da uzmemo i velicinu fajla   
  var size = fileSize;
  var sliceSize = chunk;
  var start = 0;

  setTimeout(loop, 1);

  function loop() {
    var end = start + sliceSize;
    
    //var s = slice(file, start, end);
      if (size - end < 0) {
      end = size;    
  }

    receive(start,size,chunk,algorithm,keyForDecription);
    
    if (end < size) {
      start += sliceSize;
      setTimeout(loop, 1);
    }
  }
    
}
function nastaviSaDekripcijom(algorithm,keyForDecription)
{
      const formData = new FormData();
      formData.append("crcRequest","true");
      formData.append("idFile",document.querySelector("input[name='files']:checked").value);
      formData.append("idUser",sessionStorage["id"]);

              const fetchData =
                {
                    method:"POST",
                    body: formData
                }
              fetch("../php/server.php",fetchData)
                .then(response =>
               {
                   if(!response.ok)
                     throw new Error(response.statusText);
                   else
                      return response.json();

                }).then((crc) => {getNameOfFileForDownload(crc,algorithm,keyForDecription);} )

                .catch(error => console.log(error));  

      
     

}
var contentOfFile="";
var crc;
function receive(start,end,chunk,algorithm,keyForDecription)
{
    
    const formData = new FormData();
    formData.append("getFileChunkByChunk","true");
    formData.append("idFile",document.querySelector("input[name='files']:checked").value);
    formData.append("idUser",sessionStorage["id"]);
    formData.append("comment",document.getElementById("myComment").value);
    formData.append("start",start);
    formData.append("end",end);
              const fetchData =
                {
                    method:"POST",
                    body: formData
                }
              fetch("../php/server.php",fetchData)
                .then(response =>
               {
                   if(!response.ok)
                     throw new Error(response.statusText);
                   else
                      return response.json();

                }).then((file) => {checkEnd(start,end,file,chunk,algorithm,keyForDecription);})

                .catch(error => console.log(error));  

}
function checkEnd(start,end,file,chunk,algorithm,keyForDecription)
{
     contentOfFile+=file;
     if ((start+chunk) >= end) {
      
      nastaviSaDekripcijom(algorithm,keyForDecription);       
    }    
   
}
//prikupljanje podataka o korisniku
function getDataAboutUser()
{
    let about="<img src='https://img.icons8.com/bubbles/90/000000/cloud.png'>";
    about+="<strong>"+sessionStorage.firstName+" "+sessionStorage.lastName+"</strong><br><br>"
    +sessionStorage.email+"<hr class='sidebar-divider mt-2'>";
    aboutUser.innerHTML=about;
}
//terminiranje sesije
function leavePage()
{

       $('#logoutModal').modal('hide');
       const formData = new FormData();
       formData.append("idUser",sessionStorage["id"]);
       const fetchData =
                {
                    method:"POST",
                    body: formData
                }
       fetch("../php/logOut.php",fetchData)
            .then(response =>
            {
                if(!response.ok)
                    throw new Error(response.statusText);
                else
                    return response.json();

            })
            .then((res)=>redirection(res))
            .catch(error => console.log(error));
    
    
}
//praznjenje storage
function redirection(res)
{
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("firstName");
    sessionStorage.removeItem("lastName");
    sessionStorage.removeItem("email");
    window.open("../html/index.html","_self");
}



