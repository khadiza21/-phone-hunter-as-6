// search all products phone or others and get api data

const searchPhone = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value.toLowerCase();

  console.log(searchText);
  console.log(typeof searchText);
  //   clear data
  searchField.value = "";
  const error = document.getElementById("error");
  if (searchText === "") {
    //   please write something to display
    // alert("please write something to display");
    error.innerText = "Please enter a phone name!";
  } else {
    //   load data
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        displaySearchResult(data.data.slice(0, 20));

        searchField.value = "";
      });
  }
};

//get search item name and display all serch data
const displaySearchResult = (phones) => {
  const searchResult = document.getElementById("search-result");

  searchResult.innerHTML = "";
  // console.log(phones.length);
  searchResult.textContent = "";
  console.log(phones.length);
  const checking = phones.length;
  if (checking === 0) {
    //show no result found
    // alert("no result found");
    console.log("no");
    searchResult.innerHTML = `
    <h1 class="text-center my-4 text-warning">No Result Found!</h1>
    `;
  }
  phones?.forEach((phone) => {
    const div = document.createElement("div");

    div.classList.add("col");
    div.innerHTML = `
      <div class="card border-0 shadow my-2">
      <img src="${phone.image}" class="card-img-top img py-5 img-fluid w-50 mx-auto " alt="This is ${phone.phone_name} picture">
      <div class="card-body px-3 pb-4">
      <h5 class="card-title fs-3 fw-bold ">Brand : ${phone.brand}</h5>
      <p class="card-text fs-5 fw-bold">Name : ${phone.phone_name}</p>
      <p class="card-text fs-6 fw-bold">Slug-Code: ${phone.slug}</p>
      <button  onclick="loadPhoneDetail('${phone.slug}')"  class="btn btn-info fw-bold w-100">Details </button>
      
      </div>
     
    </div>`;
    searchResult.appendChild(div);
  });
};

// load individual phone details form api link
const loadPhoneDetail = (phoneIdenty) => {
  console.log(phoneIdenty);
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
  phoneDetails.textContent = "";
  phoneDetails.innerHTML = "";
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
  <div class="mx-auto w-75 text-center">
   <img src="${
     details.image
   }" class="card-img-top detailImg mx-auto w-75  pt-2 my-4" alt="This is ${
    details.name
  } picture">
  </div>
 
  <div class="card-body fs-5 p-5">
  <h5 class="card-title"><span>Brand: </span>  ${details.brand}</h5>
     
      <p class="card-text"><span>Name: </span> ${details.name}</p>
      <p ><span>Released: </span> ${
        details?.releaseDate || "No Release Date Found"
      }</p>  
      <p class="card-text"><span>Display Size: </span> ${
        details.mainFeatures.displaySize
      }</p>
      <p class="card-text"><span>Storage: </span> ${
        details.mainFeatures.storage
      }</p>
       <p class="card-text"><span>Slug: </span>  ${details.slug}</p>
       
       
      <span class="card-text my-2 fw-normal" > <span>Sensors: </span> ${
        details.mainFeatures.sensors
      }</span>
      <h4 class="card-text fw-bold mt-4 text-info">Others: </h4>
      <p class="card-text"><span>Bluetooth: </span> ${
        details?.others?.Bluetooth || "Info will provide soon"
      }</p>   
      <p class="card-text"><span>GPS: </span> ${
        details?.others?.GPS || "Info will provide soon"
      }</p>   
      <p class="card-text"><span>Radio: </span> ${
        details?.others?.Radio || "Info will provide soon"
      }</p>   
      <p class="card-text"><span>USB: </span> ${
        details?.others?.USB || "Info will provide soon"
      }</p>   
      <p class="card-text"><span>WLAN: </span> ${
        details?.others?.WLAN || "Info will provide soon"
      }</p>   
  </div>
  `;
  phoneDetails.appendChild(div);
};
