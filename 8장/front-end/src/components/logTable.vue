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
</style>