<template>
  <div class="hello"> 
    차트입니다.
  </div>
</template>

<script>
export default {
  name: 'Chart',
  props: {
    _key: Number, 
    color: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
