<template>
  <div>
    <h1> Global info </h1>
    <RotateSquare5 class="loader" v-if="loading"></RotateSquare5>
    <table v-else>
      <tr><td></td><td> Confirmed </td><td> Recovered </td><td> Deaths </td></tr>
      <tr>
        <td>TOTAL</td>
        <td> {{globalData.TotalConfirmed | formatNumber}} </td>
        <td> {{globalData.TotalRecovered | formatNumber}} </td>
        <td> {{globalData.TotalDeaths | formatNumber}}</td>
      </tr>
      <tr>
        <td>NEW</td>
        <td> {{globalData.NewConfirmed | formatNumber}} </td>
        <td> {{globalData.NewRecovered | formatNumber}} </td>
        <td>  {{globalData.NewDeaths | formatNumber}} </td>
      </tr>
    </table>
    <h1> Corona virus stats by country </h1>
    <RotateSquare5 class="loader" v-if="loading"></RotateSquare5>
    <div v-else>
      <CountriesSummary :countries="countries"></CountriesSummary>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CountriesSummary from './CountriesSummary';
import RotateSquare5 from 'vue-loading-spinner/src/components/RotateSquare5';

export default {
  name: 'Home',

  components: {
    CountriesSummary,
    RotateSquare5
  },
  data: function () {
    return {
      countries: [],
      globalData: {},
      loading: true
    };
  },
  methods: {
    fetchData() {
      this.loading = true;
      axios.get(process.env.VUE_APP_BASEURL + 'summary').then((response) => {
        this.countries = response.data.Countries;
        this.globalData = response.data.Global;
        this.loading = false;
      }).catch(error => {
        this.showError(error.response.data.message);
        this.loading = false;
      })
    }
  },
  mounted() {
    this.fetchData()
  },
}
</script>

<style scoped>
table {
  font-size: 21px;
  margin: 0 auto;
}
table td {
  padding: 2px 5px;
}
</style>
