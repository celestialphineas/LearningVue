// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './home-page';
import router from './router/home-route';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import './assets/scss/theme.scss';

Vue.config.productionTip = false;
Vue.use(VueMaterial);

if(document.getElementById('app')) {
  new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  });
}
