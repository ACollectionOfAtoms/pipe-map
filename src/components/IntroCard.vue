<template>
  <div class='intro-container'>
    <div :id='cardId' class='intro-content'>
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
  props: {
    cardId: ''
  },

  components: {
    'intro-header': IntroHeader
  },
  
  data() {
    return {
      introText: 'Scroll down to traverse time. Clicking on accident sites show their Wikipedia descriptions. Radii correspond to gallons spilt (if applicable).'
    }
  }
}
</script>

<style scoped>
.intro-container {
  text-align: center;
  height: 80%;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  -webkit-box-shadow: 0px 100px 22px 0px rgba(255, 255, 255, 0.75);
  -moz-box-shadow:    0px 100px 22px 0px rgba(255, 255, 255, 0.75);
  box-shadow:         0px 100px 22px 0px rgba(255, 255, 255, 0.75);
}
.header-container {
  margin-top: 8%;
}
.body-container {
  width: 50%;
  font-size: 1em;
  max-height: 30%;
  overflow-y: scroll;
  align-self: center;
  margin-bottom: 5%;
  margin-top: 5%;
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
