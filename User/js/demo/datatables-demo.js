// Call the dataTables jQuery plugin
$(document).ready(function() {
    var data=[];
    var formData=new FormData();
    formData.append("files",true);
    formData.append("idUser",sessionStorage["id"]);
    const fetchData =
     {
                method:"POST",
                body: formData
     }
     fetch("../../User/php/server.php",fetchData)
        .then(response=>
            {
                if(!response.ok)
                    throw new Error(response.statusText)
                else
                    return response.json();
            }).then((listaFajlova)=>{
       listaFajlova.forEach((file)=>
       {
           var obj=
           {
                "Name Of File": file.nameOfFile,
                "Size Of File" : (atob(file.content).length/1024).toFixed(2).toString()+"KB",
                "Date Modified" :file.date,
                "Download File" : "<input type='radio' name='files' value='"+file.id+"'/>"    
           };
          data.push(obj); 
       });
       $('#dataTable').DataTable(
               {
            "pageLength": 25,
            "ordering":true,
             "columns":[
            {"data":"Name Of File"},
            {"data":"Size Of File"},
            {"data":"Date Modified"},
            {"data":"Download File"}
        ],
        "data": data
               });
       
         if(data.length==0)
         {
             document.getElementById("dataTable").innerHTML="<div id='emptyPicDiv'>\n\
             <div style='margin-top: 10%; margin-bottom: 10%;' >\n\
            <img src='https://img.icons8.com/clouds/150/000000/edit-folder.png'>\n\
            </div></div>";
         }
       
   })
           .catch(error => console.log(error));
  
});
