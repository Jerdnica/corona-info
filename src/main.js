import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import router from './router';
import App from "@/App";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  components: { App }
}).$mount('#app');

Vue.use(VueSweetalert2);
