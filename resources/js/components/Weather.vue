<template>
  <div class="container">
    <div class="current-weather col-md-12 ">
      <div class="row">
        <div class="col-md-4 p-2 d-flex align-items-center d-flex justify-content-center">
          <h1 class="text-uppercase text-center">
            <b>
              Warszawa
              <br />pogoda<span class="dot">.</span>
            </b>
          </h1>
        </div>
        <div class="col-md-4 d-flex align-items-center d-flex justify-content-center">
          <div class="current-icon">
            <img :src="'http://openweathermap.org/img/wn/' + icon  +'@4x.png'">
          </div>
        </div>
        <div class="col-md-4 p-2 d-flex align-items-center d-flex justify-content-center">
          <div class="current-conditions">
            <div class="temp">
              <b>{{ currentTemp }} °C</b>
            </div>
            {{ description }}
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-12 font-weight-bold current-more-info">
      <div class="row">
        <div class="col-md-4 p-1 d-flex justify-content-center">wilgotność: {{ humidity }}</div>
        <div class="col-md-4 p-1 d-flex justify-content-center">wiatr: {{ windSpeed }}</div>
        <div class="col-md-4 p-1 d-flex justify-content-center">zachmurzenie: {{ cloudy }}</div>
      </div>
    </div>
    <div class="actions text-center">
      <p>
        Ostatnia aktualizacja
        <b>
          <br />
          <h4>{{ this.lastUpdate }}</h4>
        </b>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      apiKey: "4bc257cab658657dc3e0067d35b1e9ee",
      url: "",
      lastUpdate: "",
      currentTemp: "",
      description: "",
      icon: "",
      windSpeed: "",
      humidity: "",
      cloudy: ""
    };
  },

  methods: {
    getWeather() {
      let expire = { timestamp: new Date().getTime() + 1 * 60 * 60 * 1000 };
      localStorage.setItem("timestamp", JSON.stringify(expire));
      this.url =
        "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=Warsaw&units=metric&APPID=" +
        this.apiKey +
        "&lang=pl";
      axios
        .get(this.url)
        .then((response) => {
          localStorage.setItem("currentTemp", response.data.main.temp);
          localStorage.setItem("description",response.data.weather[0].description);
          localStorage.setItem("icon", response.data.weather[0].icon);
          localStorage.setItem("windSpeed", response.data.wind.speed + "m/s");
          localStorage.setItem("humidity", response.data.main.humidity + "%");
          localStorage.setItem("cloudy", response.data.clouds.all);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    assignWeather() {
      this.currentTemp = localStorage.currentTemp;
      this.description = localStorage.description;
      this.icon = localStorage.icon;
      this.windSpeed = localStorage.windSpeed;
      this.humidity = localStorage.humidity;
      this.cloudy = localStorage.cloudy;
    },
  },
  beforeMount() {
    let object = JSON.parse(localStorage.getItem("timestamp"));
    let dateString = object.timestamp;
    let now = new Date().getTime().toString();
    let minDiff = dateString - now;
    this.lastUpdate = Math.round(((minDiff % 86400000) % 3600000) / 60000);

    let date = new Date(dateString * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();

    this.lastUpdate = hours + " : " + minutes.substr(-2) + " : " + seconds.substr(-2);
    if (now > dateString) {
      this.getWeather();
      this.assignWeather();
    } else {
      this.assignWeather();
    }
  },
};
</script>