const aboutUser=document.getElementById("user");
const register=document.getElementById("confirm");
const logOut=document.getElementById("logOut");
const btnEmpty=document.getElementById("cleanHistory");
logOut.onclick=(ev)=>leavePage();
btnEmpty.onclick=(ev)=>cleanHistory();
//popunja podatke o korisniku prilikom logovanja
getDataAboutUser();
getDataAbouHistoryOfUser();

function cleanHistory()
{
    const formData = new FormData();
    formData.append("clean","true");
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
              

            }).then(() =>  refreshPage())

            .catch(error => console.log(error));
}
function refreshPage()
{
    window.location.href="history.html";
}
function getDataAbouHistoryOfUser()
{
    const formData = new FormData();
    formData.append("history","true");
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

            }).then((res) => showResult(res))

            .catch(error => console.log(error));
         
       
   
}
function showResult(res)
{
    var data=[];
    
    res.forEach((file)=>
       {
           var obj=
           { 
                "#": "<i class='fas fa-terminal'></i>",
                "Name Of File": file.nameOfFile,
                "Date Modified" :file.date,
                "Action" : file.state  
           };
          
          data.push(obj); 
       });
       $('#dataTable').DataTable(
               {
            "pageLength": 25,
            "ordering":true,
             "columns":[
            {"data":"#"},
            {"data":"Name Of File"},
            {"data":"Date Modified"},
            {"data":"Action"}
        ],
        "data": data
               });
       
         if(data.length==0)
         {
             document.getElementById("dataTable").innerHTML="<div id='emptyPicDiv'>\n\
             <div style='margin-top: 10%; margin-bottom: 10%; margin-left:40%' >\n\
            <img src='https://img.icons8.com/clouds/150/000000/edit-folder.png'>\n\
            </div></div>";
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

