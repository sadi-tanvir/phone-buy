const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const showingResult = document.getElementById("showingResult");
const showDetails = document.getElementById("showDetails");
const errorMessage = document.getElementById("errorMessage");
const loadMoreBtn = document.getElementById("loadMoreBtn");




// search & fetch data from api
searchBtn.addEventListener("click", async () => {
  // get input value
  const inputValue = searchInput.value;
  if (inputValue === "") {
    // display error message
    errorMessage.classList.remove("d-none");
    errorMessage.innerText = "The search value is empty! try to write something";
    // remove previous result
    showingResult.innerHTML = ''
    // remove load more button
    loadMoreBtn.classList.add('d-none')
  } else {
    // remove error message
    errorMessage.classList.add("d-none");
    errorMessage.innerText = "";
    // remove previous result
    showingResult.innerHTML = ''
    // remove load more button
    loadMoreBtn.classList.add('d-none')
    try {
      // fetch data
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phones?search=${inputValue.toLowerCase()}`
    )
      // .then((res) => res.json())
      const dataVal = await res.json()
      const data = dataVal.data
      console.log(data);
      showPhoneData(data)
      loadMoreData(data)
    } catch (error) {
      console.log(error);
    }
  }
  //  clear input value
  // searchInput.value = "";
});



// show data to display
const showPhoneData = (phones,isTrue) => {
  if (phones.length <= 0) {
    // display error message
    errorMessage.classList.remove("d-none");
    errorMessage.innerText =
      "oops! your phone is not found, try another phone.";
  } else {
    phones.splice(0,isTrue ? phones.length : 20).forEach(phone => {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top img-fluid p-3" alt="...">
            <div class="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 class="card-title fw-bold">Name: ${phone.phone_name}</h5>
                <p class="text-muted fw-bold">brand: ${phone.brand}</p>
                <button id="" onclick="fetchPhoneDetails('${phone.slug}')" class="btn btn-danger w-75 text-capitalize text-white fw-bold">go for details</button>
            </div>
        </div>
    `;
      showingResult.appendChild(div);
    });

// show load more button
loadMoreBtn.classList.remove('d-none')
  }
};






// fetch phone details
const fetchPhoneDetails = (id) => {
    // remove previous details
    showDetails.textContent = ''
    // fetch phone details by id 
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res => res.json())
    .then(data => showPhoneDetails(data.data))
};


// show phone details
const showPhoneDetails = (phone) => {
    const div = document.createElement("div");
    div.classList.add('card')
    div.innerHTML = `
        <img src="${phone.image}" class="card-img-top img-fluid p-4" alt="...">
        <div class="card-body">
            <h5 class="card-title">Name: ${phone.name}</h5>
            <p class="card-text m-0">brand: ${phone.brand}</p>
            <p class="card-text m-0">release: ${phone.releaseDate ? phone.releaseDate : 'release date not available'}</p>
            <p class="card-text m-0">ram: 15-10-2022</p>
            <p class="card-text m-0">display size: ${phone.mainFeatures.displaySize ? phone.mainFeatures.displaySize : 'Display Size data not available'}</p>
            <p class="card-text m-0">Ram: ${phone.mainFeatures.memory ? phone.mainFeatures.memory : 'memory data not available'}</p>
            <p class="card-text m-0">storage: ${phone.mainFeatures.storage ? phone.mainFeatures.storage : 'storage data not available'}</p>
            <p class="card-text m-0">Bluetooth: ${phone.others.Bluetooth ? phone.others.Bluetooth : 'Bluetooth data not available'}</p>
            <p class="card-text m-0">GPS: ${phone.others.GPS ? phone.others.GPS : 'GPS data not available'}</p>
            <p class="card-text m-0">NFC: ${phone.others.NFC ? phone.others.NFC : 'NFC data not available'}</p>
            <p class="card-text m-0">Radio: ${phone.others.Radio ? phone.others.Radio : 'Radio data not available'}</p>
            <p class="card-text m-0">USB: ${phone.others.USB ? phone.others.USB : 'USB data not available'}</p>
            <p class="card-text m-0">WLAN: ${phone.others.WLAN ? phone.others.WLAN : 'WLAN data not available'}</p>
        </div>
        <button id="" onclick="showDetails.innerHTML = ''" class="btn btn-danger w-75 text-capitalize text-white fw-bold mx-auto my-3">hide details</button>
    `
    showDetails.appendChild(div)
}



// load more data
loadMoreBtn.addEventListener('click', async () => {
    // get input value
    const inputValue = searchInput.value;
      // remove error message
      errorMessage.classList.add("d-none");
      errorMessage.innerText = "";
      // remove previous result
      showingResult.innerHTML = ''
      try {
        // fetch data
      const res = await fetch(
        `https://openapi.programming-hero.com/api/phones?search=${inputValue.toLowerCase()}`
      )
        // .then((res) => res.json())
        const dataVal = await res.json()
        const data = dataVal.data
        console.log(data);
        showPhoneData(data, true)

      } catch (error) {
        console.log(error);
      }
    //  clear input value
    searchInput.value = "";
    // remove load more button
    loadMoreBtn.classList.add('d-none')
})