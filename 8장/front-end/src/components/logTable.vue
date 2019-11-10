<template>
<div>
</div> 
</template>

<script>
  //import config from '../config' 
  import {
    mapState
  } from 'vuex'
export default {
    name: 'Chart',
    props: {
      _key: String,
      color: String
    },
    data() {
      return { 
      }
    },
    mounted() {
        
    },
    methods: {
       
    },
    computed: {
      ...mapState([
        'logList'
      ])
    }
  }
</script>

<style> 
.Chart{
  position:relative;
}
.Chart .line {
  fill: none;
  stroke: #f89e35;
  stroke-width: 2px;
}
.Chart-humi .line{ 
  stroke: #42b983; 
} 
.Chart-wv .line{ 
  stroke: #262d3d; 
} 

circle {
  fill: rgba(40, 53, 79, .95);
}
</style>