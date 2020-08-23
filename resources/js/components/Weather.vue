<template>
  <div class="container">
    <div class="current-weather col-md-12">
      <div class="row">
        <div class="col-md-4 p-2 d-flex align-items-center d-flex justify-content-center">
          <h1 class="text-uppercase text-center">
            <b>
              Warszawa
              <br />pogoda
              <span class="dot">.</span>
            </b>
          </h1>
        </div>
        <div class="col-md-4 d-flex align-items-center d-flex justify-content-center">
          <div class="current-icon">
            <img :src="'http://openweathermap.org/img/wn/' + fields.weather[0].icon + '@4x.png'" />
          </div>
        </div>
        <div class="col-md-4 p-2 d-flex align-items-center d-flex justify-content-center">
          <div class="current-conditions">
            <div class="temp">
              <b>{{ fields.main.temp }} °C</b>
            </div>
            {{ fields.weather[0].description }}
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-12 font-weight-bold current-more-info">
      <div class="row">
        <div
          class="col-md-4 p-1 d-flex justify-content-center"
        >wilgotność: {{ fields.main.humidity }}</div>
        <div class="col-md-4 p-1 d-flex justify-content-center">wiatr: {{ }}</div>
        <div class="col-md-4 p-1 d-flex justify-content-center">zachmurzenie: {{ }}</div>
      </div>
    </div>
    <div class="actions text-center">
      <p>
        Ostatnia aktualizacja
        <b>
          <br />
          <h4>{{ lastUpdate }}</h4>
        </b>
      </p>
    </div>
  </div>
</template>

<script>
const API_KEY = "4bc257cab658657dc3e0067d35b1e9ee";
const URL =
  "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=Warsaw&units=metric&APPID=" +
  API_KEY +
  "&lang=pl";
const CACHE_EXPIRE = 1 * 60 * 60 * 1000;

export default {
  data() {
    return {
      lastUpdate: "",
      fields: {
        main: {},
        weather: [
          {
            icon: "03d",
          },
        ],
      },
    };
  },

  methods: {
    getWeather() {
      const expireTime = new Date().getTime() + CACHE_EXPIRE;
      localStorage.setItem("timestamp", expireTime);
      axios
        .get(URL)
        .then((response) => {
          this.fields = response.data;
          localStorage.setItem("weather", JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getWeatherFromCache() {
      this.fields = JSON.parse(localStorage.getItem("weather"));
    },
    formatTime(timestamp) {
      return new Date(timestamp * 1000).toLocaleTimeString('pl-PL');
    }

  },
  mounted() {
    this.lastUpdate = this.formatTime(localStorage.getItem("timestamp"));
    let now = new Date().getTime();

    (localStorage.getItem("weather") === null || now >= localStorage.timestamp)
    ? this.getWeather()
    : this.getWeatherFromCache()
  },
};
</script>