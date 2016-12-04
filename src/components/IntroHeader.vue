<template>
  <div>
   <span class='large-text'>Pipeline Accidents </span>
   <div class='mid-container'>
     <div class='mid-content'>
       <div class='horz-line'></div>
       <span class='medium-text'> of </span>
       <div class='horz-line'></div>
     </div>
   </div>
   <span class='large-text'> The 21st Century </span>
   <div class='caption-container'>
   </div>
  </div>
</template>

<style scoped>
.large-text {
  font-size: 8vh;
}
.medium-text {
  font-size: 3vh;
}
.horz-line {
  height: 1px;
  background-color: black;
  width: 6vw;
  margin: 0 1em 0 1em;
}
.mid-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.mid-content {
  max-width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.caption-container {
  margin-top: 3vh;
  font-size: 2vh;
}
@media only screen and (max-width: 768px) {
  .large-text {
    font-size: 7em;
  }
  .medium-text {
    font-size: 5em;
  }
}
</style>
