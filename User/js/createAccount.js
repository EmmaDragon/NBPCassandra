
const dugme=document.getElementById("register");
const el=document.getElementById("alert");
dugme.onclick = (ev) => kreirajNalog();

function kreirajNalog()
{
    el.innerHTML="";
    let prom=validacija();
    if(prom==0)
    {
     upozoriKlijenta();
     exit;
    }
    prom=validacijaOstatka();
    if(prom==0)
    {
        exit;
    }
    
   proveriPostojanjeKorisnika();
  
}
function proveriPostojanjeKorisnika()
{
    const formData = new FormData();
    formData.append("Email",document.querySelector("input[name='email']").value);
     const fetchData =
            {
                method:"POST",
               
                body: formData
            }
    fetch("../php/login.php",fetchData)
            .then(response => 
            {
                    if(!response.ok)
                        throw new Error(response.statusText);
                    else
                        return response.json();
               
 
            }).then((user) => postojiKorisnik(user))
            .catch(error => console.log(error));
}

function postojiKorisnik(user){
    
    let indikator=1;
    if(user!=null)
      indikator=0;
   if(indikator==1)
   {
    el.innerHTML="<div  class='alert alert-success' role='alert' >\n\
                  <strong>This</strong>\n\
                   may take a little time. Please<a href='#' class='alert-link'> wait!\n\
                 <div class='loader' >Loading...</div></a>";
            
   
    el.style.visibility="inherit";
    el.style.textAlign="center";
    const formData = new FormData();
    
    formData.append("FirstName",document.querySelector("input[name='ime']").value);
    formData.append("LastName",document.querySelector("input[name='prezime']").value);
    formData.append("Email",document.querySelector("input[name='email']").value);
    formData.append("Password",document.getElementById("sifra").value);
    var freeSpace=2147483648;
    formData.append("FreeSpace",freeSpace);//2 GB praznog prostora -> u bajtovima
   
       
     const fetchData =
            {
                method:"POST",
                body: formData
            }
         fetch("../php/createAccount.php",fetchData)
            .then(response =>
             {
                if(!response.ok)
                    throw new Error(response.statusText);

             }).then(()=>notifyKorisnik())
                .catch(error => console.log(error));
   }
   else
   {
          let innerHtml="<div class='alert alert-danger' role='alert'><strong>Username already exists!</strong></div>";
          el.innerHTML=innerHtml;
          el.style.visibility="inherit";
          el.style.textAlign="center";
          const korisnickoIme=document.querySelector("input[name='email']");
          pocrveni(korisnickoIme);
   }
 
        
}



function notifyKorisnik(){
    let innerHtml="<div  class='alert alert-success' role='alert' >\n\
                  <strong>Well done!</strong>\n\
                   You have successfully created MyCloud account!<a href='index.html' class='alert-link'> Go Back!\n\
                 </a>";
        
          el.innerHTML=innerHtml;
          el.style.visibility="inherit";
          el.style.textAlign="center";
          setTimeout(preusmeri, 2500);
          let body=document.querySelectorAll("input");
          body.forEach(el => el.readOnly="true");
}
function preusmeri()
{
      window.history.back();
}
function validacija()
{
    let nizSifri=document.querySelectorAll("input[name='sifra']");
    let ind=0;
    if( nizSifri[0].value==nizSifri[1].value )
        ind=1;
    return ind;
}
function upozoriKlijenta()
{
    let nizSifri=document.querySelectorAll("input[name='sifra']");
    nizSifri.forEach(sifra =>
    {
       pocrveni(sifra);
    });
}
function validacijaOstatka()
{
        let ind=1;
        const ime=document.querySelector("input[name='ime']");
        const prezime=document.querySelector("input[name='prezime']");
        const email=document.querySelector("input[name='email']");
        const potvrda=document.querySelector("input[type='checkbox']");
        let sifre=document.querySelectorAll("input[name='sifra']");

        if(ime.value=="")
        {
            pocrveni(ime);
            ind=0;
        }
        if(prezime.value=="")
        {
            pocrveni(prezime);
            ind=0;
        }
       
        if(email.value=="")
        {
            pocrveni(email);
            ind=0;
        }
        if(sifre[0].value=="")
        {
            pocrveni(sifre[0]);
            ind=0;
        }
        if(sifre[1].value=="")
        {
            pocrveni(sifre[1]);
            ind=0;
            
        }
        if(potvrda.checked==false)
        {
            let innerHtml="<div class='alert alert-danger' role='alert'><strong>You must accept our </strong> \n\
            <a href='#' class='alert-link'>policy & terms!</a>\n\
           </div>";
          el.innerHTML=innerHtml;
          el.style.visibility="inherit";
          el.style.textAlign="center";
          ind=0;
        
        }
        return ind;
        
        
}
    function pocrveni(el)
    {
        el.value="";
        el.style.borderColor="red";
    }

    



