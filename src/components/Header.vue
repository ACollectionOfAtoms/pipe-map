<template>
  <div id="header-container">
    <div id="app-header">
      <div v-if='!atAbout' @click='goToAbout' class='about-button'>
         <span> About This Project </span>
      </div>
      <div v-else @click='goToMap' class='about-button'>
        <span> Back to the map </span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    goToAbout() {
      this.$router.push('about')
    },
    goToMap() {
      this.$router.push('/')
    }
  },

  computed: {
    atAbout() {
      if (this.$router.currentRoute.fullPath == '/about') {
        return true
      }
      return false
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
  font-family: arial,helvetica,sans-serif;
  cursor: pointer;
  border-radius: 15px;
  padding: 0.8em;
  opacity: 1.0;
  background-color: rgba(20, 30, 30, 0.8);
  font-size: 1.8vh;
  color: white;
}
.about-button:hover {
  background-color: rgb(20, 30, 30);
  text-align: center;
  color: white;
}
@media only screen and (max-width: 768px) {
  .about-button {
    font-size: 1.5em;
  }
}
</style>
