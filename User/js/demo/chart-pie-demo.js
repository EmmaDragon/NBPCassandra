// Set new default font family and font color to mimic Bootstrap's default styling
$(document).ready(function(){
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';
getDataForChart("myPieChart","statistics");
// Pie Chart Example
function getDataForChart(nameOfChart,params)
{
    const formData = new FormData();
    formData.append(params,"true");
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

            }).then((res) => showResult(res,nameOfChart))

            .catch(error => console.log(error));
         
}
function showResult(res,nameOfChart)
{
var data=[];
data[0]=res.downloaded;
data[1]=res.uploaded;
data[2]=res.deleted;
document.getElementById("numOfDownloaded").innerHTML="Downloaded File: "+res.downloaded;
document.getElementById("numOfUplaoded").innerHTML="Uploaded File: "+res.uploaded;
document.getElementById("numOfDeleted").innerHTML="Deleted File: "+res.deleted;
var ctx = document.getElementById(nameOfChart);
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["Downloaded", "Uploaded", "Deleted"],
    datasets: [{
      data: data,
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 80,
  },
});
}
});