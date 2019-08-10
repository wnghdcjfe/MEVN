<template>
  <div> 
    풍속
    <Chart _key=1 color = "red"></Chart>
    온도
    <Chart _key=2 color = "blue"></Chart> 
    습도
    <Chart _key=3 color = "green"></Chart>  
  </div>
</template>

<script>
// @ is an alias to /src
import Chart from '@/components/Chart.vue'

export default {
  name: 'SensorChart',
  components: {
    Chart
  }
}
</script>
