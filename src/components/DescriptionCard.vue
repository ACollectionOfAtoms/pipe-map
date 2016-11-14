<template>
  <div class='col-xs-12 card-container'>

    <div :id='cardId'>
      <!-- if we have no year... -->
      <!-- This should be a separate component! -->
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
      <div v-else class='slide-card row'>
        <div class='col-xs-3'>
          <span class='year-label'> {{ year }} </span>
        </div>
        <div class='col-xs-offset-3 col-xs-6 year-description-label'>
          <span class='year-description-text'> {{ accidents }} Accidents </span>
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
    background-image: url('~assets/images/kalamazoo_2010.jpg')
  }
  .outro-card {
    color: white;
    background-image: '';
  }
  .card-body {
    max-height: 20em;
    overflow-y: scroll;
  }
  .slide-card {
    -webkit-box-shadow: 0px 1px 0px 0px rgba(50, 50, 50, 0.32);
    -moz-box-shadow:    0px 1px 0px 0px rgba(50, 50, 50, 0.32);
    box-shadow:         0px 1px 0px 0px rgba(50, 50, 50, 0.32);
  }
  .year-label, .year-description-label {
    opacity: 0.75;
    text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
  }
  .year-label {
    font-size: 5em;
  }
  .year-description-label {
    font-size: 3em;
    padding-top: 0.6em;
    text-align: right;
  }
</style>
