
const btn = document.getElementById("button");
const resultList = document.getElementById("results-list");
const loadBtn = document.getElementById("loaderButton");
const searchBox = document.getElementById("search-input");

 function creatList (companiesInfo) {
        let row = document.createElement("listRow")
         for (let i=0; i<companiesInfo.length; i++) {
            const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${companiesInfo[i].symbol}`;
            fetch(url)
          .then((res) => {
               if (!res.ok) {
                    throw res;
               }
               return res;
          })
          .then((res) => res.json())
          .then((company) => {
               return company;
          })
          .catch((err) => console.log(err))
          .then((company) => {
            row = document.createElement("div")
            row.innerHTML = `<div class="rounded-4 list-row d-flex flex-wrap justify-content-center align-items-center  pe-5 ps-5  shadow  m-2 p-3 "><img class=" me-3" style="width: 2rem"  src="${company.profile.image}"></img><a class="fw-bold  h5 text-decoration-none" href="M3-company.html?symbol=${companiesInfo[i].symbol}">${companiesInfo[i].name}</a> <span class="fw-bolder ms-4 me-4 h5">  (${companiesInfo[i].symbol})</span> <span id="stockPrecentage${i}" class="fw-bolder">(${Number(company.profile.changesPercentage).toFixed(2)}%) </span></div>`
            resultList.appendChild(row)
            console.log(company.profile.changesPercentage)
            if (company.profile.changesPercentage < 0 ) {
                document.getElementById(`stockPrecentage${i}`).classList.add("text-danger")
            } else {
                document.getElementById(`stockPrecentage${i}`).classList.add("text-success")
            }
          })
      
}}

 function getStockResult(searchInput) {
    let url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchInput}&limit=10&exchange=NASDAQ`
     fetch (url)
        .then((res) => {
            if (!res.ok) {
                 throw res;
            }
            return res;
        })
        .then ((res) => res.json())
        .then ((companiesInfo) => {
            creatList(companiesInfo)
            btn.classList.remove("visually-hidden"),
             loadBtn.classList.add("visually-hidden")
            return companiesInfo})
            .catch((err) => console.log(err))
        
    }

btn.addEventListener("click", () => {
    resultList.innerHTML=""
    btn.classList.add("visually-hidden"),
    loadBtn.classList.remove("visually-hidden")
    getStockResult(document.getElementById("search-input").value),
    resultList.classList.remove("visually-hidden")
})

searchBox.addEventListener("keypress", () => {
    resultList.innerHTML="";
}
)
