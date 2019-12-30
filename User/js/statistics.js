const aboutUser=document.getElementById("user");
const register=document.getElementById("confirm");
const logOut=document.getElementById("logOut");
const viewDownloaded=document.getElementById("viewDownloaded");
const viewUploaded=document.getElementById("viewUploaded");
const viewDeleted=document.getElementById("viewDeleted");
const okButton=document.getElementById("okButton");
logOut.onclick=(ev)=>leavePage();
okButton.onclick=(ev)=>{
    $('#viewModal').modal('hide');
}
//popunja podatke o korisniku prilikom logovanja
getDataAboutUser();
getDataAboutActivityOfUser();

viewDownloaded.onclick=(ev) => showModal("allDownloaded");
viewUploaded.onclick=(ev) => showModal("allUploaded");
viewDeleted.onclick=(ev) => showModal("allDeleted");

function showModal(param)
{
    const formData = new FormData();
    formData.append(param,"true");
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
              

            }).then((res) =>  makeContentOfModal(res))

            .catch(error => console.log(error));

   
}
function makeContentOfModal(res)
{
    let html="";
    res.forEach(element => {
        html+="<div class='card'>"+
        "<div class='card-header bg-primary' style='color: white;'>"+element.nameOfFile+"</div>"+
        "<div class='card-body'><h5 class='card-title'>"+element.date+"</h5>"
        +"<p class='card-text'>Comment: "+element.comment+"</p></div></div>";
       
    });
    document.getElementById("bodyOfModal").innerHTML=html;
    $('#viewModal').modal('show');
}
function refreshPage()
{
    window.location.href="history.html";
}
function getDataAboutActivityOfUser()
{
    const formData = new FormData();
    formData.append("activity","true");
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
              

            }).then((res) =>  showResult(res))

            .catch(error => console.log(error));
}
function showResult(res) 
{
    document.getElementById("lastLogIn").innerHTML="Last Login: "+res.logIn;
    if(res.logOut==null)
        document.getElementById("lastLogOut").innerHTML="Last Logout: /";
    else
        document.getElementById("lastLogOut").innerHTML="Last Logout: "+res.logOut;
    if(res.upload==null)
        document.getElementById("lastUpload").innerHTML="Last Upload: / ";
    else
        document.getElementById("lastUpload").innerHTML="Last Upload: "+res.upload;
    if(res.downlaod==null)
        document.getElementById("lastDownload").innerHTML="Last Downlaod: /";
    else
        document.getElementById("lastDownload").innerHTML="Last Downlaod: "+res.downlaod;
    if(res.delete==null)
        document.getElementById("lastDelete").innerHTML="Last Delete: /";
    else
        document.getElementById("lastDelete").innerHTML="Last Delete: "+res.delete;
}
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

