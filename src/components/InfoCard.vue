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
  display: flex;
}

.info-card-content {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 25%;
  background-color: rgba(0, 0, 0, 0.64);
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-text {
  margin: 5%;
  font-size: 0.8em;
  color: white;
  width: 80%;
  height: 50%;
}

#info2010 {
  background-image: url('~assets/images/kalamazoo_2010.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

#info2001 {

}

#info2014 {
  background-image: url('~assets/images/2014/Harlem2014_NGExplosion_PublicUse.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

</style>
