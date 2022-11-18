class MarqueeInnerElement {
     constructor(MarqueehtmlElemnt) {
          this.MarqueehtmlElemnt = MarqueehtmlElemnt;
     }
     async createMarquee() {
          let marqueeText = ``;
          const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nasdaq`;
          const response = await fetch(url);
          const companiesData = await response.json();
          for (let i = 0; i < companiesData.length; i++) {
               let price = companiesData[i].price;
               let symbol = companiesData[i].symbol;
               let changeP = Number(companiesData[i].changesPercentage).toFixed(2);
               if (changeP > 0) {
                    changeP = `<span  class="fw-bold me-1 border-end border-5 text-success pe-1 border-primary">(${changeP}%) </span>`;
               } else {
                    changeP = `<span  class="fw-bold me-1 border-end border-5 text-danger pe-1 border-primary">(${changeP}%) </span>`;
               }
               marqueeText += `<span class="fw-bold">${symbol}</span>   <span class="h6">$${price}</span>    <span  class="fw-bold me-1 border-end border-5 pe-1 border-primary">${changeP} </span>`;
          }
          return (this.MarqueehtmlElemnt.innerHTML = marqueeText);
     }
}
