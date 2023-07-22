<script setup>
import { collection, addDoc } from "firebase/firestore";
import db from "../firebase/init";
import router from "../router/index";

const props = defineProps(['user', 'addNewId', 'collName']);
</script>

<script>
export default {
  data() {
    return {
      modal: null,
      textarea: null,
      errorMessage: null,
      dateFrom: null,
      dateTo: null,
      message: null
    };
  },
  mounted() {
    let elemModal = document.querySelector(`#modal${this.addNewId}`);
    this.modal = M.Modal.init(elemModal);

    this.textarea = document.querySelector(`#textarea${this.addNewId}`);
    new M.CharacterCounter(this.textarea);
  },
  methods: {
    openModal() {
      if (this.user.id) {
        this.modal.open();
      } else {
        router.push('/log-in');
      }
    },
    submit: async function() {
      if (this.textarea.value.length > this.textarea.getAttribute('data-length')) {
        return this.errorMessage = "The message is too long";
      }
      this.errorMessage = null;
      try {
        const docRef = await addDoc(collection(db, this.collName), {
          dateFrom: (this.dateFrom) ? new Date(this.dateFrom) : null,
          dateTo: (this.dateTo) ? new Date(this.dateTo) : null,
          user: this.user.name,
          msg: this.message,
          url: this.user.url,
          tel: this.user.tel,
          created: new Date(Date.now()),
          uid: this.user.id
        });
        this.modal.close();
        document.querySelectorAll("form").forEach(form => form.reset());
        new M.CharacterCounter(this.textarea);
      } catch (e) {
        console.error("Error adding document: ", e);
      }  
    }
  }
}
</script>

<template>
  <div>
    <div class="row center-align">
      <button :data-target="`modal${addNewId}`" class="waves-effect waves-light btn" @click="openModal">Add new announcement</button>
    </div>
    <div :id="`modal${addNewId}`" class="modal">
      <div class="modal-content">

        <div class="row">
          <h4 class="center-align">
            <slot name="header"></slot>
          </h4>
        </div>
        <div class="row">
          <form class="col s6 offset-s3" @submit.prevent="submit(); $emit('refreshDb')">
            <div class="row">
              <p>
                <slot name="textFromWhen"></slot>
              </p>
              <div class="input-field">
                <i class="material-icons prefix">access_time</i>
                <input id="dateFrom" type="datetime-local" class="validate" v-model="dateFrom">
                <label for="dateFrom"></label>
              </div>
              <p>Until when</p>
              <div class="input-field">
                <i class="material-icons prefix">update</i>
                <input id="dateTo" type="datetime-local" class="validate" v-model="dateTo">
                <label for="dateTo"></label>
              </div>
            </div>
            <div class="row">
              <div class="input-field">
                <i class="material-icons prefix">message</i>
                <textarea :id="`textarea${addNewId}`" class="materialize-textarea" data-length="120" v-model="message"></textarea>
                <label :for="`textarea${addNewId}`">Add your message</label>
              </div>
            </div>
            <div class="row center-align">
              <p class="error">{{ errorMessage }}</p>
              <button class="waves-effect waves-light btn">Add</button>
            </div>            
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.error {
  color: crimson;
  font-weight: bolder;
}
</style>