class SearchResult {
     constructor(resultsDiv)  {
          this.resultsDiv = resultsDiv;
     }
     async renderResults(companiesData){
        for (let i = 0; i < companiesData.length; i++) {
          const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${companiesData[i].symbol}`;
          const response = await fetch(url);
          const companies = await response.json();
          console.log(companiesData)
          let symbol = companies.symbol;
          let img = companies.profile.image;
          let name = companiesData[i].name;
          let change =  Number(companies.profile.changesPercentage).toFixed(2)
          if (change >= 0) {
               change =`<span class="fw-bold border-5 text-success ">(${change}%) </span>`
          } else {
               change = `<span  class="fw-bold  border-5 text-danger ">(${change}%) </span>`
          }
          this.resultsDiv.innerHTML += `<div class="d-flex justify-content-center"><div class="  w-100 rounded-4 border p-3 ps-5 list-row  shadow-sm align-items-center  mt-1">
                    <img class=" ms-5 me-3" style="width: 3.3rem" src="${img}"></img>
                    <a class="h5 fw-bold text-decoration-none mt-4 " href="./company.html?symbol=${symbol}">${name}   (${symbol}) </a> 
                    <span" class="fw-bold">${change}</span></div></div>`}
        
     }
}