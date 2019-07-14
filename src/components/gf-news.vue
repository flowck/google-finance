<template>
  <div class="gf-news">
    <gf-card is-rounded :radius="radius" class="flex flex--has-space-between">
      <div>
        <div class="gf-news__title">
          <a href="#">
            <h1>{{ title }}</h1>
          </a>
        </div>
        <div class="gf-news__meta">{{ source }} · {{ date | formatDate }}</div>
      </div>
      <div class="gf-news__thumbnail flex flex--centered-y">
        <img :src="thumbnail" :alt="title" />
      </div>
    </gf-card>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "GFNews",
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    radius: {
      type: String
    },
    source: {
      type: String
    }
  },
  filters: {
    formatDate(date) {
      return date ? moment(date).fromNow() : "";
    }
  }
};
</script>

<style lang="scss" scoped>
.gf-news {
  .gf-news__meta {
    font-size: 13px;
    margin-top: 10px;
  }

  .gf-news__title {
    h1 {
      font-weight: normal;
    }

    a {
      color: #1a0dab;
      font-size: 16px;
      text-decoration: none;
    }
  }

  .gf-news__thumbnail {
    img {
      width: 150px;
      border-radius: 3px;
    }
  }
}

.gf-news:hover a {
  text-decoration: underline;
}
</style>
