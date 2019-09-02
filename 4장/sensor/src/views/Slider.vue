<template>
  <div> 
    <ImgSlider :option ="option">
    
    </ImgSlider> 
  </div>
</template>

<script> 
import ImgSlider from '@/components/ImgSlider.vue'
const option = {
    imgList :[{
      "src" : 'http://127.0.0.1:12010/img/momo1.jpg', 
      "name" : "모모", 
      "id" : 1
    }, 
    {
      "src" : 'http://127.0.0.1:12010/img/momo2.jpg', 
      "name" : "모모", 
      "id" : 2
    }, 
    {
      "src" : 'http://127.0.0.1:12010/img/momo3.jpg', 
      "name" : "모모", 
      "id" : 3
    }], 
    height: 618, 
    width: 1000
} 

export default {
  name: 'Slider',
  components: {
    ImgSlider
  }, 
    data() {
      return {  
          option : option
      }
    },
    mounted() { 

    },
    methods: { 
    }  
}
</script>
<style> 
</style>