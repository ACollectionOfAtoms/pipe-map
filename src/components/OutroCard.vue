<template>
  <!-- The outro card should include some photos along with tabulature data with
      averages and other interesting data -->
  <div :id='cardId' class='outro-container'>
    <div class='header'>
      Accidents Happen
    </div>
    <div class='outro-body'>
      <div class='outro-top'>
        <div class='outro-top-container'>
          <div class='image'></div>
          <p class='top-text-body'>As pipelines age and accidents happen, the United States has seen a spike of energy infrastructure incidents in the 21st century. Fuel leaks contaminate soil and water, posing a serious threat to our sustainability.</p>
        </div>
      </div>
      <div class='outro-bottom'>
        <div class='bottom-text-container'>
          <p> Families displaced in explosions or by line ruptures are sometimes forced to leave their homes permanently. Farmers face extensive cleanup and abandon the land for growth. These incidents demonstrate the impact this has on the land, wildlife and people that can take years to recover from. </p>
        </div>
        <div class='stats-container'>
          <div class='stats-div stat-one-container'>
            <div class='stats-title'>
              Average Gallons Spilt
            </div>
            <div class='stats-body'>
              300,000<span class='unit'>/year</span>
            </div>
          </div>
          <div class='stats-div stat-two-container'>
            <div class='stats-title'>
              Minimum Gallons Spilt
            </div>
            <div class='stats-body'>
              100,000<span class='unit'>/year</span>
            </div>
          </div>
          <div class='stats-div stat-three-container'>
            <div class='stats-title'>
              Average Number Of Accidents
            </div>
            <div class='stats-body'>
              24<span class='unit'>/year</span>
            </div>
          </div>
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
  height: 100vh;
  width: 100%;
  transition: height 0s;
  pointer-events: all;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.header {
  font-size: 2em;
  max-height: 25%;
}
.outro-body {
  margin: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.outro-top, .outro-bottom {
  width: 100%;
  font-size: 2em;
}
.outro-top {
  height: 36%;
}
.outro-top-container {
  margin: 1em;
}
.outro-bottom {
  height: 36%;
  display: flex;
  flex-direction: row;
}
.stats-container {
  width: 50%;
  border-left: 1px solid white;
  margin: 0 1em 0 1em;
  display: flex;
  flex-direction: column;
}
.bottom-text-container {
  width: 50%;
  margin: 0 -0.3em 0 1em;
  text-align: right;
}
.stats-div {
  display: flex;
  height: 33%;
  flex-direction: column;
  margin: 1em 0 1em 0;
}
.stats-title {
  text-align: center;
  font-size: 0.8em;
}
.stats-body {
  text-align: center;
  font-size: 1.6em;
}
.unit {
  font-size: 0.5em;
}
.image {
  float: left;
  width: 8em;
  height: 8em;
  margin: 1em 1em 1em 0;
  border: 1px solid black;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url('~assets/images/2013/mayflowerarspill2013_PA.jpg');
}
@supports (shape-outside: circle()) {
    .image  {
      border-radius: 50%;
      shape-outside: circle(50%);
    }
}
@media only screen and (min-width: 768px)
       and (max-width: 1400px){
      .header {
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
        margin: 1em;
      }
      .stat-two-container {
        border-left: 1px solid white;
        border-right: 1px solid white;
      }
}
/* SMH :( */
@media only screen and (min-width: 1400px)
       and (max-width: 2880px) {
         .header {
           font-size: 2em;
         }
         .outro-top, .outro-bottom {
           width: 50%;
           font-size: 0.6em;
         }
         .stats-body {
           font-size: 1.8em;
         }
         .unit {
           font-size: 0.4em;
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
           border-left: 1px solid white;
           border-right: 1px solid white;
         }
       }
</style>
