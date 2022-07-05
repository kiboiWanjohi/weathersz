const btn = document.getElementById("btn");
btn.addEventListener("click", enterLocation);

function getData() {
  let lat = document.getElementById("lat").value;
  let long = document.getElementById("long").value;
  const api = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relativehumidity_2m,windspeed_120m,cloudcover_mid`;

  fetch(api)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const {
        hourly: {
          temperature_2m,
          relativehumidity_2m,
          time,
          windspeed_120m,
          cloudcover_mid,
        },
      } = data;
      return data;
    })
    .then((results) => {
      let times = results.hourly.time;
      let temps = results.hourly.temperature_2m;
      let windspeeds = results.hourly.windspeed_120m;
      let cloudcovers = results.hourly.cloudcover_mid;
      let result = document.getElementById("results");
      console.log(times);
      result.innerHTML = `<div class="table-results">
      <table class="table-weather">
      <tr>
      <th>Time</th>
      <th>Temparature</th>
      <th>Windspeeds</th>
      <th>Cloud Cover</th>
      </tr>
      <td>${times.map((time) => {
        return `<ul>${time}</ul>`;
      })}</td>
      <td>${temps.map((temp) => {
        return `<ul>${temp}</ul>`;
      })}</td>
      <td>${windspeeds.map((windspeed) => {
        return `<ul>${windspeed}</ul>`;
      })}</td>
      <td>${cloudcovers.map((cloudcover) => {
        return `<ul>${cloudcover}</ul>`;
      })}</td>
      </tr>
      </table>
      </div>`;
    })
    .catch((err) => {
      alert("Failed please reload the webpage");
    });
}

function enterLocation(e) {
  e.preventDefault();
  getData();
}
