<template>
  <!-- The outro card should include some photos along with tabulature data with
      averages and other interesting data -->
  <div :id='cardId' class='outro-container'>
    <div class='outro-body'>
      <div class='outro-top'>
        <div class='outro-top-container'>
          <div class='header'>
            Accidents Happen
          </div>
          <div class='image'></div>
          <p class='top-text-body'>As pipelines age and accidents happen, the United States has seen a spike of energy infrastructure incidents in the 21st century. Fuel leaks contaminate soil and water, posing a serious threat to the land and ecosystems we rely on. Families displaced in explosions or by line ruptures are sometimes forced to leave their homes permanently. Farmers face extensive cleanup and abandon the land for growth. These incidents demonstrate the impact this has on the land, wildlife and people that can take years to recover from. </p>
        </div>
      </div>
      <div class='outro-bottom'>
        <div class='bottom-text-container'>
        </div>
        <div class='stats-container'>
          <br/>
          <div class='stats-div stat-one-container'>
            <div class='stats-title'>
              Avg. Gallons Spilt
            </div>
            <div class='stats-body'>
              349,565<span class='unit'>/year</span>
            </div>
          </div>
          <br/>
          <br/>
          <div class='stats-div stat-two-container'>
            <div class='stats-title'>
              Avg. Minimum Gallons Spilt
            </div>
            <div class='stats-body'>
              18,766<span class='unit'>/year</span>
            </div>
          </div>
          <br/>
          <br/>
          <div class='stats-div stat-three-container'>
            <div class='stats-title'>
              Avg. Number Of Accidents
            </div>
            <div class='stats-body'>
              24<span class='unit'>/year</span>
            </div>
          </div>
          <br/>
          <br/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IntroHeader from 'components/IntroHeader.vue'
import * as d3Select from 'd3-selection'

export default {
  props: {
    cardId: ''
  }
}
</script>

<style scoped>
/* the sorta CSS you write when you give yourself an ambitious deadline */
.outro-container {
  width: 100%;
  pointer-events: all;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.header {
  font-size: 2em;
  max-height: 25%;
}
.outro-body {
  margin: 1em;
  /*margin-top: 4.5em;*/
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.outro-top, .outro-bottom {
  width: 70%;
  font-size: 1.8em;
}
.outro-top-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.outro-bottom {
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.stats-container {
  margin: 1em;
  display: flex;
  flex-direction: column;
}
.bottom-text-container {
  width: 90%;
  margin-top: -1.5em;
  text-align: center;
}
.stats-div {
  display: flex;
  min-height: 33%;
  flex-direction: column;
  margin: 1em 0 1em 0;
}
.stats-title {
  text-align: center;
  font-size: 1em;
}
.stats-body {
  text-align: center;
  font-size: 3em;
}
.unit {
  font-size: 0.5em;
}
.image {
  width: 150px;
  height: 150px;
  border-radius: 100%;
  margin: 1em 1em 1em 0;
  border: 1px solid black;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url('~assets/images/2013/mayflowerarspill2013_PA.jpg');
}
@media only screen and (min-width: 768px)
       and (max-width: 1400px){
      .header {
        visibility: visible;
        font-size: 2.4em;
      }
      .outro-top, .outro-bottom {
        width: 50%;
        font-size: 1em;
      }
      .outro-bottom {
        width: 90%;
      }
      .unit {
        font-size: 0.6em;
      }
      .outro-top-container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      .top-text-body {
        align-self: flex-end;
        margin-bottom: 0;
      }
      .stats-container {
        flex-direction: row;
        border-left: none;
        align-self:flex-end;
        width: 100%;
      }
      .image {
        float: none;
        width: 300px;
        height: 300px;
        border-radius: 100%;
        shape-outside: none;
      }
      .outro-top {
        max-height: 30%;
      }
      .outro-container {
        display: flex;
        flex-direction: column;
        margin-bottom: 0;
        height: 100%;
      }
      .outro-bottom {
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .bottom-text-container {
        width: 90%;
        margin-top: -0.5em;
        text-align: left;
        align-self: flex-start;
      }
      .stats-div {
        width: 33%;
        margin: 1em;
      }
      .stat-two-container {

      }
}
/* SMH :( */
@media only screen and (min-width: 1400px)
       and (max-width: 2880px) {
         .header {
           visibility: visible;
           font-size: 2.2em;
         }
         .outro-top, .outro-bottom {
           width: 50%;
           font-size: 0.8em;
         }
         .stats-body {
           font-size: 2em;
         }
         .unit {
           font-size: 0.5em;
         }
         .outro-top-container {
           display: flex;
           align-items: center;
           justify-content: center;
           flex-direction: column;
         }
         .top-text-body {
           align-self: flex-end;
           margin-bottom: 0;
         }
         .stats-container {
           flex-direction: row;
           border-left: none;
           align-self:flex-end;
           width: 100%;
         }
         .image {
           float: none;
           width: 300px;
           height: 300px;
           border-radius: 100%;
           shape-outside: none;
         }
         .outro-top {
           max-height: 30%;
         }
         .outro-container {
           display: flex;
           flex-direction: column;
           margin-bottom: 0;
           height: 100%;
         }
         .outro-bottom {
           flex-direction: column;
           justify-content: center;
           align-items: center;
         }
         .bottom-text-container {
           width: 90%;
           margin-top: -0.5em;
           text-align: left;
           align-self: flex-start;
         }
         .stats-div {
           width: 33%;
         }
         .stat-two-container {
           margin-left: 1em;
           margin-right: 1em;
         }
       }
</style>
