"use strict";

const cityWeatherTblBody = document.querySelector("#weather-tbl-body");
const cityDDL = document.querySelector("#city-DDL");
let cityWeatherURL;

function buildWeatherRow(forecastInfo) {
  let row = cityWeatherTblBody.insertRow(-1);

  console.log(forecastInfo);

  row.insertCell(0).innerText = forecastInfo.name;
  row.insertCell(1).innerText = `${forecastInfo.temperature} ${forecastInfo.temperatureUnit}`;
  row.insertCell(2).innerText = `${forecastInfo.windSpeed} ${forecastInfo.windDirection}`;
  if (!forecastInfo.probabilityOfPrecipitation.value) {
    row.insertCell(3).innerText = `0%`;
  } else {
      row.insertCell(3).innerText = `${forecastInfo.probabilityOfPrecipitation.value}%`;
  }
  row.insertCell(4).innerText = forecastInfo.shortForecast;
  row.insertCell(5).innerText = forecastInfo.detailedForecast;

  cityWeatherTblBody.appendChild(row);
}

function loadCityDDL() {
  let count = 0;

  let selectOption = document.createElement("option");
  selectOption.value = " ";
  selectOption.textContent = "Select City...";
  cityDDL.appendChild(selectOption);

  cities.sort((a, b) => a.city.localeCompare(b.city));

  for (const cityProfile of cities) {
    let option = new Option(cityProfile.city, count);
    cityDDL.appendChild(option);
    count++;
  }
}

loadCityDDL();


function fetchCityDetails(cityIndex) {
  let cityInfo = cities.find(function (city, index) {
    return cityIndex == index;
  });

  let cityLat = cityInfo.latitude;
  let cityLong = cityInfo.longitude;

  fetch(`https://api.weather.gov/points/${cityLat},${cityLong}`)
    .then((cityDetails) => cityDetails.json())
    .then((content) => {
      return content;
    })
    .then((info) => {
      cityWeatherURL = info.properties.forecast;
      console.log(cityWeatherURL);
      fetchForecastDetails(cityWeatherURL);
    });
}

function loadDetails(filteredList) {
    clearTable();
    for (const city of filteredList) {
        buildWeatherRow(city);
    }
}

function fetchForecastDetails(url) {
    fetch(url)
    .then((weatherDetails) => weatherDetails.json())
    .then((content) => {
        loadDetails(content.properties.periods);
    })
}

function clearTable() {
  cityWeatherTblBody.innerHTML = "";
}
