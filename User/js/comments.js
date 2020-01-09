const aboutUser=document.getElementById("user");
const register=document.getElementById("confirm");
const logOut=document.getElementById("logOut");
const saveButton=document.getElementById("saveComment");

logOut.onclick=(ev)=>leavePage();
saveButton.onclick=(ev)=>addComment();

getDataAboutUser();
getAllComments();
function addComment()
{
    if(document.getElementById("myComment").value=="")
    {
        $('#commentWarning').modal('show');
    }
    else
    {
    const formData = new FormData();
    formData.append("idUser",sessionStorage["id"]);
    formData.append("firstName",sessionStorage["firstName"]);
    formData.append("lastName",sessionStorage["lastName"]);
    formData.append("comment",document.getElementById("myComment").value);
    formData.append("addComment","true");
    
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
              

            }).then(() => refreshPage())

            .catch(error => console.log(error));
    }

}
function refreshPage()
{
    window.open("../html/comments.html","_self");
}
function getAllComments()
{
    const formData = new FormData();
    formData.append("allComments","true");
    const fetchData =
    {
        method:"POST",
        body: formData
    };

         fetch("../php/server.php",fetchData)
            .then(response =>
           {
               if(!response.ok)
                 throw new Error(response.statusText);
               else
                  return response.json();

            }).then((res) => showResult(res))

            .catch(error => console.log(error));
}
function showResult(res)
{



       
         if(res.length==0)
         {
             document.getElementById("father").innerHTML="<div id='emptyPicDiv'>\n\
             <div style='margin-top: 10%; margin-bottom: 10%; margin-left:130%;' >\n\
            <img src='https://img.icons8.com/clouds/150/000000/edit-folder.png'>\n\
            </div></div>";
         }
         else
         {
            document.getElementById("father").innerHTML="";
            res.forEach((el)=>
            {
                
                let kontenjer=document.createElement("div");
                //kontenjer.align='left';
                kontenjer.className="toast fade show";
                kontenjer.setAttribute('role','alert');
                kontenjer.setAttribute('aria-live','assertive');
                kontenjer.setAttribute('aria-atomic','true');
                kontenjer.setAttribute('data-autohide','false');
                
                let zaglavlje=document.createElement("div");
                zaglavlje.className="toast-header bg-primary text-white";
              
                
                let naslov =document.createElement("strong");
                naslov.innerHTML=el.firstName+" "+el.lastName+"<br>"+el.email;
                naslov.className="mr-auto";
                zaglavlje.appendChild(naslov);
                
                let datum=document.createElement("small");
                datum.innerHTML="Date and Time: "+el.date;
                zaglavlje.appendChild(datum);
                
               
                
                
                let telo=document.createElement("div");
                telo.className="toast-body";
                telo.innerHTML=el.content;
                kontenjer.appendChild(zaglavlje);
                kontenjer.appendChild(telo);
                document.getElementById("father").appendChild(kontenjer);
            });
            
         }
         
       
   
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

