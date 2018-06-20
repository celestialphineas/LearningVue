import Vue from 'vue';
import My from './my-page';
import VeeValidate from 'vee-validate';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import './assets/css/theme.scss';

Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.use(VeeValidate);

if(document.getElementById('my')) {
  new Vue({
    el: '#my',
    components: { My },
    template: '<My/>'
  });
}
