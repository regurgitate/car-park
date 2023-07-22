<script>
export default {
  data() {
    return {
      hover: false,
      user: {
        name: null,
        pass: null,
        url: null,
        phone: null
      },
      errorMsg: null
    };
  },
  methods: {
    signUp: function() {
      const addUserAdditionalInfo = async function(uid, url, tel) {
        try {
          const docRef = await addDoc(collection(db, "users"), {
            uid,
            url,
            tel,
          });
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
      const auth = getAuth();
      const fakeEmail = this.user.name + "@fakemail.com";
      createUserWithEmailAndPassword(auth, fakeEmail, this.user.pass)
        .then((userCredential) => {
          // Signed in
          this.errorMsg = null;
          addUserAdditionalInfo(userCredential.user.uid, this.user.url, this.user.phone)
            .then(() => {
              router.push('/');
            })
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          switch (errorCode) {
            case "auth/email-already-in-use":
              this.errorMsg = "The username is already taken";
              break;
            case "auth/invalid-email":
              this.errorMsg = "Invalid username (spaces, at-signs etc. are not allowed)";
              break;
            case "auth/weak-password":
              this.errorMsg = "The password must be at least 6 characters long";
              break;
            default:
              this.errorMsg = "Something went wrong, try again later";
          }
        });
    }
  }
}
</script>

<script setup>
import Navi from "../components/Nav.vue";
import router from "../router/index";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import db from "../firebase/init";
</script>

<template>
  <div class="container">
    <div class="row top">
      <Navi />
      <div class="col s6 offset-s3 justify-align">
        <h3 class="center-align title">Signing up</h3>
        <button class="waves-effect waves-light btn" @mouseover="hover = true" @mouseleave="hover = false">What do I need an account for?</button>
        <transition name="fade">
          <div v-show="hover" class="">
            <p>If you add a request for borrowing a parking space, and someone fulfills that request, it would be a good idea to remove that announcement so that other well-intentioned people don't continue to contact you. However, at the same time, you wouldn't want everyone to be able to delete any announcement, as your request could disappear without your consent or knowledge.</p>
            <p>Analogous situation applies to people advertising their parking spaces for rent.</p>
            <p>This is a simple service designed for straightforward use; that's why providing an email address is not even required. If you forget your password, you can create a new account.</p>
          </div>
        </transition>
      </div>
    </div>
    <div class="row">
      <form class="col s6 offset-s3" @submit.prevent="signUp">
        <div class="row">
          <div class="input-field">
            <i class="material-icons prefix">account_circle</i>
            <input id="user" type="text" class="validate" required v-model="user.name"/>
            <label for="user">Username</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field">
            <i class="material-icons prefix">lock</i>
            <input id="password" type="password" class="validate" required v-model="user.pass"/>
            <label for="password">Password</label>
          </div>
        </div>
        <div class="row justify-align">
          <p>Contact details are provided so that others can respond to your request. You are not required to provide a phone number, but you have the option to do so. Providing a phone number can make it easier for others to get in touch with you.</p>
        </div>
        <div class="row">
          <div class="input-field">
            <i class="material-icons prefix">share</i>
            <input id="facebook" type="url" class="validate" required v-model="user.url"/>
            <label for="facebook">Facebook profile url</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field">
            <i class="material-icons prefix">phone</i>
            <input id="tel" type="tel" class="validate" v-model="user.phone">
            <label for="tel">Phone number</label>
          </div>
        </div>
        <div class="row center-align">
          <p class="error">{{ errorMsg }}</p>
          <button class="waves-effect waves-light btn">Sign up</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
.justify-align {
  text-align: justify;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.title {
  margin-top: 5px;
}
</style>