// Set new default font family and font color to mimic Bootstrap's default styling
$(document).ready(function(){
  getDataForChart("myBarChart","allLogInOut");
  
  Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
  Chart.defaults.global.defaultFontColor = '#858796';
  
  function number_format(number, decimals, dec_point, thousands_sep) {
    // *     example: number_format(1234.56, 2, ',', ' ');
    // *     return: '1 234,56'
    number = (number + '').replace(',', '').replace(' ', '');
    var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
      dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
      s = '',
      toFixedFix = function(n, prec) {
        var k = Math.pow(10, prec);
        return '' + Math.round(n * k) / k;
      };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
  }
  
  
  //getDataForChart("myBarChart2","allLogOut");
  // Bar Chart Example
  
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
    var numPerMonths=[];
    var numPerMonths2=[];
    for(let i=0;i<12;i++)
      {
        numPerMonths[i]=0;
        numPerMonths2[i]=0;
      }
    var d = new Date();
    var cuuYear = d.getFullYear();
    res[0].forEach(element => {
     
       
      if(cuuYear==element.substring(-1,4))
      {
      if(element.substring(5,7)=="01")
      {
        numPerMonths[0]++;
      }
      else if(element.substring(5,7)=="02")
      {
        numPerMonths[1]++;
      }
      else if(element.substring(5,7)=="03")
      {
        numPerMonths[2]++;
      }
      else if(element.substring(5,7)=="04")
      {
        numPerMonths[3]++;
      }
      else if(element.substring(5,7)=="05")
      {
        numPerMonths[4]++;
      }
      else if(element.substring(5,7)=="06")
      {
        numPerMonths[5]++;
      }
      else if(element.substring(5,7)=="07")
      {
        numPerMonths[6]++;
      }
      else if(element.substring(5,7)=="08")
      {
        numPerMonths[7]++;
      }
      else if(element.substring(5,7)=="09")
      {
        numPerMonths[8]++;
      }
      else if(element.substring(5,7)=="10")
      {
        numPerMonths[9]++;
      }
      else if(element.substring(5,7)=="11")
      {
        numPerMonths[10]++;
      }
      else if(element.substring(5,7)=="12")
      {
        numPerMonths[11]++;
      }
    }
    });
    res[1].forEach(element => {
     
       
      if(cuuYear==element.substring(-1,4))
      {
      if(element.substring(5,7)=="01")
      {
        numPerMonths2[0]++;
      }
      else if(element.substring(5,7)=="02")
      {
        numPerMonths2[1]++;
      }
      else if(element.substring(5,7)=="03")
      {
        numPerMonths2[2]++;
      }
      else if(element.substring(5,7)=="04")
      {
        numPerMonths2[3]++;
      }
      else if(element.substring(5,7)=="05")
      {
        numPerMonths2[4]++;
      }
      else if(element.substring(5,7)=="06")
      {
        numPerMonths2[5]++;
      }
      else if(element.substring(5,7)=="07")
      {
        numPerMonths2[6]++;
      }
      else if(element.substring(5,7)=="08")
      {
        numPerMonths2[7]++;
      }
      else if(element.substring(5,7)=="09")
      {
        numPerMonths2[8]++;
      }
      else if(element.substring(5,7)=="10")
      {
        numPerMonths2[9]++;
      }
      else if(element.substring(5,7)=="11")
      {
        numPerMonths2[10]++;
      }
      else if(element.substring(5,7)=="12")
      {
        numPerMonths2[11]++;
      }
    }
    });
  
    var ctx = document.getElementById(nameOfChart);
    var myBarChart = new Chart(ctx, {
    
    type: 'bar',
    data: {
      labels: ["January", "February", "March", "April", "May", "June","July","August","September","October","November","December"],
      datasets: [{
        label: "NumOfLogIn",
        backgroundColor: "#4e73df",
        hoverBackgroundColor: "#2e59d9",
        borderColor: "#4e73df",
        data: numPerMonths
      },
      {
        label: "NumOfLogOut",
        backgroundColor: "#3b8f54",
        hoverBackgroundColor: "#3b8f54",
        borderColor: "#3b8f54",
        data: numPerMonths2
      }],
    },
    options: {
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 25,
          top: 25,
          bottom: 0
        }
      },
      scales: {
        xAxes: [{
          time: {
            unit: 'month'
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            maxTicksLimit: 12
          },
          maxBarThickness: 25,
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: 100,
            maxTicksLimit: 10,
            padding: 10,
            // Include a dollar sign in the ticks
            callback: function(value, index, values) {
              return '' + number_format(value);
            }
          },
          gridLines: {
            color: "rgb(234, 236, 244)",
            zeroLineColor: "rgb(234, 236, 244)",
            drawBorder: false,
            borderDash: [2],
            zeroLineBorderDash: [2]
          }
        }],
      },
      legend: {
        display: true
        
      },
      tooltips: {
        titleMarginBottom: 10,
        titleFontColor: '#6e707e',
        titleFontSize: 14,
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
        callbacks: {
          label: function(tooltipItem, chart) {
            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
            return datasetLabel + ': ' + number_format(tooltipItem.yLabel);
          }
        }
      },
    }
  });
  }
  });
  
  