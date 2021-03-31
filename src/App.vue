<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Home from './components/home/Home';
import CountryDetails from "@/components/country-details/Chart";
import Vue from 'vue';

export default {
  name: 'App',
  components: {
    Home,
    CountryDetails
  }
}

Vue.mixin({
  methods: {
    showError: function (message) {
      this.$swal.fire({
        position: 'top-end',
        showConfirmButton: false,
        icon: 'error',
        text: message,
        timer: 2500,
        timerProgressBar: true,
      })
    },
  },
});

Vue.filter('kebabToTitle', function (str) {
  return str.split('-').map(function (item) {
    return item.charAt(0).toUpperCase() + item.substring(1);
  }).join(' ');
});

Vue.filter("formatNumber", function (value) {
  return new Intl.NumberFormat().format(value);
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 1024px;
  margin: 0 auto;
}

.loader {
  margin: 80px auto;
  transform: scale(2);
}
</style>
