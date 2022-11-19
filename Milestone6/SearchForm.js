class SearchForm {
     constructor(formDiv) {
          this.formDiv = formDiv;
     }
     onSearch(func) {
          this.formDiv.innerHTML = `<div class="input-group mb-3">
                         <input id="search-input" type="text" class="form-control" placeholder="Enter Company Name or Symbol" aria-label="Recipient's username" aria-describedby="button-addon2">
                         <button class="btn btn-outline-primary" type="button" id="button-addon2">Search</button></div>`;
          this.btn = document.getElementById("button-addon2");
          this.btn.addEventListener("click", async () => {
               let input = document.getElementById("search-input").value;
               const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${input}&limit=10&exchange=NASDAQ`;
               const response = await fetch(url);
               const companiesData = await response.json();
               func(companiesData) 
          });
     }
}

