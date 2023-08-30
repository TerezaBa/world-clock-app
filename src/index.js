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
