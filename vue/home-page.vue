<template>
  <div id="app" class="page-container">
    <md-app md-waterfall md-mode="fixed-last">
      <md-app-toolbar class="md-large md-dense md-primary" style="position:fixed">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" @click="ui.menuVisible = !ui.menuVisible">
              <md-icon>menu</md-icon>
            </md-button>

            <span class="md-title">memoria</span>
          </div>

          <div class="md-toolbar-section-end">
            <md-menu md-direction="bottom-end">
              <md-button class="md-icon-button" md-menu-trigger>
                <md-icon>more_vert</md-icon>
              </md-button>
              <md-menu-content>
                <md-menu-item @click="logout"><md-icon>exit_to_app</md-icon>Log out</md-menu-item>
              </md-menu-content>
            </md-menu> 
          </div>
        </div>

        <div class="md-toolbar-row" style="margin:0 12px;">
          <md-tabs class="md-primary" :md-active-tab="ui.tab">
            <md-tab id="tab-todays-task" md-label="Today's task" to="/todays-task"></md-tab>
            <md-tab id="tab-discover" md-label="Discover" to="/discover"></md-tab>
            <md-tab id="tab-pinned" md-label="Pinned" to="/pinned"></md-tab>
          </md-tabs>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="ui.menuVisible">
        <SideNavigation/>
      </md-app-drawer>

      <md-app-content style="padding-left:0;padding-right:0;">
        <transition name="component-fade" mode="out-in">
          <router-view/>
        </transition>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import AuthApi from '@/util/auth.api';
import SideNavigation from '@/components/widgets/side-navigation.vue';

export default {
  name: 'App',
  data () {
    return {
      ui: {
        menuVisible: false,
        tab: 'tab-todays-task'
      }
    }
  },
  beforeCreate() {
    if(!window.localStorage.token)
      window.location.href = '/login';
  },
  components: {
    SideNavigation
  },
  methods: {
    logout() {
      AuthApi.logout();
    }
  }
}
</script>

<style scoped>
.md-app {
  height: 100vh;
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}

.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .5s ease, margin-top .5s ease;
}

.component-fade-enter, .component-fade-leave-to {
  opacity: 0;
  margin-top: 50vh;
}
</style>