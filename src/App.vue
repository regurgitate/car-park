<script setup>

</script>

<template>
  <div>
    <div class="rout-view">
      <router-view />
    </div>
    <footer>
      <div class="container center-align">
        © 2023 Krzysztof Olejnik
      </div>
    </footer>
  </div>
</template>

<style scoped>
.rout-view {
  min-height: calc(100vh - 70px);
}
footer {
  height: 50px;
}
</style>
