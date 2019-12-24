<template>
  <div class="home">
    <imgSlider></imgSlider>
    <famousExhibition></famousExhibition> 
    <famousArtist></famousArtist> 
  </div>
</template>

<script> 
import imgSlider from '@/components/imgSlider.vue'
import famousArtist from '@/components/famousArtist.vue'
import famousExhibition from '@/components/famousExhibition.vue' 

export default {
  name: 'home',
  components: {
    imgSlider, 
    famousArtist, 
    famousExhibition
  }
}
</script>
