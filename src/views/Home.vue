<script setup>
import Navi from "../components/Nav.vue";
import Annoucements from "../components/Annoucements.vue";
import AddNew from "../components/AddNew.vue";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { query, where, getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import db from "../firebase/init";

import moment from "moment";
</script>

<script>
export default {
  data() {
    return {
      user: {
        name: null,
        id: null,
        tel: null,
        url: null
      },
      offeringColl: [],
      lookingColl: []
    }
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        this.user.name = user.email.split('@')[0];
        this.user.id = user.uid;

        const getUserInfo = async function(query) {
          const querySnapshot = await getDocs(query);
          let output = null;
          querySnapshot.forEach((doc) => {
            output = doc.data();
          });
          return output;
        }

        const q = query(collection(db, "users"), where("uid", "==", this.user.id));

        getUserInfo(q)
          .then(data => {
            this.user.tel = data.tel;
            this.user.url = data.url;
          });
      } else {
        // User is signed out
        this.user = {
          name: null,
          id: null,
          tel: null,
          url: null
        };
      };
    });
    this.getData('looking', this.lookingColl);
    this.getData('offering', this.offeringColl);
  },
  methods: {
    getData: async function(collName, variable) {
      const querySnapshot = await getDocs(collection(db, collName));
      variable.length = 0;
      querySnapshot.forEach((doc) => {
        variable.push({
          id: doc.id,
          data: doc.data()
        });
      });

      variable.sort((a, b) => {
        return b.data.created.seconds - a.data.created.seconds;
      });

      variable.forEach((item) => {
        let created = moment(item.data.created.seconds * 1000);
        if (item.data.dateFrom) {
          let from = moment(item.data.dateFrom.seconds * 1000);
          item.data.dateFrom = from.format('DD.MM.YYYY, HH:mm');
        } else {
          let from = null;
        }
        if (item.data.dateTo) {
          let to = moment(item.data.dateTo.seconds * 1000);
          item.data.dateTo = to.format('DD.MM.YYYY, HH:mm');
        } else {
          let to = null;
        }
        item.data.created = created.format('DD.MM.YYYY HH:mm');
        if (this.user && this.user.id === item.data.uid) {
          item.deletable = true;
        } else {
          item.deletable = false;
        }
      });
    },
    annDelete: async function(coll, id) {
      await deleteDoc(doc(db, coll, id));
      if (coll === "looking") {
        this.getData('looking', this.lookingColl);
      } else {
        this.getData('offering', this.offeringColl);
      }
    }
  }
}
</script>

<template>  
  <div class="container">
    <div class="row top">
      <Navi :username="(user) ? user.name : null" @refreshDb="getData('looking', lookingColl); getData('offering', offeringColl)" />
    </div>
    <div class="row">
      <div class="col s6">
        <Annoucements :collection="lookingColl" annCompId="1" @annDelete="annDelete('looking', $event)">
          <h5>Seeking Parking Spots</h5>
          <AddNew :user="user" addNewId="1" collName="looking" @refreshDb="getData('looking', lookingColl)">
            <template #header>
              You are adding an inquiry about availability
            </template>
            <template #textFromWhen>
              Since when do you need a parking space
            </template>
          </AddNew>
        </Annoucements>
      </div>
      <div class="col s6">
        <Annoucements :collection="offeringColl" annCompId="2" @annDelete="annDelete('offering', $event)">
          <h5>Offered Parking Spaces</h5>
          <AddNew :user="user" addNewId="2" collName="offering" @refreshDb="getData('offering', offeringColl)">
            <template #header>
              You are adding an offer to share a parking space
            </template>
            <template #textFromWhen>
              Since when can you offer a parking space
            </template>
          </AddNew>
        </Annoucements>
      </div>
    </div>
  </div>
</template>

<style>
.top {
  margin-top: 2vh;
}
.error {
  color: crimson;
  font-weight: bold;
}
</style>