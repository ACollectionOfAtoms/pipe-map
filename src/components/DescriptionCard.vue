<template>
  <div class='slide-card col-xs-12'>
    <div :id='cardId'>
      <div v-if="!year" class='info-card'>
        <header>
          <div v-if="year">
            <h2> {{year}} </h2>
          </div>
          <slot name="header"></slot>
        </header>
        <main class='card-body'>
          <slot name="body"></slot>
          <h4 v-if="year"> {{ accidents }} Accidents Occured </h4>
        </main>
        <footer>
          <slot name="footer"></slot>
        </footer>
      </div>
      <div v-else class='row'>
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
      title: '',
      body: '',
      accidents: 0
  },

  data() {
    return {
      stuff: 'Stuff',
      isEmpty: false
    }
  },

  methods: {
  }
}
</script>

<style scoped>
  .info-card {
    text-align: center;
    height: 80%;
  }
  .card-body {
    max-height: 20em;
    overflow-y: scroll;
  }
  .slide-card {
    width: 100vw;
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
