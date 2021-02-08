<template>
  <div> 
    <ImgSlider :option ="option"> <!--(1)-->
    
    </ImgSlider> 
  </div>
</template>

<script> 
import ImgSlider from '@/components/ImgSlider.vue' // (2)
const option = {
    imgList :[{
      "src" : 'http://127.0.0.1:12010/img/1.jpg', 
      "name" : "나의 요리 이미지1", 
      "id" : 1
    }, 
    {
      "src" : 'http://127.0.0.1:12010/img/2.jpg', 
      "name" : "나의 요리 이미지2", 
      "id" : 2
    }, 
    {
      "src" : 'http://127.0.0.1:12010/img/3.jpg', 
      "name" : "나의 요리 이미지3", 
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