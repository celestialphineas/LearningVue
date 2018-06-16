import Vue from 'vue';
import Login from './Login';
import VeeValidate from 'vee-validate';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.use(VeeValidate);

new Vue({
  el: '#login',
  components: { Login },
  template: '<Login/>'
});
