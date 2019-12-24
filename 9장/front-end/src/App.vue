<template>
  <div id="app">
    <nav>
      <div class="left">
        <router-link to="/">아트보리</router-link>
        <router-link to="/exhibition">전시회찾기</router-link>
        <router-link to="/artist">작가찾기</router-link>
      </div>
      <div class="right">
        <router-link v-if="user" :to="user ? user.link : ''">{{user.name}}</router-link>
        <router-link v-else to="/login">로그인</router-link>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        user: null
      }
    },
    mounted() {

    }
  }
</script>
<style>
  @import url('https://fonts.googleapis.com/css?family=Noto+Serif&display=swap');

  * {
    box-sizing: border-box;
    font-family: 'Noto Serif', serif;
  }
  html, body, #app{
    height:100%;
  }
  body {
    margin: 0 auto;
  }
button{
  border:none;
  outline : none;
  width:100%;
  font-size:1rem;
  padding:.5rem;
  background: #2a81d4;  
  color:white;
  font-family: 'Noto Serif', serif;
}
button:hover{
  cursor: pointer;
}
  a {
    text-decoration: none;
    color: white;
  }

  nav {
    position: sticky;
    top: 0;
    z-index: 1071;
    padding: .5rem;
    min-height: 4rem;
    background-color: #563d7c;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, .05), inset 0 -1px 0 rgba(0, 0, 0, .1);
    flex-direction: row;
    flex-flow: row nowrap;
    justify-content: flex-start;
    display: flex;
  }

  nav>.left { 
    overflow: hidden;
    display: flex;
  }

  nav a {
    padding: .5rem;
  }

  nav>.right {
    display: flex;
    flex-direction: row;  
    margin-left: auto; 
    margin-top: 0; 
    margin-bottom: 0; 
  }
</style>