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
  if (timeZone === "current") {
    timeZone = moment.tz.guess();
  }
  let cityTime = moment().tz(timeZone);
  let citiesElement = document.querySelector("#cities");
  let cityName = timeZone.replace("_", " ").split("/")[1];

  citiesElement.innerHTML = `<div class="row">
  <div class="col-6">
  <h2>${cityName}</h2>
    <div class="date opacity-75">${cityTime.format("dddd Do MMMM")}</div>
  </div>
  <div class="col-6">
    <div class="text-end time">
      ${cityTime.format("hh:mm")}
      <small>${cityTime.format("A")}</small>
    </div>
  </div>
</div>`;

  let h1Element = document.querySelector("h1");
  h1Element.innerHTML = `<h1 class="text-center fw-bold mb-4"><a href="/">World Clock</a></h1>`;
}

let selectedCity = document.querySelector("#city");
selectedCity.addEventListener("change", updateCity);
