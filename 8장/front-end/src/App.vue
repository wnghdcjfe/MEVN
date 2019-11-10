<template>
  <div id="app">
  <div class="flexCenter">
    <circleComponent _key="cpuUsage" _key2="CPU"></circleComponent>
    <circleComponent _key="memUsage" _key2="메모리"></circleComponent> 
  </div> 
  <button @click="test">resTime 테스트</button>
  <chart _key="avgResTime"></chart> 
  <logTable></logTable> 
  </div>
</template>

<script>
  import circleComponent from './components/circle.vue'
  import chart from './components/chart.vue'
  import logTable from './components/logTable.vue' 
  import axios from 'axios'; 
  import config from './config'; 

  import {
    mapMutations,
    mapActions
  } from 'vuex'
  export default {
    name: 'app',
    components: {
      circleComponent, 
      chart,
      logTable
    },
    data() {
      return {}
    },
    mounted() {
      this.initLog(this.$socket);
    },
    methods: {
      ...mapMutations([

      ]),
      ...mapActions([
        'initLog'
      ]),
      test(){
        axios.get(config.host) 
      }
    }
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lato&display=swap'); 
.flexCenter{
  display: flex;
    align-items: center;
    justify-content: center;
}
.flexCenter div{
  margin: 0 20px;
}
p{
  margin: 0 auto;
}
  #app {
    font-family: 'Lato', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
   
</style>