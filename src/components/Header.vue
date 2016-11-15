<template>
  <div id="header-container">
    <div id="app-header" class='row'>
      <div @click='goToAbout' class='col-xs-1 about-button'>
         <span> About </span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    goToAbout() {
      this.$router.push('about')
    }
  }
}
</script>

<style scoped>
#header-container {
  padding-top: 1em;
  padding-left: 1em;
  height: 5%;
  width: 100%;
  position: fixed;
  z-index: 1000000000;
}
.about-button {
  background-color: rgb(20, 30, 30);
  opacity: 0.1;
  padding: 0.8em;
  text-align: center;
  color: white;
}
.about-button:hover {
  cursor: pointer;
  opacity: 1.0;
  background-color: rgba(20, 30, 30, 0.8);
  color: white;
}
</style>
