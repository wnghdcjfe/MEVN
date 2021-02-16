<template>
  <div>
    <div v-for="c in charList" class="chartWrap card" :key="c.type">
      <h2>{{c.text}}</h2>
      <Chart :type="c.type" :text="c.text"></Chart>
    </div>
    <div class="tooltip"></div>
    <div class="back" v-if="loading">
      <div class="background"></div>
      <div class="alert vs-loading default">
        <div class="effect-1 effects"></div>
        <div class="effect-2 effects"></div>
        <div class="effect-3 effects"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Chart from './components/Chart.vue'
  import {
    onMounted,
    ref,
    computed, 
    inject
  } from 'vue'
  import store from './store'  
  export default {
    name: 'App',
    components: {
      Chart
    },
    setup() {
      const loading = ref(true)
      const sensors = computed(() => store.getters['sensors'])
      const charList = [{
          "type": "temp",
          "text": "온도"
        },
        {
          "type": "wv",
          "text": "풍속"
        },
        {
          "type": "humi",
          "text": "습도"
        },
      ]
      onMounted(() => { 
        const socket = inject('socket')
        store.dispatch('INIT_GET_SENSOR', socket)
        store.subscribe((mutation) => {
          if (mutation.type === "CHANGE_SENSOR_CHART") {
            if (sensors.value.length === 10) loading.value = false
          } else if (mutation.type === "CLOSE_SERVICE") {
            console.log("change the loading")
            loading.value = true
          }
        })
      })
      return {
        charList,
        loading
      }
    }
  }
</script>
<style>
  .Chart {
    position: relative
  }

  .Chart h1 {
    position: absolute;
    top: 0;
    right: 43px;
  }

  .Chart .line {
    fill: none;
    stroke-width: 2px;
  }

  .Chart-temp h1 {
    color: #ffbb48;
  }

  .Chart-temp circle {
    stroke: #f89e35;
  }

  .Chart-temp .line {
    stroke: #f89e35;
  }

  .Chart-temp .area {
    fill: #ffbb48;
  }

  .Chart-humi h1 {
    color: #f05b5a;
  }

  .Chart-humi .line,
  .Chart-humi circle {
    stroke: red;
  }

  .Chart-humi .area {
    fill: #f05b5a;
  }


  .Chart-wv .line,
  .Chart-wv circle {
    stroke: #262d3d
  }

  .Chart-wv .area {
    fill: #24a3cf;
  }

  .Chart-wv h1 {
    color: #24a3cf;
  }


  circle {
    fill: white;
  }

  @font-face {
    font-family: 'MaruBuri-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10-21@1.0/MaruBuri-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  .back {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
  }

  .background {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(4px);
    position: absolute;
    top: 0;
    left: 0;

  }

  @keyframes rotate {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    to {
      -webkit-transform: rotate(1turn);
      transform: rotate(1turn);
    }
  }

  @keyframes rotateOpacity {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
      opacity: .1;
    }

    to {
      -webkit-transform: rotate(1turn);
      transform: rotate(1turn);
      opacity: 1;
    }
  }


  .vs-loading {
    position: relative;
    margin: 0 auto;
    margin-top: 2rem;
    width: 100px;
    height: 100px;
    display: block;
    border-radius: 50%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 3px solid transparent;
  }

  .vs-loading.default .effect-1 {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-left: 3px solid rgba(79, 192, 141, 0.7);
    border-radius: 50%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: none;
    transition: all .3s ease;
    animation: rotate 1s ease infinite;
  }

  .vs-loading.default .effect-2 {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-left: 3px solid rgba(79, 192, 141, 0.7);
    border-radius: 50%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    animation: rotateOpacity 1s ease infinite .1s;
    transition: all .3s ease;
    outline: none;
  }

  .vs-loading.default .effect-3 {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-left: 3px solid rgba(79, 192, 141, 0.7);
    -webkit-animation: rotateOpacity 1s ease infinite .2s;
    animation: rotateOpacity 1s ease infinite .2s;
    border-radius: 50%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    transition: all .3s ease;
    outline: none;
  }

  .chartWrap {
    display: inline-block;
  }

  .chartWrap h2 {
    color: #a2a7c3;
    font-weight: lighter;
    margin: 0 auto;
    padding: 0;
    font-family: 'MaruBuri-Regular';
  }

  .tooltip {
    position: absolute;
    display: block;
    text-align: center;
    width: 150px;
    height: 100px;
    padding: 5px;
    font-size: 1rem;
    font-weight: bold;
    background: rgba(249, 158, 26, 0.7);
    border: 0px;
    border-radius: 8px;
    opacity: 0;
  }

  .tooltip::after {
    content: '';
    position: absolute;
    left: calc(50% - 10px);
    top: 100%;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid rgba(249, 158, 26, 0.7);
    clear: both;
  }

  .tooltip h2 {
    margin: 0;
    font-size: 2.5rem;
  }

  .tooltip p {
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0 auto;
    text-align: center;
    color: #2c3e50;
  }


  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
  }

  nav a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    display: inline-block;
    padding: 22px;
    color: white;
  }

  nav a.router-link-exact-active {
    color: #42b983;
  }

  nav img {
    margin-top: 7px;
    height: 80%;
  }

  nav {
    background: #262d3d;
    height: 64px;
    box-sizing: border-box;
    width: 100%;
    color: white;
  }

  .card {
    background: #fff;
    border-radius: 2px;
    display: inline-block;
    margin: 1rem;
    position: relative;
    padding: 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }
</style>