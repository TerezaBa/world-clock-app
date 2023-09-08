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
    {
      city: "Tokyo",
      zone: "Asia/Tokyo",
    },
    {
      city: "San Francisco",
      zone: "America/Los_Angeles",
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

function showTime(response, city) {
  clearInterval(myInterval);

  let currentTime = moment(response.formatted);
  document.querySelector(
    "#cities"
  ).innerHTML = `<div class="d-flex justify-content-between pt-4">
    <div class="city">
      <h2>${city}</h2>
      <div class="date opacity-75">${currentTime.format("dddd Do MMMM")}</div>
    </div>
    <div class="text-end time">
      ${currentTime.format("hh:mm")}
      <small>${currentTime.format("A")}</small>
    </div>
    </div>`;

  let h1Element = document.querySelector("h1");
  h1Element.innerHTML = `<h1 class="text-center fw-bold mb-4"><a href="/">World Clock</a></h1>`;
}

function getTimezone(response) {
  let lat = response.data.coordinates.latitude;
  let lon = response.data.coordinates.longitude;
  let cityName = response.data.city;

  let apiKey = "OA2X7WH81GI9";
  let apiUrl = `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lon}`;
  axios.get(apiUrl).then((response) => {
    showTime(response.data, cityName);
  });
}

function getCoord(cityName) {
  let apiKey = "b36tedd42903o5c6c68a4a10b4b1953f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}`;
  axios.get(apiUrl).then(getTimezone);
}

function handleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#search-area").value;
  getCoord(city);
}

document.querySelector("#search-form").addEventListener("submit", handleSubmit);
