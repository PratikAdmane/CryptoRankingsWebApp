let url = "https://api.coincap.io/v2/assets";
let response = fetch(url);
const itemsPerPage = 10; // Number of items to display per page
let currentPage = 1; // Current page
let totalPages = 0; // Total number of pages
let coinsData = []; // Array to store fetched coins data

response
  .then((v) => {
    return v.json();
  })
  .then((coins) => {
    coinsData = coins.data;
    totalPages = Math.ceil(coinsData.length / itemsPerPage);
    showCoins();
    renderPagination();
  });

function showCoins() {
  let startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;
  let coinsToShow = coinsData.slice(startIndex, endIndex);

  let html = "";
  for (let coin of coinsToShow) {
    html += `
      <div class="card text-center">
        <div class="card-header">Rank : ${coin.rank}</div>
        <div class="card-body">
          <h5 class="card-title">Crypto Name: ${coin.name}</h5>
          <p class="card-text">Symbol: ${coin.symbol}</p>
          <p class="card-text">Price (USD): ${coin.priceUsd}</p>
          <p class="card-text">Supply: ${Math.round(coin.supply)}</p>
          <p class="card-text">Maximum Supply: ${Math.round(coin.maxSupply)}</p>
          <p class="card-text">Total Market Cap: ${Math.round(coin.marketCapUsd)}</p>
          <p class="card-text">Volume Used (in 24hr): ${Math.round(coin.volumeUsd24Hr)}</p>
          <p class="card-text">Volume Weighted Average Price: ${Math.round(coin.vwap24Hr)}</p>
          <a href="${coin.explorer}" class="btn btn-primary">Explore</a>
        </div>
      </div>
    `;
  }

  document.getElementById("cardContainer").innerHTML = html;
}

function renderPagination() {
  let paginationHtml = `
    <ul class="pagination justify-content-center">
      <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="prevPage()">Previous</a>
      </li>
  `;

  for (let i = 1; i <= totalPages; i++) {
    paginationHtml += `
      <li class="page-item ${currentPage === i ? 'active' : ''}">
        <a class="page-link" href="#" onclick="goToPage(${i})">${i}</a>
      </li>
    `;
  }

  paginationHtml += `
      <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="nextPage()">Next</a>
      </li>
    </ul>
  `;

  document.getElementById("pagination").innerHTML = paginationHtml;
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    showCoins();
    renderPagination();
  }
}

function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    showCoins();
    renderPagination();
  }
}

function goToPage(page) {
  currentPage = page;
  showCoins();
  renderPagination();
}
