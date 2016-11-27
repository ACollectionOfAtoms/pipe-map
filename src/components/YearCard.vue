<template>
  <!-- The Year Card -->
  <div class='year-card-container'>
    <div class='year-card-content' :id='cardId'>
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
</template>

<script>

export default {
  props: {
      year: '',
      cardId: '',
      accidents: 0,
  }
}
</script>

<style scoped>
  .year-card-container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.7;
  }
  .year-card-content {
    width: 75%;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: row;
    flex-direction: row;
  }
  .year-container {
    top: -1.2em;
  }
  .accident-count-text {
    font-size: 5em;
  }
  .accident-count-container {
    margin-left: auto;
    margin-top: 1em;
    text-align: right;
  }
  .accident-count-header {
    font-size: 1.5em;
  }
  .accident-count-body {
    position: relative;
    top: -1em;
  }
  .year-text, .acccident-count-text {
    font-size: 5em;
  }
</style>
