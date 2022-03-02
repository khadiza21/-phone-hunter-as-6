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
  searchResult.innerHTML = "";
  searchResult.textContent = "";

  if (phones === null) {
    //show no result found
    alert("no result found");
  }
  phones?.forEach((phone) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
      <div onclick="loadPhoneDetail('${phone.slug}')" class="card">
      <img src="${phone.image}" class="card-img-top img" alt="This is ${phone.phone_name} picture">
      <div class="card-body">
        <h5 class="card-title">${phone.brand}</h5>
        <p class="card-text">${phone.phone_name}</p>
        <p class="card-text">${phone.slug}</p>
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
      console.log(data.data);
      console.log(data.data.brand);
      console.log(data.data.name);
      console.log(data.data.image);
      console.log(data.data.mainFeatures.displaySize);
      console.log(data.data.mainFeatures.storage);
      console.log(data.data.releaseDate);
      console.log(data.data.slug);
      console.log(data.data.mainFeatures.sensors[0]);
      // console.log(data.data.mainFeatures.sensors.slice(0,5));
      console.log(data.data.others);
    });
};

const displayPhoneDetails = (details) => {
  //console.log(details);
  //const sensor =details.mainFeatures.sensors;
  const phoneDetails = document.getElementById("phone-details");
  const div = document.createElement("div");
  div.classList.add("card");

  for (let i = 0; i < details.mainFeatures.sensors.length; i++) {
   // let sensorInfo = ;
 console.log(details?.mainFeatures?.sensors[i]);
  }

  div.innerHTML = `
  <img src="${details.image}" class="card-img-top" alt="This is ${
    details.name
  } picture">
  <div class="card-body">

      <h5 class="card-title">Brand Name: ${details.brand}</h5>
     
      <p class="card-text"> Name:  ${details.name}</p>
      <p class="card-text">Display Size: ${details.mainFeatures.displaySize}</p>
      <p class="card-text">Storage: ${details.mainFeatures.storage}</p>
      <p class="card-text">Release Date: ${details.releaseDate}</p>
      <p class="card-text">Slug: ${details.slug}</p>
      <p class="card-text " id="sensor">Sensors: ${
        details.mainFeatures.sensors[0]
      }</p>
      <p class="card-text">Others: ${
        details?.mainFeatures?.others || "Info will provide soon"
      }</p>
     
     
   
  </div>
  `;
  phoneDetails.appendChild(div);
};
//  <p class="card-text">${details.strInstructions.slice(0, 150)}</p>
