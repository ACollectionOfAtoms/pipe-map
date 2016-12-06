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
  height: 100vh;
  transition: height 999999s;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
}

.info-card-content {
  position: absolute;
  bottom: 0;
  min-height: 25%;
  height: auto;
  background-color: rgba(0, 0, 0, 0.64);
  display: flex;
  align-items: center;
}

.info-text {
  font-size: 3vh;
  padding: 1em;
  color: white;
  width: 80%;
}

@media only screen and (max-width: 768px) {
  .info-text {
    font-size: 2.5em;
    margin: 1em;
  }
  .info-card-content {
    min-height: auto;
    height: auto;
    background-color: rgba(0, 0, 0, 0.5);
  }
  #info2005 .info-card-content {
    top: 0;
    bottom: auto;
  }
  #info2011 .info-card-content {
    top: 0;
    bottom: auto;
  }
  #info2013 .info-card-content {
    top: 0;
    bottom: auto;
  }
  #info2014 .info-card-content {
    top: 0;
    bottom: auto;
  }
}
#info2001 {
  background-image: url('~assets/images/2001/alaska_pipelineshot.jpg');
}

#info2000 {
  background-image: url('~assets/images/2000/WoodTV_WolverinePipelineRupture2000.jpg');
}

#info2005 {
  background-image: url('~assets/images/2005/CarroltonKentucky2005_PublicAcces.jpg')
}

#info2008 {
  background-image: url('~assets/images/2008/Crew_2008_Illinois.jpg')
}

#info2010 {
  background-image: url('~assets/images/2010/KalamazooMI_2010.jpg');
}

#info2011 {
  background-image: url('~assets/images/2011/2011_NemahaNB_FuelSpill_PA.jpg')
}
#info2013 {
  background-image: url('~assets/images/2013/TiogaND_2013_PA.jpg')
}
#info2014 {
  background-image: url('~assets/images/2014/Harlem2014_NGExplosion_PublicUse.jpg');
}

#info2015 {
  background-image: url('~assets/images/2015/refugio_beach_california2015spill.jpg')
}

</style>
