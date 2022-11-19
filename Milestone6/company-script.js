

const chartDates = [];
const chartData = [];
const urlData = new URLSearchParams(window.location.search);
const compSymbol = urlData.toString().slice(7);

async function getString() {
     
     const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${compSymbol}`;
     const response = await fetch(url);
     const responseData = await response.json();
              
               document.getElementById("logo").src = responseData.profile.image;
               document.getElementById("name").innerHTML =
                    responseData.profile.companyName;
               document.getElementById("info").innerHTML =
                    responseData.profile.description;
               document.getElementById("website").href =
                    responseData.profile.website;
               document.getElementById("stock-price").innerText =
                    `Stock Price: $${responseData.profile.price}`;
               document.getElementById("stock-changes").innerText =
                    `(${Number(responseData.profile.changesPercentage).toFixed(2)})`;
               if (responseData.profile.changesPercentage < 0) {
                    document.getElementById("stock-changes").classList.add("text-danger")
               } else {
                    document.getElementById("stock-changes").classList.add("text-success")
               }
          }


async function getChartData() {
     document.getElementById("spinner").classList.remove("visually-hidden");
     const url =  `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${compSymbol}?serietype=line`
     const response = await fetch(url );
     const responseData = await response.json();

     for (let i=0; i < responseData.historical.length;  i++) {
        chartDates.push(responseData.historical[i].date)
        chartData.push(responseData.historical[i].close)
     }

     document.getElementById("logo").classList.remove("visually-hidden");
     document.getElementById("spinner").classList.add("visually-hidden");
     const labels = chartDates.map(x => x).reverse();

     const data = {
          labels: labels,
          datasets: [
               {
                    label: "Stock Price History",
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(255, 99, 132)",
                    
                    data: [],
                    backgroundColor: [
                         'rgba(72, 122, 180, .7)'
     
                     ],
                     borderColor: [
                         ' rgba(72, 122, 180, .7)',
                     ],
                     borderWidth: 1,
                     fill: {
                         target: 'origin',
                         below: 'rgba(255, 99, 132, 1)'
                     }
                 }]
               }
     
     data.datasets[0].data = chartData.reverse();

     const config = {
          type: "line",
          data: data,
          options: {},
     };
     const myChart = new Chart(document.getElementById("myChart"), config);
}

window.onload = getString();
window.onload = getChartData();
