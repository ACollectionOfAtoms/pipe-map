<template>
  <div id="header-container">
    <div id="app-header">
      <div @click='goToAbout' class='about-button'>
         <span> About This Project </span>
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
  display: flex;
}
.about-button {
  cursor: pointer;
  border-radius: 15px;
  padding: 0.8em;
  opacity: 1.0;
  background-color: rgba(20, 30, 30, 0.8);
  font-size: 0.6em;
  color: white;
}
.about-button:hover {
  background-color: rgb(20, 30, 30);
  text-align: center;
  color: white;
}
</style>
