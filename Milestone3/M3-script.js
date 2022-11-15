
const btn = document.getElementById("button");
const resultList = document.getElementById("results-list");
const loadBtn = document.getElementById("loaderButton")

function creatList (data) {

        let list = document.getElementById("results-list")
        let row = document.createElement("listRow")
         for (let i=0; i<data.length; i++) {
            const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${data[i].symbol}`;
     fetch(url)
          .then((res) => {
               if (!res.ok) {
                    throw res;
               }
               return res;
          })
          .then((res) => res.json())
          .then((data2) => {
               return data2;
          })
          .catch((err) => console.log(err))
          .then((data2) => {
            row = document.createElement("div")
            row.innerHTML = `<div class=" list-row  shadow-sm  mt-1 p-1 "><img class="w-10 me-3" style="width: 2.3rem"  src="${data2.profile.image}"></img><a class="link-info-:hover    h5  mt-4 " href="M3-company.html?symbol=${data[i].symbol}">${data[i].name}</a>   (${data[i].symbol}) <span id="stockPrecentage${i}" class="fw-bold">(${data2.profile.changesPercentage}%) </span></div>`
            list.appendChild(row)
            if (data2.profile.changesPercentage < 0 ) {
                document.getElementById(`stockPrecentage${i}`).classList.add("text-danger")
            } else {
                document.getElementById(`stockPrecentage${i}`).classList.add("text-success")
            }
          })
      
}}

async function getStockResult(searchInput) {
    let url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchInput}&limit=10&exchange=NASDAQ`
     fetch (url)
        .then((res) => {
            if (!res.ok) {
                 throw res;
            }
            return res;
        })
        .then ((res) => res.json())
        .then ((data) => {
            creatList(data)
            btn.classList.remove("visually-hidden"),
             loadBtn.classList.add("visually-hidden")
            return data})
            .catch((err) => console.log(err))
        
    }

btn.addEventListener("click", () => {
    btn.classList.add("visually-hidden"),
    loadBtn.classList.remove("visually-hidden")
    getStockResult(document.getElementById("search-input").value),
    resultList.classList.remove("visually-hidden")
})
