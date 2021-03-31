<template>
  <div>
    <div class="range-wrapper">
      <DxRangeSelector
          class="range-selector"
          v-model="initialRange"
          @value-changed="onChangeDate"
      >
        <DxMargin :top="50"/>
        <DxScale
            :start-value="new Date(2019, 11, 31)"
            :end-value="new Date()"
        >
          <DxMinorTick :visible="false"/>
          <DxMinorTickInterval :days="1"/>
          <DxTickInterval :weeks="1"/>
          <DxMinRange :weeks="1"/>
          <DxMaxRange :months="1"/>
        </DxScale>
        <DxSliderMarker format="monthAndDay"/>
      </DxRangeSelector>
    </div>
    <RotateSquare5 class="loader" v-if="loading"></RotateSquare5>
    <DxChart v-else
             :data-source="dailyReport"
    >
      <DxSeries
          argument-field="Date"
          value-field="Cases"
          type="bar"
          :name="casesType"
          color="#ffaa66"
      />
      <DxArgumentAxis>
        <DxLabel :customize-text="customizeLabelText"/>
      </DxArgumentAxis>
      <DxTooltip
          :enabled="true"
      />
    </DxChart>
  </div>
</template>

<script>
import DxChart, {
  DxSeries, DxTooltip, DxArgumentAxis, DxLabel,
} from 'devextreme-vue/chart';
import {
  DxRangeSelector,
  DxMargin,
  DxScale,
  DxMinorTick,
  DxMinorTickInterval,
  DxTickInterval,
  DxMinRange,
  DxMaxRange,
  DxSliderMarker
} from 'devextreme-vue/range-selector';
import axios from "axios";
import RotateSquare5 from 'vue-loading-spinner/src/components/RotateSquare5';

export default {
  name: "Chart",
  components: {
    DxChart,
    DxSeries,
    DxTooltip,
    DxArgumentAxis,
    DxLabel,
    DxRangeSelector,
    DxMargin,
    DxScale,
    DxMinorTick,
    DxMinorTickInterval,
    DxTickInterval,
    DxMinRange,
    DxMaxRange,
    DxSliderMarker,
    RotateSquare5
  },
  props: ['casesType'],

  data: function () {
    // covid19api.com ima limit kod pojedinih drzava, mora se izabrati range manji od nedelju dana. Ovdje forsiram
    // slajder da bude u tom rangeu, na zalost.
    const today = new Date();
    let weekBefore = new Date();
    weekBefore.setDate(weekBefore.getDate() - 6);
    return {
      loading: true,
      dailyReport: [],
      initialRange: [weekBefore, today],
      range: [weekBefore, today]
    }
  },

  methods: {
    fetchData() {
      this.loading = true;
      axios.get(process.env.VUE_APP_BASEURL +
          `country/${this.$route.params.slug}/status/${this.casesType}?${this.getRangeParams()}`
      ).then((response) => {
        this.dailyReport = response.data;
        this.loading = false;
      }).catch(error => {
        this.showError(error.response.data.message);
        this.loading = false;
      })
    },

    onChangeDate(e) {
      this.range = e.value;
      this.fetchData();
    },

    getRangeParams() {
      return `from=${this.format(this.range[0])}&to=${this.format(this.range[1])}`;
    },

    format(date) {
      const day = ('0' + date.getDate()).slice(-2);
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();

      return year + '-' + month + '-' + day;
    },

    customizeLabelText({valueText}) {
      const date = new Date(valueText);
      return `${date.getDate()}/${date.getMonth() + 1} ${date.getFullYear()}`;
    }
  },

  mounted() {
    this.fetchData();
    let container = this.$el.querySelector(".range-wrapper");
    container.scrollLeft = container.scrollWidth;
  }
}
</script>

<style scoped>
.range-selector {
  height: 250px;
  /* slajder sam morao prosiriti zbog gore navedenog ogranicenja */
  width: 5200px;
}

.range-wrapper {
  overflow-x: scroll;
}
</style>
