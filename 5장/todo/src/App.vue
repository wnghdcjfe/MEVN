<template> 
  <nav>
    <router-link :to="{ name: 'Home' }" class="logo"><span class="material-icons">eco</span></router-link>  
    <router-link :to="{ name: 'Todo' }">할 일</router-link> 
  </nav>
  <router-view />
</template>

<script> 
export default {
  name: 'App'
}
</script>

<style>
@font-face {
  font-family: "nanumburi";
  src: url("assets/MaruBuri-Regular.woff2") format("woff2");
}
body{
  font-family: "nanumburi";
  margin: 0 auto; 
  padding: 0; 
}
nav{
  background: rgba(0,0,0,0.8); 
  width:100%; 
  padding:10px; 
  text-align: center; 
    box-sizing: border-box;
}
a{
  text-decoration: none;
  color:white; 
}
.logo{
  float: left;
  width:0;
}
</style>
