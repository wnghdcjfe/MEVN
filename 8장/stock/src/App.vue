<template>
  <article>
    <nav>
      <ul>
        <li @click="setName('삼성전자')" :class="{'nav-active' : name === '삼성전자'}">삼성전자 </li>
        <li @click="setName('현대모비스')" :class="{'nav-active' : name === '현대모비스'}">현대모비스 </li>
        <li @click="setName('카카오')" :class="{'nav-active' : name === '카카오'}">카카오</li>
        <li @click="setName('네이버')" :class="{'nav-active' : name === '네이버'}">네이버</li>
      </ul>
    </nav>
    <div class="back" v-if="loading">
      <div class="background"></div>
      <div class="vs-loading default">
        <div class="effect-1 effects"></div>
        <div class="effect-2 effects"></div>
        <div class="effect-3 effects"></div>
      </div>
    </div>
    <div>
      <h1>{{herestk}}</h1>
      <p class="message">{{message}}</p>
      <p>{{name}} - 목표매수금액</p>
      <div class="target">
        <input v-model.number="targetCur" type="number" step="500">
        <button @click="setTarget()">설정</button>
      </div>
    </div>
    <div class="svgWrap">
      <svg />
    </div>
    <div class="tableWrap">
      <table>
        <thead>
          <tr>
            <th>날짜</th>
            <th>종가</th>
            <th>증감</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(stock, idx) in herestksise" :key=idx>
            <td>{{stock.date}}</td>
            <td>{{stock.value}}</td>
            <td :class="{'active' : stock.isInc, 'not-active' : !stock.isInc}">
              <i v-if=stock.isInc>▲</i>
              <i v-else>▼</i>
              {{stock.increaseOrdecrease}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </article>
</template>
<script>
  import * as d3 from 'd3'
  import {
    onMounted,
    ref
  } from 'vue'
  import axios from 'axios'
  export default {
    name: 'App',
    components: {},
    setup() {
      let name = ref("삼성전자")
      let message = ref("")
      let targetCur = ref(0)
      let herestk = ref({})
      let herestksise = ref([])
      let loading = ref(true)
      const draw = (target, now) => {
        d3.select("svg").selectAll("g").remove()
        const remain = ((now - Math.max(now - target, 0)) / now) * 100
        if (remain === 100) {
          message.value = `지금 사야 합니다!`
        } else if (remain >= 50) {
          message.value = `${Math.round(remain)}%에요 좀만 참으세요 ㅠㅠ`
        } else {
          message.value = `${Math.round(remain)}%입니다. 장기적으로 바라보죠.`
        }
        const width = 350
        const height = 350
        const radius = Math.min(width, height) / 2.3
        const group = d3.select("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

        const pieGenerator = d3.pie().sort(null)
        const arc = d3.arc()
          .innerRadius(radius * 0.9)
          .outerRadius(radius)

        const textDOM = group.append("text")
          .attr("text-anchor", "middle")
          .attr("dy", ".3em")
          .attr("font-size", "3rem")
          .attr("font-weight", "bold")

        group.append("text")
          .attr("text-anchor", "middle")
          .attr("dy", "-2em")
          .text("목표까지")

        group.append("path")
          .data(pieGenerator([1]))
          .attr("class", "backColor")
          .attr("d", arc)

        const foreground = group.append("path")
          .data(pieGenerator([0, 100]))
          .attr("class", (d, i) => `frontColor${i}`)
          .attr("d", arc)
        const format = d3.format(".0%")

        function arcTween(pie) {
          return function (d) {
            const interpolate = d3.interpolate(pie[0].startAngle, pie[0].endAngle)
            const interpolateText = d3.interpolate(0, pie[0].value)
            return function (t) {
              d.endAngle = interpolate(t)
              textDOM.text(format(interpolateText(t) / 100))
              return arc(d)
            }
          }
        }
        foreground.transition()
          .duration(1500)
          .attrTween("d", arcTween(pieGenerator([remain, 100 - remain])))
          .delay(1000)
      }
      const setTarget = () => {
        setlc(name.value, targetCur.value)
        draw(targetCur.value, herestk.value)
      }
      let stock = {}
      let stockSise = {}
      const getlc = name => {
        return localStorage.getItem(name) || 0
      }
      const setlc = (name, value) => {
        localStorage.setItem(name, value)
      }
      let setName = (payload) => {
        name.value = payload
        herestk.value = stock[payload]
        herestksise.value = stockSise[payload]
        targetCur.value = getlc(payload)
        draw(targetCur.value, herestk.value)
      }
      onMounted(() => {
        Promise.all([
            axios.get("http://127.0.0.1:12010/stocks/today"),
            axios.get("http://127.0.0.1:12010/stocks/days")
          ])
          .then(res => {
            loading.value = false
            stock = res[0].data
            stockSise = res[1].data
            setName("삼성전자")
          })

        setInterval(() => {
          axios.get("http://127.0.0.1:12010/stocks/today").then(res => {
            stock = res.data
            herestk.value = stock[name.value]
            draw(targetCur.value, herestk.value)
          })
        }, 1000 * 60)
      })
      return {
        loading,
        name,
        message,
        targetCur,
        stock,
        stockSise,
        setName,
        herestksise,
        herestk,
        setTarget,
      }
    }
  }
</script>

<style>
  h1 {

    font-size: 3rem;
    margin: 10px;
  }

  .svgWrap {
    position: relative;
  }

  .tableWrap {
    top: -14px;
    position: relative;
  }

  .target {
    display: flex;
    justify-content: center;
  }

  .not-active {
    color: blue;
  }

  .active {
    color: red;
  }

  .nav-active {
    border-bottom: 2px solid rgba(79, 192, 141, 0.7);
    font-weight: bold;
  }

  p {
    margin-bottom: 0;
  }

  .backColor {
    fill: #dee2e6;
  }

  .frontColor0 {
    fill: rgba(79, 192, 141, 0.7);
  }

  article {
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }

  input {
    width: 80%;
    font-size: 1.3rem;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    padding: .3rem;
  }

  .message {
    font-weight: bold;
    font-size: 1.5rem;
    margin: 0 auto;
    color: rgba(79, 192, 141, 0.7);
  }

  text {
    font-family: 'Avenir';
  }


  button {
    width: 20%;
    font-size: 0.85rem;
    background: transparent;
    border: 1px solid #aaa;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    transition: all 0.5s;
  }

  button:hover {
    background-color: rgba(79, 192, 141, 0.7);
    cursor: pointer;

  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  ._sort:hover {
    cursor: pointer;
    color: rgba(79, 192, 141, 0.7);
  }

  .back {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
  }

  .background {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(4px);
    position: absolute;
    top: 0;
    left: 0;

  }

  @keyframes rotate {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    to {
      -webkit-transform: rotate(1turn);
      transform: rotate(1turn);
    }
  }

  @keyframes rotateOpacity {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
      opacity: .1;
    }

    to {
      -webkit-transform: rotate(1turn);
      transform: rotate(1turn);
      opacity: 1;
    }
  }


  .vs-loading {
    position: relative;
    margin: 0 auto;
    margin-top: 2rem;
    width: 100px;
    height: 100px;
    display: block;
    border-radius: 50%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 3px solid transparent;
  }

  .vs-loading.default .effect-1 {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-left: 3px solid rgba(79, 192, 141, 0.7);
    border-radius: 50%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: none;
    transition: all .3s ease;
    animation: rotate 1s ease infinite;
  }

  .vs-loading.default .effect-2 {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-left: 3px solid rgba(79, 192, 141, 0.7);
    border-radius: 50%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    animation: rotateOpacity 1s ease infinite .1s;
    transition: all .3s ease;
    outline: none;
  }

  .vs-loading.default .effect-3 {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-left: 3px solid rgba(79, 192, 141, 0.7);
    -webkit-animation: rotateOpacity 1s ease infinite .2s;
    animation: rotateOpacity 1s ease infinite .2s;
    border-radius: 50%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    transition: all .3s ease;
    outline: none;
  }

  ul {
    list-style-type: none;
    margin: 0 auto;
    padding: 0.6em 0 0 0;
  }

  li:hover {
    cursor: pointer;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  table {
    margin: 0 auto;
    border-collapse: collapse;
    margin-top: 10px;
    width: 100%;
  }

  table th,
  table td {
    padding: .75rem;
    border-top: 1px solid #dee2e6;
    border-bottom: 1px solid #dee2e6;
  }

  tbody tr:nth-of-type(odd) {
    background-color: rgba(79, 192, 141, .05);
  }
</style>