<template>
  <div class="sliderWrap" :style="{
      width: `${width}px`, 
      height: `${height}px`
    }">  
    <span class="left" @click="toLeft">◀</span>
    <span class="right" @click="toRight">▶</span>
    <img :src="activateImg.src" :alt="activateImg.name"> 
  </div>
</template> 

<script>    
  export default {
    name: 'ImgSlider',
    props: {
      option : Object
    },
    data() {
      return { 
        list : this.option.imgList, 
        width : this.option.width, 
        height : this.option.height, 
        currIdx : 0,
      }
    },
    mounted() { 

    },
    methods: {
      toRight(){
           this.currIdx = Math.min(this.currIdx + 1, this.list.length - 1)
      }, 
      toLeft(){
           this.currIdx = Math.max(this.currIdx - 1, 0) 
      }
    },
    computed: { 
      activateImg(){
        return this.list[this.currIdx];
      }
    }
  }
</script>

<style scoped> 
.sliderWrap span {
    display: block;
    position: absolute;
    top: 50%;
}

.sliderWrap span:hover{
  cursor: pointer;
}

span.left {
    left: 0;
}

span.right {
    right: 0;
}

.sliderWrap div {
    display: inline-block;
    width: 100%;
}

.sliderWrap img {
    width: 100%;
}

.sliderWrap {
    overflow: hidden;
    position: relative;
    margin: 0 auto;
    margin-top: 20px;
}
</style>