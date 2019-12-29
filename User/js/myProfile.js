const name=document.getElementById("ime");
const surname=document.getElementById("prezime");
const email=document.getElementById("email");
const aboutUser=document.getElementById("user");
const register=document.getElementById("confirm");
const logOut=document.getElementById("logOut");

name.value=sessionStorage.getItem("firstName");
name.readOnly="true";
surname.value=sessionStorage.getItem("lastName");
surname.readOnly="true";
email.value=sessionStorage.getItem("email");
email.readOnly="true";

logOut.onclick=(ev)=>leavePage();

//popunja podatke o korisniku prilikom logovanja
getDataAboutUser();


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

