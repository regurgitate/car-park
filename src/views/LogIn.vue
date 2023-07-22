<script setup>
import Navi from "../components/Nav.vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import router from "../router/index";
</script>

<script>
export default {
  data() {
    return {
      errorMsg: null,
      username: null,
      password: null
    }    
  },
  methods: {
    logIn: function() {
      const auth = getAuth();
      const fakeEmail = this.username + "@fakemail.com";
      signInWithEmailAndPassword(auth, fakeEmail, this.password)
        .then((userCredential) => {
          // Signed in 
          this.errorMsg = null;
          router.push('/');
        })
        .catch((error) => {
          this.errorMsg = "Username or password are invalid";
        });
    }
  }
}
</script>


<template>
  <div class="container">
    <div class="row buffer top">
      <Navi />
    </div>
    <div class="row">
      <div class="col s6 offset-s3 justify-align">
        <h3 class="center-align">Logging in</h3>
      </div>
    </div>
    <div class="row">
      <form class="col s6 offset-s3" @submit.prevent="logIn">
        <div class="row">
          <div class="input-field">
            <i class="material-icons prefix">account_circle</i>
            <input id="icon_prefix" type="text" class="validate" v-model="username">
            <label for="icon_prefix">Username</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field">
            <i class="material-icons prefix">lock</i>
            <input id="password" type="password" class="validate" v-model="password">
            <label for="password">Password</label>
          </div>
        </div>
        <div class="row center-align">
          <p class="error">{{ errorMsg }}</p>
          <button class="waves-effect waves-light btn">Log in</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
.buffer {
  height: 2vh;
}
.justify-align {
  text-align: justify;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>