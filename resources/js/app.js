require('./bootstrap');

import Vue  from 'vue'

Vue.component('weather-index', 
    require('./components/Weather.vue').default)

const app = new Vue({
    el: '#app'
});