<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">

      <div class="title">
        <img :src="img.memoriaLogo">
        <div class="md-title">memoria</div>
        <div class="md-body-1">A simpler access to memorizing English words.</div>
      </div>

      <div class="form">
        <md-field :class="{ 'md-invalid': (errors.first('email') !== undefined )||ui.emailErr}">
          <label>E-mail</label>
          <md-input type="text" name="email" v-model="login.email" v-validate="'required|email'" autofocus></md-input>
          <span class="md-error" v-show="errors.has('email') || ui.emailErr">
            {{ errors.has('email') ? errors.first('email') : 'User not registered' }}
          </span>
        </md-field>

        <md-field md-has-password :class="{ 'md-invalid': (errors.first('password') !== undefined||!ui.validPass)&&login.email!=='' }">
          <label>Password</label>
          <md-input type="password" name="password" v-model="login.password" v-validate="'required'"></md-input>
          <span class="md-error" v-show="errors.has('password')">
            {{ errors.has('password') ? errors.first('password') : ui.passReason }}
          </span>
        </md-field>
      </div>

      <div class="actions md-layout md-alignment-center-space-between">
        <md-button
          class="md-raised md-secondary"
          :disabled="!ui.emailErr||errors.has('email')||!ui.validPass||login.password===''"
          @click="createAccount">
            New account
        </md-button>
        <md-button
          class="md-raised md-primary"
          @click="auth"
          :disabled="ui.emailErr||login.password===''">
            Log in
        </md-button>
      </div>

      <div class="bottom-link">
        <a @click="ui.forgottenPass=true" style="cursor:pointer">Forgotten password?</a>&emsp;|&emsp;
        <a href="https://github.com/celestialphineas/memoria">About</a>
      </div>

      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>

    </md-content>
    <div class="background" />
    <md-dialog-alert
      :md-active.sync="ui.accountCreated"
      md-title="Account created"
      :md-content="'An activation email has been sent to your mailbox <strong>' + login.email + '</strong>.'" />

    <md-dialog :md-active.sync="ui.forgottenPass">
      <md-dialog-title>Reset your password</md-dialog-title>
      <md-dialog-content style="max-width:400px">
        <p>We will send you an email with a link, clicking on which will reset your password.</p>
        <md-field :class="{ 'md-invalid': (errors.first('email') !== undefined )||ui.emailErr}">
          <label>E-mail</label>
          <md-input type="text" name="email" v-model="login.email" v-validate="'required|email'" autofocus></md-input>
          <span class="md-error" v-show="errors.has('email') || ui.emailErr">
            {{ errors.has('email') ? errors.first('email') : 'User not registered' }}
          </span>
        </md-field>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="ui.forgottenPass=false">Cancel</md-button>
        <md-button class="md-primary" @click="resetpass" :disabled="ui.emailErr||login.email===''">OK</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-snackbar md-position="center" :md-duration="5000" :md-active.sync="ui.showSnack" md-persistent>
      <span>An email to reset your password has been sent.<br/>Please check your mailbox.</span>
      <md-button class="md-primary" @click="ui.showSnack = false">Done</md-button>
    </md-snackbar>
    
  </div>
</template>

<script>
import img from '@/util/img';
import AuthApi from '@/util/auth.api';
import validPass from '@/util/valid-pass';

export default {
  name: 'Login',
  data() {
    return {
      img,
      loading: false,
      login: {
        email: "",
        password: ""
      },
      ui: {
        emailErr: false,
        passwordCheck: false,
        validPass: true,
        passReason: '',
        accountCreated: false,
        forgottenPass: false,
        showSnack: false
      }
    };
  },
  watch: {
    'login.email': function() {
      if(!this.errors.has('email')) {
        AuthApi.userExist(this.login.email)
          .then(boo => {
            this.ui.emailErr = !boo;
          });
      }
    },
    'login.password': function() {
      if(this.ui.emailErr) {
        var {valid, reason} = validPass(this.login.password);
        this.ui.validPass = valid;
        this.ui.passReason = reason;
      }
      else this.ui.validPass = true;
    }
  },
  methods: {
    auth() {
      AuthApi.login(this.login.email, this.login.password)
        .then(res => {
          window.location.href='/';
          this.loading = false;
        })
        .catch(err => {
          this.ui.validPass = false;
          this.ui.passReason = err;
          this.loading = false;
        })
      this.loading = true;
    },
    createAccount() {
      AuthApi.createUser(this.login.email, this.login.password)
        .then(() => this.ui.accountCreated = true)
        .catch(err => console.log(err));
    },
    resetpass() {
      AuthApi.resetpass(this.login.email)
        .then(() => {
          this.ui.forgottenPass = false;
          this.ui.showSnack = true;
        })
        .catch(() => {
          this.ui.forgottenPass = false;
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  font-family: Roboto,Noto Sans,'Myriad Pro','Segoe UI','Arial','Hiragino Sans GB','PingFang SC','Heiti SC','Noto Sans CJK SC','Source Han Sans SC','Microsoft YaHei',-apple-system,BlinkMacSystemFont,sans-serif;
}

.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
  background-image: url('./assets/img/login-bg.jpg');
  background-size: cover;
}

.md-content {
  margin: 5px;
}

img {
  width: 50%;
  max-width: 200px;
}

.centered-container .title {
  text-align: center;
  margin-bottom: 10px;
}

.actions .md-button {
  margin: auto;
}

.form {
  margin-bottom: 20px;
}

.md-content {
  z-index: 1;
  padding: 10px 25px 25px 25px;
  width: 100%;
  max-width: 400px;
  position: relative;
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

.bottom-link {
  text-align: center;
  margin-top: 25px;
}
</style>
