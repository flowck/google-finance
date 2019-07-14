<template>
  <div id="gf-app">
    <!-- Main Header -->
    <gf-header></gf-header>

    <section class="gf-main">
      <gf-card is-rounded>
        <!-- Card Header -->
        <div class="gf-card__header">
          <h1 class="gf-card__header__value">103,905.99</h1>
          <span class="gf-card__header__date">
            {{ new Date() | formatDate }}
          </span>
        </div>

        <!-- Dataset options -->
        <div class="gf-card__option">
          <ul class="flex flex--has-space-between">
            <li @click="filter = '7d'">7 day</li>
            <li @click="filter = '15d'">15 days</li>
            <li @click="filter = '1m'">1 month</li>
            <li @click="filter = '6m'">6 months</li>
            <li>YTD</li>
            <li @click="filter = '1y'">1 year</li>
            <li @click="filter = '5y'">5 years</li>
            <li @click="filter = null">Max</li>
          </ul>
        </div>

        <!-- Line chart -->
        <div class="gf-card__chart">
          <gf-linechart
            :options="{ width: 580, height: 180 }"
            :dataset="dataset"
          ></gf-linechart>
        </div>
      </gf-card>
    </section>
  </div>
</template>

<script>
import { max } from "d3";
import moment from "moment";
import GFHeader from "@/components/gf-header";
import data from "@/assets/datasets/data";
export default {
  name: "GoogleFinance",
  data() {
    return {
      data: [],
      filter: null
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
    transformData(data, limit) {
      const result = [];
      const length = limit || data.length;
      for (let i = 0; i < length; i++) {
        result.push({
          x: new Date(data[i].date),
          y: data[i].high
        });
      }
      return result;
    }
  },
  computed: {
    /**
     * dataset: Will organize data according to the filter rules
     */
    dataset() {
      // const { log } = console;
      if (this.filter) {
        if (this.filter[1] === "y") {
          const maxDate = max(data, d => d.date);
          const numberOfYears = parseInt(this.filter[0]);
          const yearsAgo = moment(maxDate).subtract(numberOfYears, "years");
          const filtered = data.filter(item => {
            return (
              new Date(item.date) >= new Date(yearsAgo.format()) &&
              new Date(item.date) <= new Date(maxDate)
            );
          });

          return this.transformData(filtered);
        }

        if (this.filter[1] === "m") {
          const numberOfMonths = parseInt(this.filter[0]);
          const maxDate = max(data, d => d.date);
          const monthsAgo = moment(maxDate).subtract(numberOfMonths, "months");
          const filtered = data.filter(item => {
            return (
              new Date(item.date) >= new Date(monthsAgo.format()) &&
              new Date(item.date) <= new Date(maxDate)
            );
          });
          return this.transformData(filtered);
        }

        if (this.filter[1] === "d" || this.filter[2] === "d") {
          const numberOfDays = this.filter[2]
            ? parseInt(`${this.filter[0]}${this.filter[1]}`)
            : parseInt(this.filter[0]);
          const maxDate = max(data, d => d.date);
          const daysAgo = moment(maxDate).subtract(numberOfDays, "days");
          const filtered = data.filter(item => {
            return (
              new Date(item.date) >= new Date(daysAgo.format()) &&
              new Date(item.date) <= new Date(maxDate)
            );
          });
          return this.transformData(filtered);
        }
      }

      // Default
      return this.transformData(data);
    }
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

.gf-card__chart {
  margin: 20px 0;
}

.gf-card__option {
  margin-top: 15px;

  ul {
    width: 100%;
    list-style: none;
    border-bottom: 1px solid #ddd;

    li {
      width: auto;
      font-size: 12px;
      cursor: pointer;
      padding: 0 0 12px 0;
      //border-bottom: 2px solid #333;
    }
  }
}
</style>
