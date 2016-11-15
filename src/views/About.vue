<template>
  <div>
    <div class='about-container row'>
      <div class='col-xs-12'>
        <div class='box'>
          <a href='/'> map </a>
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

<style>
.about-container {
  padding-top: 5%;
}
</style>
