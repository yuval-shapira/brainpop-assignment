import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from "@/store";

Vue.config.productionTip = false;
Vue.prototype.$activitiesType = store.activitiesType;
Vue.prototype.$defaultApi = "http://localhost:3000/activities/v1";
Vue.prototype.$secondApi = "http://localhost:3000/activities/v2";


new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
