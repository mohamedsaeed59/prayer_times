
let selectCity = document.getElementById("select-cityes");
let selectNow = document.getElementById("city-now");
let fajr = document.getElementById("fahr-time");
let dhuhr = document.getElementById("sihr-time");
let asr = document.getElementById("asr-time");
let maghrab = document.getElementById("makhreb-time");
let isha = document.getElementById("ashaa-time");
let date = document.getElementById("data-day");

let cityes = [
    { aribcName: "القاهره", isoName: "Al Qāhirah" },
    { aribcName: "الاسكندريه", isoName: "Al Iskandarīyah" },
    { aribcName: "اسوان", isoName: "Aswān" },
    { aribcName: "الاقصر", isoName: "Al Uqşur" },
  ];
  
  for (const city of cityes) {
    let content = `   
    <option> ${city.aribcName}</option>
    `;
    selectCity.innerHTML += content;
  }
  
  selectCity.addEventListener("change", function () {
    selectNow.innerHTML = this.value;
      let cityName = "";
  
      for (const city of cityes) {
        if (city.aribcName == this.value) {
          cityName = city.isoName;
        }
      }
      getTimingsOfCityes(cityName);
    });
  
  function getTimingsOfCityes(cityName) {
    let mainParms = {
      country: "EG",
      city: cityName,
      date: "16/8/2023",
    };
  
    axios
      .get("http://api.aladhan.com/v1/timingsByCity", {
        params: mainParms,
      })
      .then(function (response) {
        const timings = response.data.data.timings;
        fajr.innerHTML = response.data.data.timings.Fajr;
        dhuhr.innerHTML = response.data.data.timings.Dhuhr;
        asr.innerHTML = response.data.data.timings.Asr;
        maghrab.innerHTML = response.data.data.timings.Maghrib;
        isha.innerHTML = response.data.data.timings.Isha;

        const readableData = response.data.data.date.readable;
        const weekDay = response.data.data.date.hijri.weekday.ar;
        date.innerHTML = weekDay + " " + readableData;
      })
      .catch(function (error) {
        console.log(error);
      });
}
getTimingsOfCityes("Al Qāhirah");

window.onload = () => {
    selectNow.innerHTML = selectCity.value;
}