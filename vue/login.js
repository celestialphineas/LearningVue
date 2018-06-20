import Vue from 'vue';
import Login from './login-page';
import VeeValidate from 'vee-validate';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import './assets/css/theme.scss';

Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.use(VeeValidate);

if(document.getElementById('login')) {
  new Vue({
    el: '#login',
    components: { Login },
    template: '<Login/>'
  });
}
