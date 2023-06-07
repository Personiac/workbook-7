"use strict";

const cityWeatherTblBody = document.querySelector("#weather-tbl-body");
const cityDDL = document.querySelector("#city-DDL");

function buildWeatherRow(city) {
  let row = cityWeatherTblBody.insertRow(-1);

  row.insertCell(0).innerText = city.city;
  row.insertCell(1).innerText = city.latitude;
  row.insertCell(2).innerText = city.longitude;
  row.insertCell(3).innerText = city.population;
  row.insertCell(4).innerText = city.weather;

  cityWeatherTblBody.appendChild(row);
}

function loadCityDDL() {
  let count = 0;

  let selectOption = document.createElement("option");
  selectOption.value = " ";
  selectOption.textContent = "Select City...";
  cityDDL.appendChild(selectOption);

  for (const cityProfile of cities) {
    let option = new Option(cityProfile.city, count);
    cityDDL.appendChild(option);
    count++;
  }
}

loadCityDDL();

function findCityWeather(cityProfile) {
  let cityName = cityProfile.city;
  let cityLat = cityProfile.latitude;
  let cityLong = cityProfile.longitude;

  fetch(`https://api.weather.gov/points/${cityLat},${cityLong}`)
    .then((cityWeather) => cityWeather.json())
    .then((content) => {
      return content;
    })
    .then((info) => {
      const cityInfo = {
        city: cityName,
        latitude: cityLat,
        longitude: cityLong,
        population: cityProfile.population,
        weather: info.properties.forecast
      };
      buildWeatherRow(cityInfo);
    });
}
