import Vue from "vue";
import App from "./App.vue";
// Global styles
import "@/assets/styles/base.scss";
// Global components
import gfCard from "@/components/gf-card";

Vue.config.productionTip = false;
Vue.component("gf-card", gfCard);

new Vue({
  render: h => h(App)
}).$mount("#app");
