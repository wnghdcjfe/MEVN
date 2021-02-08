<template> 
  <ImgSlider :option="option" />
</template>

<script>
  import ImgSlider from './components/ImgSlider'

  export default {
    name: 'App',
    components: {
      ImgSlider
    },
    setup() {
      const option = {
        list: [{
            "src": 'http://127.0.0.1:12010/img/1.jpg',
            "name": "내가 만든 소시지 오므라이스",
            "id": 1
          },
          {
            "src": 'http://127.0.0.1:12010/img/2.jpg',
            "name": "혼자 호텔가서 먹은 브런치",
            "id": 2
          },
          {
            "src": 'http://127.0.0.1:12010/img/3.jpg',
            "name": "이태원에서 먹은 분짜",
            "id": 3
          }
        ],
        height: 450,
        width: 800
      }
      return {
        option
      }
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>