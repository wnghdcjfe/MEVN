<template>
  <div> 
    <div v-for="c in charList" class="chartWrap card" :key="c.value">
      <h2>{{c.text}}</h2> 
      <Chart :_key="c.value" :color = "c.value" :key="c.value"></Chart>
    </div> 
    <div class="tooltip"></div>
  </div>
</template>

<script> 
import Chart from '@/components/Chart.vue'

export default {
  name: 'SensorChart',
  components: {
    Chart
  }, 
    data() {
      return { 
        charList : [ 
           {"color" : "red", "value": "temp", "text" : "온도"}, 
           {"color" : "green", "value": "wv", "text" : "풍속"}, 
           {"color" : "blue", "value": "humi", "text" : "습도"}, 
        ]
      }
    },
    mounted() { 
    },
    methods: { 
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
</style>