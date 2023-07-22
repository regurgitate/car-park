<script>
export default {
  data() {
    return {

    };
  },
  methods: {
    logOut: function() {
      const auth = getAuth();
      signOut(auth).then(() => {
        // Sign-out successful.
        this.$emit("refreshDb");
      }).catch((error) => {
        // An error happened.
      });
    }
  }
}
</script>

<script setup>
import { getAuth, signOut } from "firebase/auth";

const props = defineProps(['username']);
</script>

<template>
  <div class="right">
    <span v-if="username">Logged in as <span class="username">{{ username }}</span></span>
    <button v-if="username" class="waves-effect waves-light btn" @click="logOut">Log out</button>
    <router-link v-if="$route.name != 'Home'" to="/">
      <button id="btn-home" class="waves-effect waves-light btn">Home</button>
    </router-link>
    <router-link v-if="!username && $route.name != 'Log-in'" to="/log-in">
      <button class="waves-effect waves-light btn">Log in</button>
    </router-link>
    <router-link v-if="!username && $route.name != 'Sign-up'" to="/sign-up">
      <button class="waves-effect waves-light btn">Sign up</button>
    </router-link>
  </div>
</template>

<style scoped>
.username {
  font-weight: bold;
}

button {
  margin-left: 15px;
}
</style>