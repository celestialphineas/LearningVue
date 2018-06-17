<template>
  <div>
      <md-app-toolbar class="md-large md-dense md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
              <md-icon>menu</md-icon>
            </md-button>

            <span class="md-title">memoria</span>
          </div>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button">
              <md-icon>more_vert</md-icon>
            </md-button>
          </div>
        </div>

        <div class="md-toolbar-row">
          <md-tabs class="md-primary">
            <md-tab id="tab-todays-task" md-label="Today's task" to="/todays-task"></md-tab>
            <md-tab id="tab-discover" md-label="Discover" to="/discover"></md-tab>
            <md-tab id="tab-pinned" md-label="Pinned" to="/pinned"></md-tab>
          </md-tabs>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <SideNavigation/>
      </md-app-drawer>
  </div>
</template>

<script>
import SideNavigation from './side-navigation.vue';

export default {
  name: 'HomeAppBar',
  data () {
    return {
      menuVisible: false
    }
  },
  components: {
    SideNavigation
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-app {
  height: 100vh;
  border: 1px solid rgba(#000, .12);
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
</style>
