<template>
  <div id="app">
    <gf-card is-rounded>
      <!-- Header -->
      <div class="gf-card__header">
        <h1 class="gf-card__header__value">103,905.99</h1>
        <span class="gf-card__header__date">{{ new Date() }}</span>
      </div>

      <!-- Tab nav -->

      <!-- Line chart -->
      <gf-linechart :dataset="data"></gf-linechart>
    </gf-card>
  </div>
</template>

<script>
import data from "@/assets/datasets/data";
export default {
  name: "GoogleFinance",
  data() {
    return {
      data: []
    };
  },
  components: {},
  methods: {
    /**
     * transformData: It will transform the dataset
     *
     * @param {object} data
     * @returns {array}
     */
    transformData(data, limit = 100) {
      const result = [];
      for (let i = 0; i < limit; i++) {
        result.push({
          x: new Date(data[i].date),
          y: data[i].high
        });
      }
      return result;
    }
  },
  created() {
    this.data = this.transformData(data);
  }
};
</script>

<style lang="scss"></style>
