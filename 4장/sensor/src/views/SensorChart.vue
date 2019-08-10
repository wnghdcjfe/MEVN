<template>
  <div> 
    <div v-for="c in charList">
      {{c.value}}
      <Chart :_key="c.key" :color = "c.value"></Chart>
    </div> 
  </div>
</template>

<script>
// @ is an alias to /src
import Chart from '@/components/Chart.vue'

export default {
  name: 'SensorChart',
  components: {
    Chart
  }, 
    data() {
      return { 
        charList : [
          {"key" : 1, "color" : "red", "value": "wv"},
          {"key" : 2, "color" : "blue", "value": "temp"},
          {"key" : 3, "color" : "green", "value": "humi"}
        ]
      }
    },
    mounted() { 
    },
    methods: { 
    }  
}
</script>
