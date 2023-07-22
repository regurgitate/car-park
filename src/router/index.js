import Vue from "vue";
import VueRouter from "vue-router";
import SignUp from "../views/SignUp.vue";
import Home from "../views/Home.vue";
import LogIn from "../views/LogIn.vue";
import { getAuth } from "firebase/auth";

const auth = getAuth();
let starter = true;
Vue.use(VueRouter);
setTimeout(() => {
  starter = false;
}, 1000);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: "Home",
      component: Home
    },
    {
      path: '/sign-up',
      name: "Sign-up",
      component: SignUp,
      meta: {
        mustBeLoggedOff: true
      }
    },
    {
      path: '/log-in',
      name: 'Log-in',
      component: LogIn,
      meta: {
        mustBeLoggedOff: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const user = auth.currentUser;
  let isLoggedIn = null;
  const mustBeLoggedOff = to.matched.some(record => record.meta.mustBeLoggedOff);
  const mustBeLoggedIn = to.matched.some(record => record.meta.mustBeLoggedIn);
 
  if (user) {
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }

  if (mustBeLoggedOff && starter) {
    next('/');
  } else if (mustBeLoggedOff && isLoggedIn) {
    next('/');
  } else if (mustBeLoggedIn && !isLoggedIn) {
    next('/log-in');
  } else {
    next();
  }
});

export default router;