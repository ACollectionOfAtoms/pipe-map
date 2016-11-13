<template>
  <div class='col-xs-8' :class="{'col-xs-12': year}">
    <div :id='cardId' class='slide-card'>
      <div v-if="!year">
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
      <div class='row'>
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
  .card-body {
    max-height: 20em;
    overflow-y: scroll;
  }
  .slide-card {
    width: 100%;
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
