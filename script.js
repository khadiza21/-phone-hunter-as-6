// text?.text?.text || 'Info will provide soon'
// search all products phone or others and get api data
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
        displaySearchResult(data.data.slice(0, 20));
      });
  }
};

//get search item name and display all serch data
const displaySearchResult = (phones) => {
  const searchResult = document.getElementById("search-result");

  // searchResult.innerHTML = "";
  console.log(phones.length);
  searchResult.textContent = "";
  console.log(phones.length);
  const checking = phones.length;
  if (checking === 0) {
    //show no result found
    alert("no result found");
    console.log("no");
  }
  phones?.forEach((phone) => {
    const div = document.createElement("div");

    div.classList.add("col");
    div.innerHTML = `
      <div class="card">
      <img src="${phone.image}" class="card-img-top img" alt="This is ${phone.phone_name} picture">
      <div class="card-body">
        <h5 class="card-title">${phone.brand}</h5>
        <p class="card-text">${phone.phone_name}</p>
        <p class="card-text">${phone.slug}</p>
        <button  onclick="loadPhoneDetail('${phone.slug}')"  class="btn btn-info fw-bold">Details </button>
      </div>
     
    </div>`;
    searchResult.appendChild(div);
  });
};

// load individual phone details form api link
const loadPhoneDetail = (phoneIdenty) => {
  const url = ` https://openapi.programming-hero.com/api/phone/${phoneIdenty}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayPhoneDetails(data.data);
      //  console.log(data.data.others.Bluetooth);
      console.log(data.data);
    });
};

// display Phone Details
const displayPhoneDetails = (details) => {
  const phoneDetails = document.getElementById("phone-details");
  //console.log(details.others)
  phoneDetails.textContent = "";
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
  <img src="${details.image}" class="card-img-top" alt="This is ${
    details.name
  } picture">
  <div class="card-body">
  <h5 class="card-title">Brand Name: ${details.brand}</h5>
      <h6><span class="fw-bold">Released:</span> ${
        details.releaseDate
          ? details.releaseDate
          : `<h6>No Release Date Found </h6> `
      }</h6>
      <p class="card-text"> Name:  ${details.name}</p>
      <p class="card-text">Display Size: ${details.mainFeatures.displaySize}</p>
      <p class="card-text">Storage: ${details.mainFeatures.storage}</p>
       <p class="card-text">Slug: ${details.slug}</p>
      <span class="card-text " id="sensor">Sensors: ${
        details.mainFeatures.sensors
      }</span>
      <p class="card-text">Bluetooth: ${
        details?.others?.Bluetooth || "Info will provide soon"
      }</p>   
      <p class="card-text">GPS: ${
        details?.others?.GPS || "Info will provide soon"
      }</p>   
      <p class="card-text">Radio: ${
        details?.others?.Radio || "Info will provide soon"
      }</p>   
      <p class="card-text">USB: ${
        details?.others?.USB || "Info will provide soon"
      }</p>   
      <p class="card-text">WLAN: ${
        details?.others?.WLAN || "Info will provide soon"
      }</p>   
  </div>
  `;
  phoneDetails.appendChild(div);
};
