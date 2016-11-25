<template>
  <div class='card-container'>

    <div :id='cardId'>
      <!-- if we have no year... -->
      <!-- show an info card -->
      <!-- (This should be a separate component!) -->
      <div v-if="!year" class='row middle-xs center-xs' :class='infoCardClass'>
        <div class='col-xs-12'>
          <div class='row middle-xs center-xs'>
            <div class='row-xs-6 info-card-content'>
              <header>
                <slot :ref='cardId' name="header"></slot>
              </header>
              <main class='card-body'>
                <slot name="body"></slot>
              </main>
              <footer>
                <slot name="footer"></slot>
              </footer>
            </div>
          </div>
        </div>
      </div>
      <!-- otherwise, use year card -->
      <div v-else class='flex-container'>
        <div class='year-container'>
          <span class='year-text'> {{ year }} </span>
        </div>
        <div class='accident-count-container'>
          <div class='accident-count-header'>
            Accidents:
          </div>
          <div class='accident-count-body'>
            <span class='accident-count-text'> {{ accidents }}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
      year: '',
      cardId: '',
      accidents: 0,
  },

  data() {
    return {
      stuff: 'Stuff',
      isEmpty: false
    }
  },

  computed: {
    infoCardClass() {
      if (this.cardId.includes('outro')) {
        return 'info-card outro-card'
      }
      return 'intro-card info-card'
    }
  },

  methods: {
  }
}
</script>

<style scoped>
  .card-container {
    padding: 0;
    width: 100%;
  }
  .flex-container {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: row;
    flex-direction: row;
  }
  .year-container {
    position: absolute;
    top: -1.5em;
  }
  .accident-count-text {
    font-size: 5em;
  }
  .accident-count-container {
    margin-left: 83%;
    text-align: right;
  }
  .accident-count-header {
    font-size: 1.2em;
  }
  .accident-count-body {
    position: relative;
    top: -2em;
  }
  .info-card { /* really this is the slide */
    text-align: center;
    height: 100vh;
    color: white;
  }
  .info-card-content {
    background-color: rgba(50, 50, 50, 0.75);
    padding: 1em;
  }
  .intro-card {
    /*background-image: url('~assets/images/kalamazoo_2010.jpg');*/
    background-repeat: no-repeat;
    background-position: center;
  }
  .outro-card {
    color: white;
    background-image: '';
  }
  .card-body {
    max-height: 20em;
    overflow-y: scroll;
  }
  .year-text, .acccident-count-text {
    font-size: 5em;
  }
</style>
