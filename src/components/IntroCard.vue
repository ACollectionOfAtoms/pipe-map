<template>
  <div class='intro-container'>
    <div class='intro-content'>
      <div class='header-container'>
        <intro-header></intro-header>
      </div>
      <div class='body-container'>
        {{ introText }}
      </div>
      <div class='footer'>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import IntroHeader from 'components/IntroHeader.vue'

export default {
  components: {
    'intro-header': IntroHeader
  },
  data() {
    return {
      introText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    }
  }
}
</script>

<style scoped>
.intro-container {
  height: 80%;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color:white;
  -webkit-box-shadow: 0px 50px 22px 0px rgba(255, 255, 255, 0.75);
  -moz-box-shadow:    0px 50px 22px 0px rgba(255, 255, 255, 0.75);
  box-shadow:         0px 50px 22px 0px rgba(255, 255, 255, 0.75);
}
.header-container {
  margin-top: 8%;
}
.body-container {
  width: 50%;
  max-height: 30%;
  overflow-y: scroll;
  align-self: center;
  margin-bottom: 5%;
  margin-top: 10%;
}
.intro-content {
  max-width: 80%;
  height: 100%;
  display: flex;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
}
</style>
