
const btn = document.getElementById("button");
const resultList = document.getElementById("results-list");
const loadBtn = document.getElementById("loaderButton")

function creatList (data) {
    let list = document.getElementById("results-list")
    let row = document.createElement("listRow")
    for (let i=0; i<data.length; i++) {
        console.log(i)
        row = document.createElement("div")
        row.innerHTML = `<a href="/company.html">${data[i].name}   (${data[i].symbol})</a>`
        list.appendChild(row)
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
            console.log(data)
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