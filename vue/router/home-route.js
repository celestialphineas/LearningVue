import Vue from 'vue';
import Router from 'vue-router';
import TodaysTask from '@/components/tabs/todays-task.vue';
import Discover from '@/components/tabs/discover.vue';
import Pinned from '@/components/tabs/pinned.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TodaysTask',
      component: TodaysTask
    },
    {
      path: '/todays-task',
      name: 'TodaysTask',
      component: TodaysTask
    },
    {
      path: '/discover',
      name: 'Discover',
      component: Discover
    },
    {
      path: '/pinned',
      name: 'Pinned',
      component: Pinned
    }
  ]
});
