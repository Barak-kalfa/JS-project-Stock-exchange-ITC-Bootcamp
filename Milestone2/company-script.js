const chartDates = [];
const chartData = [];
const urlData = new URLSearchParams(window.location.search);
const compSymbol = urlData.toString().slice(7);

async function getString() {
     
     let url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${compSymbol}`;
     fetch(url)
          .then((res) => {
               if (!res.ok) {
                    throw res;
               }
               return res;
          })
          .then((res) => res.json())
          .then((data) => {
               return data;
          })
          .catch((err) => console.log(err))
          .then((data) => {
              
               document.getElementById("logo").src = data.profile.image;
               document.getElementById("name").innerHTML =
                    data.profile.companyName;
               document.getElementById("info").innerHTML =
                    data.profile.description;
               document.getElementById("website").href =
                    data.profile.website;
               document.getElementById("stock-price").innerText =
                    ` $${data.profile.price}`;
               document.getElementById("stock-changes").innerText =
                    data.profile.changesPercentage;
               if (data.profile.changesPercentage < 0) {
                    document.getElementById("stock-changes").classList.add("text-danger")
               } else {
                    document.getElementById("stock-changes").classList.add("text-success")
               }
          });
}

async function getChartData() {
     document.getElementById("spinner").classList.remove("visually-hidden");
     const response = await fetch(
          `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${compSymbol}?serietype=line`
     );
     const responseData = await response.json();
     //creating X-axis//
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
                         'rgba(255, 99, 132, 1)'
     
                     ],
                     borderColor: [
                         'rgba(255, 99, 132, 1)',
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
