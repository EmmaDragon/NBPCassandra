var user={
    Email:"",
    Password:""
}

const el=document.getElementById("logIn");
el.onclick = (ev)=> logiInUser(ev);

function getUserData()
{
        let ind=1;
        const username=document.querySelector("input[name='username']");
        user.Email=username.value;
        const password=document.querySelector("input[name='password']");
        user.Password=password.value;
        
        if(username.value=="")
        {
            redLabel(username);
            ind=0;
        }
        if(password.value=="")
        {
            redLabel(password);
            ind=0;
        }
        return ind;     
        
    
}
 function redLabel(el)
{
        el.value="";
        el.style.borderColor="red";
}

function logiInUser(ev)
{
    let ind=getUserData();
    if(ind==0)
    {
        let tmp=document.getElementById("alert");
        let innerHtml="<div class='alert alert-danger' role='alert'><strong>Wrong </strong> \n\
            <a href='#' class='alert-link'>username or password!</a>\n\
           </div>";
        tmp.innerHTML=innerHtml;
        tmp.style.visibility="inherit";
        tmp.style.textAlign="center";
    }
    else   
     { 
         const formData = new FormData();
         formData.append("Email",user.Email);
         formData.append("Password",user.Password);
   
     
        const fetchData =
            {
                method:"POST",
                body: formData
            }
         fetch("../php/validationUserData.php",fetchData)
            .then(response =>
           {
               if(!response.ok)
                 throw new Error(response.statusText);
               else
                  return response.json();

            }).then((user) => checkUser(user))
    
            .catch(error => console.log(error));
     }
    
}

function checkUser(user)
{
    if(user!=null)
    {
        sessionStorage.setItem("id",user.id);
        sessionStorage.setItem("firstName",user.firstName);
        sessionStorage.setItem("lastName",user.lastName);
        sessionStorage.setItem("email",user.email);
        
        if(user.confirmNumber==0)
        {
            const formData = new FormData();
            formData.append("Id",sessionStorage.getItem("id"));
         
            const fetchData =
                {
                     method:"POST",
                     body: formData
                }
            fetch("../php/logInUser.php",fetchData)
            .then(response =>
            {
               if(!response.ok)
                 throw new Error(response.statusText);
               else
                  return response.json();

            }).then(() => {window.open("../html/profile.html","_self");})
    
            .catch(error => console.log(error));
            
        }
      
        else
        {
           window.open("../html/confirmPage.html","_self");
        }  

           
    }
    else 
    {
        let tmp=document.getElementById("alert");
        let innerHtml="<div class='alert alert-danger' role='alert'><strong> </strong> \n\
            <a href='#' class='alert-link'>Wrong username or password!</a>\n\
           </div>";
        tmp.innerHTML=innerHtml;
        tmp.style.visibility="inherit";
        tmp.style.textAlign="center"; 
        
    }
   
        
}




//sessionStorage.removeItem("id");







