<template>
  <div class='info-card-container' :id='cardId'>
    <div class='info-card-content'>
      <div class='info-text'>
        {{ location }} — {{ description }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardId: '',
    location: '',
    description: ''
  }
}
</script>

<style scoped>
.horz-line {
  height: 1px;
  background-color: white;
  width: 3.5em;
  margin: 0 1em 0 1em;
}

.info-card-container {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  -webkit-box-shadow: 0px 0px 40px 40px rgba(255, 255, 255, 0.75);
  -moz-box-shadow:    0px 0px 40px 40px rgba(255, 255, 255, 0.75);
  box-shadow:         0px 0px 40px 40px rgba(255, 255, 255, 0.75);
  display: -webkit-flex;
  display: flex;
}

.info-card-content {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 25%;
  background-color: rgba(0, 0, 0, 0.64);
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
}

.info-text {
  font-size: 3vh;
  color: white;
  width: 80%;
  height: 60%;
}

@media only screen and (max-width: 768px) {
  .info-text {
    font-size: 2.5em;
  }
  .info-card-content {
    height: 50%;
  }
}
#info2001 {
  background-image: url('~assets/images/2001/alaska_pipelineshot.jpg');
}

#info2000 {
  background-image: url('~assets/images/2000/WoodTV_WolverinePipelineRupture2000.jpg');
}

#info2010 {
  background-image: url('~assets/images/2010/KalamazooMI_2010.jpg');
}

#info2014 {
  background-image: url('~assets/images/2014/Harlem2014_NGExplosion_PublicUse.jpg');
}

#info2015 {
  background-image: url('~assets/images/2015/refugio_beach_california2015spill.jpg')
}

</style>
