<template>
  <header class="gf-header flex">
    <!-- Logo -->
    <div class="gf-header__logo">
      <img src="/images/google-logo.svg" alt="Google Finance" />
    </div>

    <!-- Search + Nav -->
    <div class="gf-header__search-nav">
      <div class="gf-header__search">
        <gf-search placeholder="INDEX"></gf-search>
      </div>
      <div class="gf-header__nav">
        <gf-nav></gf-nav>
      </div>
    </div>

    <!-- User options -->
    <div class="gf-header__user-options"></div>
  </header>
</template>

<script>
import GFSearch from "@/components/gf-search";
import GFNav from "@/components/gf-nav";
export default {
  name: "GFHeader",
  data() {
    return {};
  },
  components: {
    "gf-search": GFSearch,
    "gf-nav": GFNav
  }
};
</script>

<style lang="scss" scoped>
.gf-header {
  padding: 30px 30px 0 30px;
  border-bottom: 1px solid #ddd;
}

.gf-header__search-nav {
  width: 632px;
  margin-left: 25px;

  .gf-header__nav {
    margin-top: 20px;
  }
}

.gf-header__logo {
  margin-top: 8px;

  img {
    width: 92px;
    height: 30px;
  }
}
</style>
