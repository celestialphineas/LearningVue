<template>
<div>
  <md-toolbar class="md-transparent" md-elevation="0">
    <img id="logo" :src="img.memoriaLogo">
    <div>
      <h3 class="md-headline" style="margin:0">memoria</h3>
      <div class="md-caption" style="width:135px;margin:0;overflow:hidden;word-break:break-all">celestialphineas@outlook.com</div>
    </div>
  </md-toolbar>
  <md-list>
    <md-list-item href="/">
    <md-icon>home</md-icon>
    <span class="md-list-item-text">Home</span>
    </md-list-item>

    <md-list-item href="/my">
    <md-icon>account_circle</md-icon>
    <span class="md-list-item-text">My</span>
    </md-list-item>

    <md-list-item  href="https://github.com/celestialphineas/memoria">
    <md-icon>info</md-icon>
    <span class="md-list-item-text">About</span>
    </md-list-item>
  </md-list>
</div>
</template>

<script>
import img from '../../util/img';

export default {
  name: 'SideNavigation',
  data() {
    return {
      img
    };
  }
}
</script>

<style scoped>
#logo {
  display: inline-block;
  width: 80px;
  height: 80px;
  margin: 5px;
}

.md-toolbar {
  padding: 20px 0;
}
</style>
