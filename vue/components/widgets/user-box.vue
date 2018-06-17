<template>
  <div class="userbox md-layout">
    <div class="avatar md-layout-item">
      <md-avatar class="md-avatar-icon md-large">
        <md-ripple>MM</md-ripple>
      </md-avatar>
    </div>
    <div class="md-layout-item">
      <div style="height:48px">
        <div id="username" class="md-title" v-show="!ui.editingUsername">
          {{user.username}}
        </div>
        <md-field id="username-edit" v-show="ui.editingUsername">
          <label>Username</label>
          <md-input v-model="user.username"></md-input>
        </md-field>
        <div id="edit-username">
          <md-button class="md-icon-button" style="line-height:48px" @click="ui.editingUsername = !ui.editingUsername">
            <md-icon>{{ui.editingUsername ? 'check' : 'edit'}}</md-icon>
          </md-button>
        </div>
      </div>
      <div class="md-caption">{{user.email}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserBox",
  data() {
    return {
      user: {
        username: '测试',
        email: 'celestialphineas@outlook.com'
      },
      ui: {
        editingUsername: false,
      }
    };
  },
  methods: {
  }
};
</script>

<style scoped>
.userbox {
  height: 100px;
  padding: 20px;
}

#username {
  height: 48px;
  line-height: 48px;
  max-width: 220px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  float: left;
}

#edit-username {
  height: 48px;
  line-height: 48px;
  float: left;
}

#username-edit {
  margin-top: -15px;
  margin-bottom: -10px;
  line-height: 48px;
  max-width: 220px;
  float: left;
}
</style>
