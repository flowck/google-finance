<template>
  <div id="gf-app">
    <!-- Main Header -->
    <gf-header></gf-header>

    <section class="gf-main">
      <!-- Chart -->
      <gf-card is-rounded>
        <!-- Card Header -->
        <div class="gf-card__header">
          <h1 class="gf-card__header__value">{{ maxValue }}$</h1>
          <span class="gf-card__header__date">
            {{ new Date() | formatDate }}
          </span>
        </div>

        <!-- Dataset options -->
        <div class="gf-card__option">
          <ul class="flex flex--has-space-between">
            <li @click="filter = '7d'">7 days</li>
            <li @click="filter = '15d'">15 days</li>
            <li @click="filter = '1m'">1 month</li>
            <li @click="filter = '6m'">6 months</li>
            <!-- <li>YTD</li> -->
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

      <div class="gf-main__news">
        <div class="gf-main__news__title">
          <h1>News</h1>
        </div>

        <div v-if="news.length > 0">
          <gf-news
            class="gf-main__news__post"
            radius="8"
            v-for="post in news"
            :key="post.id"
            :title="post.title"
            :date="post.publishedAt"
            :thumbnail="post.urlToImage"
            :source="post.source.name"
          >
          </gf-news>
        </div>
      </div>
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
      maxValue: 0,
      news: [],
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
    },
    async getNews() {
      try {
        // Exposing API KEY
        const urlParams = `?country=us&apiKey=${process.env.VUE_APP_K}`;
        const url = `https://newsapi.org/v2/top-headlines${urlParams}`;
        const res = await fetch(url);
        this.news = await res.json();
        this.news = this.news.articles.slice(0, 3);
        console.log(this.news);
      } catch (err) {
        console.log(err);
      }
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
      return date ? moment(date).format("MMM DD, HH:MM") : "";
    }
  },
  created() {
    this.maxValue = max(data, d => d.high).toFixed(2);
    // Get news
    this.getNews();
  }
};
</script>

<style lang="scss">
.gf-main {
  width: 632px;
  margin: 20px 0 0 146.5px;
}

.gf-card__header__value {
  color: #111;
  font-size: 25px;
}

.gf-card__header__date {
  font-size: 12px;
  font-family: "Roboto-Light";
}

.gf-card__chart {
  margin: 20px 0;
}

.gf-main__news {
  margin-top: 30px;

  .gf-main__news__title {
    color: #111;
    font-size: 16px;
    font-weight: normal;
    margin: 0 0 15px 15px;
  }

  .gf-main__news__post {
    margin-bottom: 8px;
  }
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
      font-family: "Roboto-Light";
    }
  }
}
</style>
