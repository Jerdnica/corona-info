<template>
  <div>
    <h1>{{ this.$route.params.slug | kebabToTitle }}</h1>
    <h3> Confirmed Cases</h3>
    <Chart :cases-type="'confirmed'"></Chart>
    <h3> Recovered Cases </h3>
    <Chart :cases-type="'recovered'"></Chart>
    <h3> Deaths </h3>
    <Chart :cases-type="'deaths'"></Chart>
  </div>
</template>

<script>
import Chart from "@/components/country-details/Chart";

export default {
  name: "CountryDetails",

  components: {
    Chart
  }
}
</script>

<style scoped>
h3 {
  margin-top: 30px;
}
</style>
