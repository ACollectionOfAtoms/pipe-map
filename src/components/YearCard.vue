<template>
  <!-- The Year Card -->
  <div class='year-card-container'>
    <div class='year-card-content' :id='cardId'>
      <div class='year-container'>
        <span class='year-text'> {{ year }} </span>
      </div>
      <div class='accident-count-container'>
        <div class='accident-count-header'>
          Accidents
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
    opacity: 0.8;
  }
  .year-card-content {
    width: 75%;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: row;
    flex-direction: row;
  }
  .year-container {
    /*top: -1.2em;*/
  }
  .accident-count-container {
    margin-left: auto;
    margin-top: -1em;
    text-align: right;
  }
  .accident-count-header {
    font-size: 4vh;
  }
  .accident-count-body {
    position: relative;
    top: -1.2em;
  }
  .year-text, .accident-count-text {
    font-size: 12vh;
  }
  @media only screen and (max-width: 768px) {
    .year-card-content {
      display: -webkit-flex;
      display: flex;
      -webkit-flex-direction: column;
      flex-direction: column;
      align-content: center;
      /*height: 100%;*/
    }
    .year-card-content {
      width: 90%;
      height: 80%;
    }
    .year-container {
      align-self: center;
    }
    .accident-count-container {
      align-self: center;
      margin-left: 0;
    }
    .accident-count-body {
      text-align: center;
    }
    .accident-count-header {
      font-size: 3.5em;
    }
    .year-text, .accident-count-text {
      font-size: 10em;
    }
  }
</style>
