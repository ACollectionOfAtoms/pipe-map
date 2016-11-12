<template>
  <div>
    <div :id='cardId' class='slide-card'>
      <h1> {{ year }} </h4>
    </div>
  </div>
</template>

<script>
export default {
  props: {
      year: '',
      cardId: ''
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
  .slide-card {
    padding-left: 2%;
    font-family: Verdana, Geneva, sans-serif;
    border: 1px solid #aaaaaa;
    border-radius: 2%;
    height: auto;
    width: 11%;
    background-color: white;
    -webkit-box-shadow: 0px 0px 14px 0px rgba(50, 50, 50, 0.76);
    -moz-box-shadow:    0px 0px 14px 0px rgba(50, 50, 50, 0.76);
    box-shadow:         0px 0px 14px 0px rgba(50, 50, 50, 0.76);
  }
</style>
