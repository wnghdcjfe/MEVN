<template>
  <div> 
    <div v-for="c in charList" class="chartWrap card">
      <h2>{{c.text}}</h2> 
      <Chart :_key="c.value" :color = "c.value" :key="c.value"></Chart>
    </div> 
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
</style>