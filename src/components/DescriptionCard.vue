<template>
  <div class='col-xs-4' :class="{'col-xs-8': !year}">
    <div :id='cardId' class='slide-card'>
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
    padding: 1em;
    font-family: Verdana, Geneva, sans-serif;
    border-radius: 2%;
    background-color: white;
    -webkit-box-shadow: 0px 0px 9px 0px rgba(50, 50, 50, 0.32);
    -moz-box-shadow:    0px 0px 9px 0px rgba(50, 50, 50, 0.32);
    box-shadow:         0px 0px 9px 0px rgba(50, 50, 50, 0.32);
  }
</style>
