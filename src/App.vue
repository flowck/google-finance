<template>
  <div id="gf-app">
    <!-- Main Header -->
    <gf-header></gf-header>

    <section class="gf-main">
      <gf-card is-rounded>
        <!-- Card Header -->
        <div class="gf-card__header">
          <h1 class="gf-card__header__value">103,905.99</h1>
          <span class="gf-card__header__date">{{
            new Date() | formatDate
          }}</span>
        </div>

        <!-- Tab nav -->

        <!-- Line chart -->
        <gf-linechart :dataset="data"></gf-linechart>
      </gf-card>
    </section>
  </div>
</template>

<script>
import moment from "moment";
import GFHeader from "@/components/gf-header";
import data from "@/assets/datasets/data";
export default {
  name: "GoogleFinance",
  data() {
    return {
      data: []
    };
  },
  components: {
    "gf-header": GFHeader
  },
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
  },
  filters: {
    formatDate(date) {
      return date ? moment(date).format("LL") : "";
    }
  }
};
</script>

<style lang="scss">
.gf-main {
  width: 632px;
  margin-left: 146.5px;
  // border: 1px solid red;
}

.gf-card__header__value {
  font-size: 25px;
  font-weight: 400;
}

.gf-card__header__date {
  font-size: 12px;
}
</style>
