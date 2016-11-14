<template>
  <transition name='fade'>
    <div v-if='!hideMe'>
      <div class="modal-container"></div>
      <div class='row center-xs'>
        <div class='col-xs-6 modal-box'>
          <header>
            <h3> {{ title }}</h3>
          </header>

          <main class='modal-body'>
            <p> {{ body }}</p>
          </main>
          <footer>
            <div class='row center-xs modal-footer'>
              <div @click='hideThis()' class='modal-button col-xs-2'> <h5> OK </h5></div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      body: '',
      hideMe: true
    }
  },

  mounted() {
    window.eventBus.$on('showModal', d => {
      this.title = d.title
      this.body = d.body
      this.hideMe = false
    })
  },

  methods: {
    hideThis() {
      this.hideMe = !this.hideMe
    }
  }
}
</script>

<style scoped>
.modal-box {
  background-color: white;
  position: fixed;
  margin-top: 10%;
  max-height: 70%;
  overflow-y: scroll;
  background-color: white;
  z-index: 1000000000000000;
  -webkit-box-shadow: 0px 0px 3px 0px rgba(0,0,0,1);
  -moz-box-shadow: 0px 0px 3px 0px rgba(0,0,0,1);
  box-shadow: 0px 0px 3px 0px rgba(0,0,0,1);
}
.modal-container {
  height: 100%;
  width: 100%;
  background-color: rgba(20, 30, 30, 0.75);
  position: fixed;
  z-index: 1000000000000;
}

.modal-button:hover {
  background-color: black;
  opacity: 0.75;
  color: white;
  cursor: pointer;
}

.modal-body {
  max-height: 10em;
  overflow-y: scroll;
}

.modal-footer {
  padding-top: 0.5em;
  margin: 1em;
}
/*TODO: Add nice transition */
/*.fade-enter-active, .fade-leave-active {
  transition: opacity .3s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}*/
</style>
