const aboutUser=document.getElementById("user");
const register=document.getElementById("confirm");
const logOut=document.getElementById("logOut");
const filter=document.getElementById("filteri");
const filterValue=document.getElementById("filterValue");
const filterButton=document.getElementById("searchFile");

filterButton.onclick=(ev)=>getFilteredFiles();
logOut.onclick=(ev)=>leavePage();

//popunja podatke o korisniku prilikom logovanja
getDataAboutUser();
filter.addEventListener('change',function(e){
    if(filter.value=="sizeOfFile")
    {
        document.getElementById("filterLabel").innerHTML="Value (KB):";
        document.getElementById("filterValue").style.display="block";
        let html="<label for='comment'>Range:</label>"+
        "<select class='form-control' id='fileSize'>"+
        "<option value='less' selected>Less</option>"+
        "<option value='equal'>Equal</option>"
        +"<option value='greater'>Greater</option></select>";
        document.getElementById("tmpFilter").innerHTML=html;
    }
    else if(filter.value=="extension")
    {
       
        document.getElementById("filterLabel").innerHTML="Extension:";
        document.getElementById("filterValue").style.display="none";
        let html="<select class='form-control' id='fileExtension'>"+
        "<option value='.php'>*php</option>"+
        "<option value='.html'>*html</option>"+
        "<option value='.txt' selected>*txt</option>"+
        "<option value='.png'>*png</option>"+
        "<option value='.jpg'>*jpg</option>"+
        "<option value='.jpeg'>*jpeg</option>"+
        "<option value='.js'>*js</option>"+
        "<option value='.css'>*css</option>"+
        "<option value='.c'>*c</option>"+
        "<option value='.cpp'>*cpp</option>"+
        "<option value='.pdf'>*pdf</option>"+
        "</select>";
        document.getElementById("tmpFilter").innerHTML=html;
        document.getElementById("tmpFilter").style.width="450px";
        document.getElementById("tmpFilter").classList.add("mb-2");

        
    }
    else if(filter.value=="dateAndTime")
    {
        document.getElementById("filterLabel").innerHTML="Date Modified:";
        document.getElementById("filterValue").style.display="none";
        let html="<input type='date' style='width:450px; height:38px;' class='form-control' id='dateModifiedFile' />";
        document.getElementById("tmpFilter").innerHTML=html;
        document.getElementById("tmpFilter").style.width="450px";
        document.getElementById("tmpFilter").classList.add("mb-2");
    }
    else
    {
        document.getElementById("filterValue").style.display="block";
        document.getElementById("tmpFilter").innerHTML="";
    }

},false);

function getFilteredFiles()
{
    const formData = new FormData();
    formData.append("idUser",sessionStorage["id"]);
    if(filter.value=="nameOfFile")
    {
    formData.append("filterName",filterValue.value);
    
    }
    else if(filter.value=="sizeOfFile")
    {
        formData.append("relation",document.getElementById("fileSize").value);
        formData.append("value",filterValue.value);
    }
    else if(filter.value=="extension")
    {
        formData.append("extension",document.getElementById("fileExtension").value);
    }
    else if(filter.value=="dateAndTime")
    {
        let res="";
        res=document.getElementById("dateModifiedFile").value; 
        let tmp=[];
        tmp=res.split('-');
        let date=tmp[0]+"/"+tmp[1]+"/"+tmp[2];
        formData.append("dateModified",date);
       
    }
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
                "Name Of File": file.nameOfFile,
                "Size Of File" : file.size.toString()+"B",
                "Date Modified" :file.date,
                "State" : "Active"    
           };
          data.push(obj); 
       });

       
         if(data.length==0)
         {
             document.getElementById("bodyOfTable").innerHTML="<div id='emptyPicDiv'>\n\
             <div style='margin-top: 10%; margin-bottom: 10%; margin-left:130%;' >\n\
            <img src='https://img.icons8.com/clouds/150/000000/edit-folder.png'>\n\
            </div></div>";
         }
         else
         {
             //document.getElementById("emptyPicDiv").style.display="none";
             let html="";
             res.forEach((file)=>
             {
                 html+="<tr><td>"+file.nameOfFile+"</td><td>"+(file.size/1024).toFixed(2).toString()+" KB</td><td>"+file.date+"</td></tr>";

             });
             document.getElementById("bodyOfTable").innerHTML=html;
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

