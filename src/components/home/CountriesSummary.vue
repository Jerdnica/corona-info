<template>
  <div>
    <DxDataGrid :data-source="countries"
                :allow-column-reordering="true"
                :selection="{ mode: 'single' }"
                @selection-changed="onSelectionChanged"
                :hover-state-enabled="true">
      <DxSearchPanel
          :visible="true"
          :highlight-case-sensitive="true" />
      <DxColumn data-field="Country"/>
      <DxColumn data-field="TotalConfirmed" sort-order="desc"/>
      <DxColumn data-field="TotalRecovered"/>
      <DxColumn data-field="TotalDeaths"/>
      <DxColumn data-field="NewConfirmed"/>
      <DxColumn data-field="NewRecovered"/>
      <DxColumn data-field="NewDeaths"/>
    </DxDataGrid>
  </div>
</template>

<script>
import { DxDataGrid, DxColumn, DxSearchPanel } from 'devextreme-vue/data-grid';
import router from "@/router";

export default {
  name: "CountriesSummary",
  props: ['countries'],
  components: {
    DxDataGrid,
    DxColumn,
    DxSearchPanel
  },
  methods: {
    onSelectionChanged({ selectedRowsData }) {
      router.push(`country/${selectedRowsData[0]['Slug']}`);
    }
  }
}
</script>

<style scoped>

</style>
