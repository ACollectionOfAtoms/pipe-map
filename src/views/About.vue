<template>
  <div class='about-page'>
    <app-header></app-header>
    <div class='about-page-container'>
      <div class='about-page-content'>
        <!-- <div class='header-container'>
          ABOUT
        </div> -->
        <div class='body-container'>
          Nearly* all of the data found here was programmatically extracted from
          <a href='https://en.wikipedia.org/wiki/List_of_pipeline_accidents_in_the_United_States_in_the_21st_century' target="_blank">
            <span class='link'> Wikipedia</span>
          </a>.
          It is meant to be a visual aid to the daunting list found therin.
          <br/>

          <br/>
          As this is an open-source project, you may see how the
          <a href='https://github.com/ACollectionOfAtoms/pipe-map-data-acquisition' target="_blank">
            <span class='link'> data was acquired</span>
          </a>,
          along with how this
          <a href='https://github.com/ACollectionOfAtoms/pipe-map' target="_blank">
            <span class='link'> webpage was built</span>
          </a>.
          <br></br>
          <div class='credits'>
            <div>
              Software Engineer/Lead/Editor: Adam Hernandez
            </div>
            <div>
              * Journalist: Arthur DeVitalis
            </div>
            <div>
              UI-Designer: Stiles Lowe
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from 'components/Header.vue'

export default {
  components: {
    'app-header': Header
  }
}
</script>

<style scoped>
a:link, a:visited, a:hover, a:active {
  text-decoration: none;
}
.about-page {
  width: 100vw;
  height: 100vh;
  font-family: georgia,"times new roman",times,serif
}
.about-page-container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;

}
.about-page-content {
  margin-top: 10vh;
  width: 80%;
}
.header-container {
  color: rgb(67, 75, 75);
}
.body-container {
  font-size: 5vh;
  padding-bottom: 10vh;
}
.credits {
  font-size: 3vh;
  text-align: right;
  color: rgb(102, 100, 100);
  align-self: flex-start;
}
.link {
  color: rgb(0, 132, 255);
}
.link:hover {
  cursor: pointer;
}
@media only screen and (max-width: 768px) {
  .header-container {
    font-size: 15px;
  }
  .body-container {
    font-size: 25px;
  }
  .credits {
    font-size: 15px;
  }
}

</style>
