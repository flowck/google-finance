import Vue from "vue";
import App from "./App.vue";
// Global styles
import "@/assets/styles/base.scss";
// Global components
import gfCard from "@/components/gf-card";
import gfLineChart from "@/components/gf-linechart";

Vue.config.productionTip = false;
// Register components
Vue.component("gf-card", gfCard);
Vue.component("gf-linechart", gfLineChart);

new Vue({
  render: h => h(App)
}).$mount("#app");
