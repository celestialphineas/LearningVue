<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">

      <div class="title">
        <img :src="img.memoriaLogo">
        <div class="md-title">memoria</div>
        <div class="md-body-1">A simpler access to memorizing English words.</div>
      </div>

      <div class="form">
        <md-field :class="{ 'md-invalid': errors.first('email') !== undefined }">
          <label>E-mail</label>
          <md-input type="text" name="email" v-model="login.email" v-validate="'required|email'" autofocus></md-input>
          <span class="md-error" v-show="errors.has('email')">{{ errors.first('email') }}</span>
        </md-field>

        <md-field md-has-password :class="{ 'md-invalid': errors.first('password') !== undefined }">
          <label>Password</label>
          <md-input type="password" name="password" v-model="login.password" v-validate="'required'"></md-input>
          <span class="md-error" v-show="errors.has('password')">{{ errors.first('password') }}</span>
        </md-field>
      </div>

      <div class="actions md-layout md-alignment-center-space-between">
        <md-button class="md-raised md-secondary">New account</md-button>
        <md-button class="md-raised md-primary" @click="auth">Log in</md-button>
      </div>

      <div class="bottom-link">
        <a href="/resetpassword">Forgotten password?</a>&emsp;|&emsp;
        <a href="https://github.com/celestialphineas/memoria">About memoria</a>
      </div>

      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>

    </md-content>
    <div class="background" />
  </div>
</template>

<script>
import img from '@/util/img';

export default {
  name: 'Login',
  data() {
    return {
      img,
      loading: false,
      login: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    auth() {
      // your code to login user
      // this is only for example of loading
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 5000);
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

img {
  max-width: 200px;
}

.centered-container .title {
  text-align: center;
  margin-bottom: 30px;
}

.actions .md-button {
  margin: auto;
}

.form {
  margin-bottom: 60px;
}

.md-content {
  z-index: 1;
  padding: 35px;
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