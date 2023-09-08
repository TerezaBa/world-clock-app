function updateTime() {
  let loadedCities = [
    {
      city: "Prague",
      zone: "Europe/Prague",
    },
    {
      city: "Bengaluru",
      zone: "Asia/Kolkata",
    },
  ];

  let citiesElement = document.querySelector("#cities");
  citiesElement.innerHTML = "";

  loadedCities.forEach(function (loadedCity) {
    let timeZone = moment().tz(loadedCity.zone);

    let citiesHTML = `<div class="d-flex justify-content-between pt-4">
            <div class="city">
              <h2>${loadedCity.city}</h2>
              <div class="date opacity-75">${timeZone.format(
                "dddd Do MMMM"
              )}</div>
            </div>
            <div class="text-end time">${timeZone.format(
              "hh:mm:ss"
            )} <small>${timeZone.format("A")}</small></div>
          </div>`;
    citiesElement.innerHTML += citiesHTML;
  });
}

updateTime();
const myInterval = setInterval(updateTime, 1000);

function updateCity(event) {
  clearInterval(myInterval);
  let timeZone = event.target.value;
  if (timeZone === "current") {
    timeZone = moment.tz.guess();
  }
  let cityTime = moment().tz(timeZone);
  let citiesElement = document.querySelector("#cities");
  let cityName = timeZone.replace("_", " ").split("/")[1];
  if (timeZone === "America/Los_Angeles") {
    cityName = "San Francisco";
  }
  citiesElement.innerHTML = `<div class="d-flex justify-content-between pt-4">
    <div class="city">
      <h2>${cityName}</h2>
      <div class="date opacity-75">${cityTime.format("dddd Do MMMM")}</div>
    </div>
    <div class="text-end time">
      ${cityTime.format("hh:mm")}
      <small>${cityTime.format("A")}</small>
    </div>
  </div>`;

  let h1Element = document.querySelector("h1");
  h1Element.innerHTML = `<h1 class="text-center fw-bold mb-4"><a href="/">World Clock</a></h1>`;
}

let selectedCity = document.querySelector("#city");
selectedCity.addEventListener("change", updateCity);

let globalCityName = "Tokyo";

function showTime(response, city) {
  console.log(response, city);

  console.log(response.timestamp);
  let timestamp = moment.unix(response.timestamp);
  clearInterval(myInterval);
  document.querySelector(
    "#cities"
  ).innerHTML = `<div class="d-flex justify-content-between pt-4">
    <div class="city">
      <h2>${city}</h2>
      <div class="date opacity-75">${timestamp.format("dddd Do MMMM")}</div>
    </div>
    <div class="text-end time">
      ${timestamp.format("hh:mm")}
      <small>${timestamp.format("A")}</small>
    </div>
    </div>`;
}

function getTimezone(coordinates, city) {
  let lat = coordinates.latitude;
  let lon = coordinates.longitude;
  let cityName = city;
  //globalCityName = city;

  //Geonames
  // let apiUrl = `http://api.geonames.org/timezoneJSON?lat=${response.data.coordinates.latitude}&lng=${response.data.coordinates.longitude}&username=terezaba`;
  // console.log(apiUrl);
  // axios.get(apiUrl).then(showTime);

  // // TimezoneDB API
  let apiKey = "OA2X7WH81GI9";
  let apiUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lon}`;
  console.log(apiUrl);

  axios.get(apiUrl).then((response) => {
    showTime(response.data, cityName);
  });
}

function handleCoordResponse(response) {
  let coordinates = response.data.coordinates;
  let city = response.data.city;
  // console.log(response.data[0]);
  // let lat = response.data[0].lat;
  // let lon = response.data[0].lon;
  // console.log(lat, lon);
  console.log(coordinates, city);
  getTimezone(coordinates, city);
}

function getCoord(cityName) {
  // SheCodes weather API
  let apiKey = "b36tedd42903o5c6c68a4a10b4b1953f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}`;

  console.log(apiUrl);
  axios.get(apiUrl).then(handleCoordResponse);

  // LocationIQ
  // let apiKey = "pk.34a2da02bf495a4c3065a77d06788edf";
  // let apiUrl = `https://eu1.locationiq.com/v1/search?key=${apiKey}&q=${cityName}&format=json`;
  // axios.get(apiUrl).then(handleCoordResponse);
}

function handleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#search-area").value;
  getCoord(city);
}

document.querySelector("#search-form").addEventListener("submit", handleSubmit);
