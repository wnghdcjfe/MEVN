<template>
  <article>
    <div class="flexCenter">
      <Circle type="cpuUsage" name="CPU"></Circle>
      <Circle type="memUsage" name="메모리"></Circle>
    </div>
    <Chart type="response-time" name="응답시간" unit="ms"></Chart>
    <button @click="clickTest" class="testButton">애러테스트</button>
  </article>
</template>

<script>

  import Circle from './components/Circle.vue'
  import Chart from './components/Chart.vue'
  import {
    onMounted,
    inject
  } from 'vue'
  import store from './store'
  export default {
    name: 'app',
    components: {
      Circle,
      Chart
    },
    setup() { 
      const clickTest = () => {
        store.dispatch('TEST')
      }
      onMounted(() => {
        const socket = inject('socket')
        store.dispatch('INIT_LOG', socket)
      })
      return {
        clickTest
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Lato&display=swap');

  p {
    margin: 0 auto;
  }

  body {
    margin: 0 auto;
    height: 100%;
  }
  #app{
    height:100vh;
  }
  article {
    background: #f2f4f7;
    font-family: 'Lato';
    text-align: center;
    height: 100%;
    box-sizing: border-box;
  }

  .flexCenter {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .flexCenter div {
    margin: 0 20px;
  }

  .testButton {
    border: none;
    background: #fff;
    border: 1px solid #dee3eb;
    padding: 6px 30px;
    font-family: 'Lato';
    font-size: 1rem;
    transition: all .5s;
  }

  .testButton:hover {
    cursor: pointer;
    background: rgba(249, 158, 26, 0.7);
  }
</style>