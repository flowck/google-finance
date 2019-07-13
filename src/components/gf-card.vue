<template>
  <article :class="cssClasses">
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
      }
    };
  },
  props: {
    "is-rounded": {
      type: Boolean,
      default: false
    }
  },
  mounted() {
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
