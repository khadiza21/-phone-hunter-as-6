const searchPhone = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;

  //   clear data
  searchField.value = "";
  if (searchText == "") {
    //   please write something to display
    alert("please write something to display");
  } else {
    //   load data

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.data);
        displaySearchResult(data.data);
      });
    //   data.phones
  }
};

const displaySearchResult = (phones) => {
  const searchResult = document.getElementById("search-result");
  searchResult.innerHTML = " ";
  searchResult.textContent = "";

  if (phones === null) {
    //show no result found
    console.log("no result found");
  }
  phones?.forEach((phone) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
      <div onclick="loadphoneDetail(${phone.idphone})"  class="card">
      <img src="${phone.image}" class="card-img-top img" alt="This is ${phone.phone_name} picture">
      <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">${phone.slug}</p>
      </div>
    </div>`;
    searchResult.appendChild(div);
  });
};
// brand: "Apple "
// image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-mini.jpg"
// phone_name: "iPhone 13 mini"
// slug: "apple_iphone_13_mini-11104"
