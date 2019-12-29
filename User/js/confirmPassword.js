const el=document.getElementById("next");
el.onclick = (ev) => checkNumber(ev);

function checkNumber(ev)
{
         const formData = new FormData();
         formData.append("Id",sessionStorage.getItem("id"));
         
   
     
        const fetchData =
            {
                method:"POST",
                body: formData
            }
         fetch("../php/getUserById.php",fetchData)
            .then(response =>
           {
               if(!response.ok)
                 throw new Error(response.statusText);
               else
                  return response.json();

            }).then((user) => anotherValidation(user))
    
            .catch(error => console.log(error));
}
function anotherValidation(user)
{
    
    let code=document.querySelector("input[name='code']").value;
    if(code==user.confirmNumber)
    {
       const formData = new FormData();
         formData.append("Id",sessionStorage.getItem("id"));
         
        const fetchData =
            {
                method:"POST",
                body: formData
            }
         fetch("../php/changeConfirmNumber.php",fetchData)
            .then(response =>
           {
               if(!response.ok)
                 throw new Error(response.statusText);
               else
                  return response.json();

            }).then(() => {})
    
            .catch(error => console.log(error));
    
          logIn(user);
    
        
    }
    else
    {
        pocrveni(document.querySelector("input[name='code']"));
        
    }
}
function logIn(user)
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
function pocrveni(el)
    {
        el.value="";
        el.style.borderColor="red";
    }
//sessionStorage.removeItem("id");