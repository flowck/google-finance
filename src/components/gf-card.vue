<template>
  <article :class="cssClasses" :style="`border-radius: ${radius}px;`">
    <slot></slot>
  </article>
</template>

<script>
export default {
  name: "GoogleFinanceCard",
  data() {
    return {
      cssClasses: {
        "gf-card": true,
        "is-rounded": false
      },
      styles: {}
    };
  },
  props: {
    "is-rounded": {
      type: Boolean,
      default: false
    },
    radius: {
      type: String
    }
  },
  mounted() {
    // Set classes
    this.cssClasses["is-rounded"] = this.$props.isRounded;
  }
};
</script>

<style lang="scss" scoped>
$card-border-color: #ddd;
.gf-card {
  padding: 15px;
  border: 1px solid $card-border-color;

  &.is-rounded {
    border-radius: 3px;
  }
}
</style>
