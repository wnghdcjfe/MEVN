<template>
  <div> 
    <div v-for="c in charList" class="chartWrap card" :key="c.value">
      <h2>{{c.text}}</h2> 
      <Chart :value="c.value" :color = "c.value" :key="c.value"></Chart>
    </div> 
    <div class="tooltip"></div>
  </div>
</template>

<script> 
import Chart from './components/Chart.vue'
import {onMounted} from 'vue' 
import store from './store'
import io from 'socket.io-client'; 
import {host} from './config'
export default {
  name: 'App',
  components: {
    Chart
  }, 
  setup() {
    const charList = [
           {"color" : "red", "value": "temp", "text" : "온도"}, 
           {"color" : "green", "value": "wv", "text" : "풍속"}, 
           {"color" : "blue", "value": "humi", "text" : "습도"}, 
    ] 
    onMounted(() => {
      store.dispatch('INIT_GET_SENSOR',io(host))
    })
    return {
      charList
    }
  } 
}
</script>
<style>
.chartWrap{
  display:inline-block;
}
.chartWrap h2{
    border-bottom: 2px solid #aaa;
    padding-bottom: 10px;
    margin: 0;
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
  opacity:0;  
} 
.tooltip::after{ 
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
.tooltip h2{
  margin:0;  
  font-size:2.5rem;
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