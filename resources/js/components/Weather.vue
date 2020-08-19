<template>
  <div>{{ currentTemp }}</div>
</template>

<script>
export default {
  data() {
    return {
      currentTemp: "",
    };
  },
  methods: {
    getWeather() {
      let url =
        "http://api.openweathermap.org/data/2.5/weather?q=Warsaw&?units=metric&APPID=4bc257cab658657dc3e0067d35b1e9ee&lang=pl";
      axios
        .get(url)
        .then((response) => {
          this.currentTemp = response.data.main.temp;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    beforeMount() {
      this.getWeather();
    },
  },
};
</script>