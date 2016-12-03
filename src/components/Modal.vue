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
          <div>
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
  font-size: 1.2em;
  background-color: rgba(61, 61, 61, 0.97);
  position: fixed;
  z-index: 1000000000000;
}

.exit-button-container {
  color: white;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-justify-content: flex-end;
  justify-content: flex-end;
  font-size: 1.5em;
}

.exit-button {
  font-family: arial,helvetica,sans-serif;
  margin-top: 1em;
  margin-right: 1em;
  padding: 0.2em 0.5em 0.2em 0.5em;
  align-items: stretch;
}

.exit-button:hover {
  background-color: white;
  border-radius: 50%;
  color: black;
  cursor: pointer;
}

.modal-box {
  overflow-y: scroll;
  display: flex;
  align-content: center;
  justify-content: center;
  color: white;
  z-index: 1000000000000000;
}

.modal-content {
  width: 80%;
}

.title-container {
  padding: 1em 0 1em 0;
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
</style>
