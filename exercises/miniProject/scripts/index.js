"use strict";

const cityWeatherTblBody = document.querySelector("#weather-tbl-body");
const cityDDL = document.querySelector("#city-DDL");

function buildWeatherRow(cityInfo, lat, long) {
  let row = cityWeatherTblBody.insertRow(-1);

  console.log(cityInfo);

  row.insertCell(0).innerText = cityInfo.properties.relativeLocation.properties.city;
  row.insertCell(1).innerText = cityInfo.properties.relativeLocation.properties.state;
  row.insertCell(2).innerText = lat;
  row.insertCell(3).innerText = long;
//   row.insertCell(4).innerText = cityInfo.population;
//   row.insertCell(5).innerText = cityInfo.weather;

  cityWeatherTblBody.appendChild(row);
}

function loadCityDDL() {
  let count = 0;

  let selectOption = document.createElement("option");
  selectOption.value = " ";
  selectOption.textContent = "Select City...";
  cityDDL.appendChild(selectOption);
  
  cities.sort((a,b) => a.city.localeCompare(b.city));

  for (const cityProfile of cities) {
    let option = new Option(cityProfile.city, count);
    cityDDL.appendChild(option);
    count++;
  }
}

loadCityDDL();

function displayCityDetails(cityIndex) {
  clearTable();
  let cityInfo = cities.find(function (city, index) {
    return cityIndex == index;
  });

  let cityLat = cityInfo.latitude;
  let cityLong = cityInfo.longitude;

  console.log(`City: ${cityInfo.city}, Lat: ${cityLat}, Long: ${cityLong}`);
  open(`https://api.weather.gov/points/${cityLat},${cityLong}`);
  fetch(`https://api.weather.gov/points/${cityLat},${cityLong}`)
    .then((cityDetails) => cityDetails.json())
    .then((content) => {
      return content;
    })
    .then((info) => {
      buildWeatherRow(info, cityLat, cityLong);
    });
}

function clearTable() {
  cityWeatherTblBody.innerHTML = "";
}
