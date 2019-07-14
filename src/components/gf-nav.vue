<template>
  <nav class="gf-nav">
    <ul class="flex">
      <li>
        All
      </li>
      <li class="active">Finance</li>
      <li>News</li>
      <li>Images</li>
      <li>Videos</li>
      <li>More</li>
      <li>Settings</li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "GFNav",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.gf-nav {
  ul {
    height: 30px;
    // border: 1px solid red;
    list-style: none;
    margin-left: 11px;

    li {
      padding: 0 10px;
      font-size: 12.5px;

      &.active {
        color: #1a73e8;
        border-bottom: 3px solid #1a73e8;
      }
    }
  }
}
</style>
