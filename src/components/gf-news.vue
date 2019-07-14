<template>
  <div class="gf-news">
    <gf-card is-rounded class="flex flex--has-space-between">
      <div>
        <div class="gf-news__title">
          <h1>{{ title }}</h1>
        </div>
        <div class="gf-news__meta">
          {{ date | formatDate }}
        </div>
      </div>
      <div class="gf-news__thumbnail">
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
      type: Date,
      required: true
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
    font-size: 12px;
  }

  .gf-news__thumbnail {
    img {
      width: 150px;
    }
  }
}
</style>
