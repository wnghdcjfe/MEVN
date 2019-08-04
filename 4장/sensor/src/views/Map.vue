    
<template>
  <div class="Map"> 
    <div class="d3"></div>
  </div>
</template>
<script>
  import * as d3 from 'd3';
  import * as topojson from 'topojson'; 
  export default {
    name: 'Map', 
    mounted() {
      this.draw();
    },
    methods: {
      draw() { 
        const koreaMap = require('../assets/skorea-provinces-2018-topo-simple.json');
        const _map = topojson.feature(koreaMap, koreaMap.objects.skorea_provinces_2018_geo); 

        const width = 600;
        const height = 1000;
        const svg = d3
          .select('.d3')
          .append('svg')
          .attr('width', width).attr('height', height);

        const projection = d3.geoMercator()
          .scale(1)
          .translate([0, 0]);

        const path = d3.geoPath().projection(projection);
        const bounds = path.bounds(_map);

        const widthScale = (bounds[1][0] - bounds[0][0]) / width;
        const heightScale = (bounds[1][1] - bounds[0][1]) / height;
        const scale = 1 / Math.max(widthScale, heightScale);

        const xoffset = width / 2 - scale * (bounds[1][0] + bounds[0][0]) / 2 + 10;
        const yoffset = height / 2 - scale * (bounds[1][1] + bounds[0][1]) / 2 + 80;
        const offset = [xoffset, yoffset];
        projection.scale(scale).translate(offset);

        const map = svg.append('g')
          .selectAll('path').data(_map.features)
          .enter().append('path')
          .attr('d', path);
          
        const mapInfo = [{
            "name": "서울",
            "lat": "37.532600",
            "lon": "127.024612"
          },
          {
            "name": "대전",
            "lat": "36.3730178",
            "lon": "127.2483736"
          }
        ]

        const icons = svg.append('g').selectAll('svg')
          .data(mapInfo)
          .enter()
          .append("svg:image")
          .attr("width", 50)
          .attr("height", 50)
          .attr('x', d => projection([d.lon, d.lat])[0])
          .attr('y', d => projection([d.lon, d.lat])[1])
          .attr('opacity', 1)
          .attr("xlink:href", require("../assets/grapefruit.svg"))

        const zoomed = () => {
          map.attr('transform', d3.event.transform)
          icons.attr('transform', d3.event.transform);
        }
        const zoom = d3.zoom().scaleExtent([1, 8]).on('zoom', zoomed)
        svg.call(zoom)
      }
    }
  }
</script>
<style>
  .hello {
    width: 100%;
  }

  .d3 {
    background: #eee;
    width: 618px;
    height: 1000px;
    margin: 0 auto;
  }

  path {
    fill: #ed8b70;
    stroke: #de6a6c;
  }
</style>