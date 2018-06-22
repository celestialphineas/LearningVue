<template>
<div class="page-container">
<md-app md-waterfall md-mode="overlap">
  <md-app-toolbar class="md-primary md-large">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">my memoria</span>
      </div>
      <div class="md-toolbar-section-end">
        <md-menu md-direction="bottom-end">
          <md-button class="md-icon-button" md-menu-trigger>
            <md-icon>more_vert</md-icon>
          </md-button>
          <md-menu-content>
            <md-menu-item><md-icon>exit_to_app</md-icon>Log out</md-menu-item>
          </md-menu-content>
        </md-menu> 
      </div>
    </div>
  </md-app-toolbar>
  <md-app-drawer :md-active.sync="menuVisible">
    <side-navigation/>
  </md-app-drawer>

  <md-app-content class="md-elevation-0">

    <md-content class="md-elevation-2">
      <user-box/>
    </md-content>

    <md-content class="md-elevation-2">
      <my-course
        v-bind:course="data.course"
        v-bind:words-left="data.wordsToLearn.length"
        v-bind:words-daily="data.wordsDaily"
        @course-selected="courseSelected"
        @defined-submitted="definedSubmitted"
        @daily-updated="dailyUpdated"/>
    </md-content>

  </md-app-content>
</md-app>
</div>
</template>

<script>
import SideNavigation from '@/components/widgets/side-navigation.vue';
import UserBox from '@/components/widgets/user-box.vue';
import MyCourse from '@/components/widgets/my-course.vue';
import UserApi from '@/util/user.api';

export default {
  name: 'My',
  data () {
    return {
      data: {
        course: '',
        wordsToLearn: [],
        wordsDaily: 20
      },
      menuVisible: false
    }
  },
  created () {
    UserApi
      .getUserData()
      .then(res => this.data = res.data)
      .catch(err => console.log(err));
  },
  components: {
    SideNavigation,
    UserBox,
    MyCourse
  },
  methods: {
    courseSelected(course) {
      this.data.course = course.entry;
      UserApi
        .getUserData()
        .then(res => this.data = res.data)
        .catch(err => console.log(err));
    },
    definedSubmitted(words) {
      this.data.wordsToLearn = words.concat(this.data.wordsToLearn);
      UserApi
        .getUserData()
        .then(res => this.data = res.data)
        .catch(err => console.log(err));
    },
    dailyUpdated(daily) {
      this.data.wordsDaily = daily;
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

.md-app.md-overlap .md-app-content {
  padding: 0;
  margin-left: auto;
  margin-right: auto;
  background: transparent;
  width: calc(100vw - 10px);
  max-width: 640px;
}

.md-content {
  margin-bottom: 10px;
  border-radius: 2px;
}
</style>