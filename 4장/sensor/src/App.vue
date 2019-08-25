<template>
  <div id="app">
    <nav>
      <span class="logo">
        <img src="./assets/logo.png" alt="MEVN로고">
      </span>
      <router-link to="/">센서모니터링</router-link> |
      <router-link to="/map">지도예제</router-link> |
      <router-link to="/number">증가하는 숫자예제</router-link>
    </nav>
    <router-view />
  </div>
</template>
<script>
import { 
  mapMutations, 
  mapActions, 
  mapState 
} from 'vuex'

export default {
    name: 'MEVNProject',
    data() {
      return {}
    },
    mounted() { 
      this.initGetSensor(this.$socket);
    },
    methods: {
    ...mapMutations([ 

    ]),
    ...mapActions([
      'initGetSensor' 
    ])

    }
  }
</script>

<style>

  @font-face {
    font-family: 오버워치;
    src: url(./assets/koverwatch.woff2);
  }  

  body {
    margin: 0 auto;
    text-align: center;
    color: #2c3e50;
  }


  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
  }
  .logo {
    float: left;
  }
.card {
  background: #fff;
  border-radius: 2px;
  display: inline-block; 
  margin: 1rem;
  position: relative; 
  padding: 10px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}
 

  .logo {
    float: left;
    height: 64px;
    width: 0;
  }


</style>