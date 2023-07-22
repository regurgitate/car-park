<script setup>
const props = defineProps(['collection', 'annCompId']);
</script>

<script>
export default {
  data() {
    return {
      modals: []
    }
  },
  mounted() {
    
  },
  updated() {
    let elemsModal = document.querySelectorAll(`.modalTel${this.annCompId}`);
    this.modals = M.Modal.init(elemsModal);
  },
  methods: {
    openModal(annouceID) {
      this.modals.filter(elem => elem.id === "modalTel" + annouceID)[0].open();
    }
  }
};
</script>

<template>
  <div class="panel">
    <slot></slot>
    <ul>
      <li v-for="ann in collection" :key="ann.id">
        <div class="row">
          <div class="col s12">
            <div class="card blue-grey darken-1">
              <div class="card-content white-text">
                <span class="card-title">
                  <span v-if="ann.data.dateFrom">from {{ ann.data.dateFrom }}</span>
                  <span v-if="ann.data.dateTo"> to {{ ann.data.dateTo }}</span>
                </span>
                <p>{{ ann.data.msg }}</p>
              </div>
              <div class="card-action white-text">
                <div class="row">
                  <div class="col s5">
                    <span class="add-hour">Added {{ ann.data.created }}</span>
                  </div>
                  <div class="col s3 left-align">
                    {{ ann.data.user }}
                  </div>
                  <div class="col s4 right-align div-contact">
                    <span class="contact">
                      <a :href="ann.data.url" target=”_blank”><i class="small material-icons">account_box</i></a>
                      <a v-if="ann.data.tel"><i class="small material-icons tel-icon" :data-target="'modalTel' + ann.id" @click="openModal(ann.id)">local_phone</i></a>
                      <a v-if="ann.deletable"><i class="small material-icons delete" @click="$emit('annDelete', ann.id)">delete_forever</i></a>
                    </span>

                    <div :id="'modalTel' + ann.id" :class="`modal modalTel${annCompId}`">
                      <div class="modal-content">
                        <div class="center-align tel">Phone number: <span class="tel-span">{{ ann.data.tel }}</span></div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.delete {
  color: rgb(124, 0, 25);
  cursor: pointer;
}
div.div-contact {
  padding: 0;
}
.tel-icon {
  cursor: pointer;
}
.tel {
  color: black;
  font-size: xx-large;
}
.tel-span {
  font-weight: bold;
}
.contact {
  display: inline-block;
}
.panel {
  border: 1px solid grey;
  border-radius: 20px;
  padding: 5px;
}

h5 {
  padding: 5px;
}

button {
  margin: auto;
}

div.card-action {
  padding-top: 10px;
  padding-bottom: 0px;
}
div.card-action div.row {
  margin-bottom: 0px;
}

.add-hour {
  font-style: italic;
}

.card, .card-action {
  margin-left: 10px;
  margin-right: 10px;
  
}
</style>
