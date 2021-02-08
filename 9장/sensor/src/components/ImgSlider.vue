<template>
  <div class="sliderWrap">  
    <span class="left" @click="toLeft">◀</span>
    <span class="right" @click="toRight">▶</span>
    <p>{{activateImg.name}}</p>
    <img :src="activateImg.src" :alt="activateImg.name" :style="{
      width: `${width}px`, 
      height: `${height}px`
    }">  
    <div class="dot">
      <span @click="setActive(0)" :class="{ active: currIdx === 0 }"></span>
      <span @click="setActive(1)" :class="{ active: currIdx === 1 }"></span>
      <span @click="setActive(2)" :class="{ active: currIdx === 2 }"></span> 
    </div>
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
      }, 
      setActive(idx){
        this.currIdx = idx; 
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
.sliderWrap > span {
    display: block;
    position: absolute;
    top: calc(50% - 1.25rem);
    font-size: 2.5rem;
    transition: all .5s ease;
}

.sliderWrap span:hover{
  cursor: pointer;
}
p{
    position: absolute;  
    bottom: 10px;
    right: 55px;
    background: rgba(0, 0, 0, 0.4);
    color: white;
    padding: 10px;
}
span.left {
    left: 10px; 
}
span.left:hover {
    left: 0;
}
span.right {
    right: 10px;
}
span.right:hover {
    right: 0;
}

.sliderWrap > div {
    display: inline-block;
    width: 100%;
}

.sliderWrap > img {
    width: 100%; 
  object-fit: cover;
}

.sliderWrap {
    overflow: hidden;
    position: relative;
    margin: 0 auto;
    margin-top: 20px;
} 
.dot{
  position: relative;
}
.dot > span{ 
  height: 15px;
  width: 15px;
  margin: 0 4px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: all 0.5s ease;
}

.dot > span:hover {
  cursor: pointer;
  background-color: #717171;
}
.dot > span.active{
  background-color: #717171; 
} 
</style>