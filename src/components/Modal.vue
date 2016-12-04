<template>
  <transition name='fade'>
    <div v-show='!hideMe' class="modal-container">
      <div @click='hideThis()' class='exit-button-container'>
        <span class='exit-button'> X </span>
      </div>
      <div class='modal-box'>
        <div class='modal-content'>
          <div class='title-container'>
            {{ title }}
          </div>
          <div class='body-container'>
            {{ body }}
          </div>
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
.modal-container {
  height: 100%;
  width: 100%;
  background-color: rgba(61, 61, 61, 0.97);
  overflow-y: scroll;
  position: fixed;
  pointer-events: all !important;
  z-index: 100000000000000000; /* ¯\_(ツ)_/¯ */
}

.exit-button-container {
  color: white;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-justify-content: flex-end;
  justify-content: flex-end;
  font-size: 2em;
}

.exit-button {
  font-family: arial,helvetica,sans-serif;
  margin-top: 0.3em;
  margin-right: 1em;
  margin-bottom: 0;
  padding: 0.2em 0.5em 0.2em 0.5em;
  align-items: stretch;
  -webkit-align-items: stretch;
}

.exit-button:hover {
  background-color: white;
  border-radius: 50%;
  color: black;
  cursor: pointer;
}

.modal-box {
  display: flex;
  display: -webkit-flex;
  align-content: center;
  -webkit-align-content: center;
  justify-content: center;
  -webkit-justify-content: center;
  color: white;
  z-index: 1000000000000000;
  padding: 0 3em 3em 3em;
}

.modal-content {
  width: 100%;
}

.title-container {
  font-size: 4em;
}
.body-container {
  font-size: 2em;
}
.modal-button:hover {
  background-color: black;
  opacity: 0.75;
  color: white;
  cursor: pointer;
}

.modal-content {
  max-height: 100%;
  overflow-y: scroll;
}

.modal-footer {
  padding-top: 0.5em;
  margin: 1em;
}

@media only screen and (max-width: 768px) {
  .exit-button-container {
    font-size: 3em;
  }
  .title-container {
    font-size: 6em;
  }
  .body-container {
    font-size: 4em;
  }
}
</style>
