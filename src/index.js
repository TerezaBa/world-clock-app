setInterval(function () {
  let pragueElement = document.querySelector("#prague");
  let pragueDate = pragueElement.querySelector(".date");
  let pragueTime = pragueElement.querySelector(".time");
  let pragueZone = moment().tz("Europe/Prague");

  pragueDate.innerHTML = pragueZone.format("dddd Do MMMM");
  pragueTime.innerHTML = pragueZone.format("hh:mm:ss [<small>]A[</small>]");

  let bengaluruElement = document.querySelector("#bengaluru");
  let bengaluruDate = bengaluruElement.querySelector(".date");
  let bengaluruTime = bengaluruElement.querySelector(".time");
  let bengaluruZone = moment().tz("Asia/Kolkata");

  bengaluruDate.innerHTML = bengaluruZone.format("dddd Do MMMM");
  bengaluruTime.innerHTML = bengaluruZone.format(
    "hh:mm:ss [<small>]A[</small>]"
  );
}, 1000);
