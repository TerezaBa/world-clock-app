function updateTime() {
  // Prague
  let pragueElement = document.querySelector("#prague");
  let pragueDate = pragueElement.querySelector(".date");
  let pragueTime = pragueElement.querySelector(".time");
  let pragueZone = moment().tz("Europe/Prague");
  pragueDate.innerHTML = pragueZone.format("dddd Do MMMM");
  pragueTime.innerHTML = pragueZone.format("hh:mm:ss [<small>]A[</small>]");

  // Bengaluru
  let bengaluruElement = document.querySelector("#bengaluru");
  let bengaluruDate = bengaluruElement.querySelector(".date");
  let bengaluruTime = bengaluruElement.querySelector(".time");
  let bengaluruZone = moment().tz("Asia/Kolkata");
  bengaluruDate.innerHTML = bengaluruZone.format("dddd Do MMMM");
  bengaluruTime.innerHTML = bengaluruZone.format(
    "hh:mm:ss [<small>]A[</small>]"
  );
}

updateTime();
setInterval(updateTime, 1000);

function updateCity(event) {
  let timeZone = event.target.value;
  let cityName = timeZone.replace("_", " ").split("/")[1];
  let cityTime = moment().tz(timeZone);
  let citiesElement = document.querySelector("#cities");

  citiesElement.innerHTML = `<div class="row">
  <h2>${cityName}</h2>
  <div class="col-6">
    <div class="date">${cityTime.format("dddd Do MMMM")}</div>
  </div>
  <div class="col-6">
    <div class="time">
      ${cityTime.format("hh:mm:ss")}
      <small>${cityTime.format("A")}</small>
    </div>
  </div>
</div>`;
}

let selectedCity = document.querySelector("#city");
selectedCity.addEventListener("change", updateCity);
