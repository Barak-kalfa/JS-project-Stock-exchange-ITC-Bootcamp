const btn = document.getElementById("button");
const resultList = document.getElementById("results-list");
const loadBtn = document.getElementById("loaderButton");
const marquee = document.getElementById("marquee");
let marqueeText = document.createElement("marqueeText");
const makeMarquee = new MarqueeInnerElement(marquee);
window.onload = makeMarquee.createMarquee();

async function creatList(data) {
     let list = document.getElementById("results-list");
     let row = document.createElement("listRow");
     for (let i = 0; i < data.length; i++) {
          const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${data[i].symbol}`;
          const response = await fetch(url);
          const companiesData = await response.json();
          row = document.createElement("div");
          row.innerHTML = `<div class=" rounded-4 border p-3 ps-5 list-row  shadow-sm  mt-1  "><img class=" ms-5 me-3" style="width: 2.3rem"  src="${
               companiesData.profile.image
          }"></img><a class="    h5  mt-4 " href="./company.html?symbol=${
               data[i].symbol
          }">${data[i].name}</a>   (${
               data[i].symbol
          }) <span id="stockPrecentage${i}" class="fw-bold">(${Number(
               companiesData.profile.changesPercentage
          ).toFixed(2)}%) </span></div>`;
          list.appendChild(row);
          if (companiesData.profile.changesPercentage < 0) {
               document
                    .getElementById(`stockPrecentage${i}`)
                    .classList.add("text-danger");
          } else {
               document
                    .getElementById(`stockPrecentage${i}`)
                    .classList.add("text-success");
          }
     }
}

async function getCompanyStocks(searchInput) {
     const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchInput}&limit=10&exchange=NASDAQ`;
     const response = await fetch(url);
     const companiesData = await response.json();
     creatList(companiesData);
     btn.classList.remove("visually-hidden"),
          loadBtn.classList.add("visually-hidden");
     return companiesData;
}

btn.addEventListener("click", () => {
     btn.classList.add("visually-hidden"),
          loadBtn.classList.remove("visually-hidden");
     getCompanyStocks(document.getElementById("search-input").value),
          resultList.classList.remove("visually-hidden");
});