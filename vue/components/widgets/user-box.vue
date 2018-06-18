<template>
<div class="userbox md-layout">
  <div class="md-layout-item md-size-25 avatar-container">
    <md-avatar class="md-avatar-icon md-large">
      <md-ripple>{{getAbbr(user.username)}}</md-ripple>
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
    <md-button class="md-primary" style="margin-left:-8px;" @click="ui.showDialog = true">Change Password</md-button>
  </div>
  <md-dialog :md-active.sync="ui.showDialog"  v-on:md-closed="closeChangePasswordDialog">
    <md-dialog-title>Change password</md-dialog-title>
    <md-dialog-content>
      <div class="md-body-1">Please validate your old password:</div>
      <md-field>
        <label>Old password</label>
        <md-input v-model="password" type="password"></md-input>
      </md-field>
      <div style="text-align:right">
        <span class="md-body-2" style="line-height:48px" v-show="ui.invalidOldPassword">Wrong password!</span>
        <md-button class="md-raised md-primary" @click="checkOldPassword">Check password</md-button>
      </div>
      <div class="md-body-1" style="margin-top:20px" v-show="ui.showNewPassword">Enter your new password here:</div>
      <md-field v-show="ui.showNewPassword">
        <label>New password</label>
        <md-input v-model="newPassword" type="password"></md-input>
      </md-field>
      <div style="text-align:right" v-show="ui.showNewPassword">
        <md-button class="md-raised md-primary" @click="commitNewPassword">Commit</md-button>
      </div>
    </md-dialog-content>
    <md-dialog-actions>
      <md-button class="md-primary" @click="ui.showDialog = false;">Close</md-button>
    </md-dialog-actions>
    <div class="loading-overlay" v-if="ui.dialogLoading">
      <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
    </div>
  </md-dialog>
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
        editingUsername:    false,
        showDialog:         false,
        showNewPassword:    false,
        dialogLoading:      false,
        invalidOldPassword: false,
      },
      password: '',
      newPassword: ''
    };
  },
  methods: {
    getAbbr(str) {
      if(!str || typeof str !== 'string') return '?';
      var result;
      var arr = str.split(' ');
      if(arr.length > 1
      && !this.isCJK(arr[0].charAt(0)) && !this.isCJK(arr[1].charAt(0))) {
        result = arr[0].charAt(0) + arr[1].charAt(0);
      } else {
        result = arr[0].charAt(0);
      }
      return result;
    },
    isCJK(str) {
      if(!str || typeof str !== 'string') return false;
      var cc = str.charCodeAt(0);
      if(cc >= 0x2E80  && cc <= 0x33FF
      || cc >= 0x3400  && cc <= 0x4DBF
      || cc >= 0x4E00  && cc <= 0x9FFF
      || cc >= 0xAC00  && cc <= 0xD7AF
      || cc >= 0xF900  && cc <= 0xFAFF
      || cc >= 0xFE30  && cc <= 0xFE4F
      || cc >= 0x20000 && cc <= 0x2A6DF
      || cc >= 0x2A700 && cc <= 0x2B73F
      || cc >= 0x2B740 && cc <= 0x2B81F
      || cc >= 0x2B820 && cc <= 0x2CEAF
      || cc >= 0x2F800 && cc <= 0x2FA1F
      ) {
        return true;
      }
      return false;
    },
    checkOldPassword() {

    },
    commitNewPassword() {

    },
    closeChangePasswordDialog() {
      this.password     = '';
      this.newPassword  = '';
      this.ui.showDialog          = false;
      this.ui.showNewPassword     = false;
      this.ui.dialogLoading       = false;
      this.ui.invalidOldPassword  = false;
    }
  }
};
</script>

<style scoped>
.userbox {
  height: 140px;
  padding: 20px;
}

.avatar-container {
  line-height: 100px;
  text-align: center;
  margin-right: 10px;
}

.md-dialog {
  max-width: 500px;
  width: 30%;
  min-width: calc(100vw - 20px);
  height: fit-content;
  max-height: 500px;
}

.loading-overlay {
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}

#username {
  height: 48px;
  line-height: 48px;
  max-width: 200px;
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
  margin-top: -10px;
  margin-bottom: -15px;
  line-height: 48px;
  max-width: 200px;
  float: left;
}
</style>
