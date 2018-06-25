<template>
  <div>
    <svg id="calendar" ref="calendar" width="2048" height="160">
    </svg>

  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  data() {
    return {
      year: 2018,
      records: [
        [new Date('2018-1-1').getTime(), 23],
        [new Date('2018-2-1').getTime(), 4],
        [new Date('2018-2-5').getTime(), 8],
        [new Date('2018-4-5').getTime(), 12]]
    }
  },
  methods: {
    renderSVG() {
      var size = 12, margin = 3;
      var svg = d3.select(this.$refs.calendar);
      var year =  this.year;
      var records = this.records;
      var days = ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0) ? 366 : 365;
      var epoch = new Date(year + '/1/1');
      var data = new Array(days).fill(0);
      var max = records.reduce((a, b) => a[1]>b[1]?a:b)[1];
      for(let index in records) {
        let nDay = Math.floor((records[index][0] - epoch.getTime())/1000/3600/24);
        if(nDay >= days || nDay < 0) continue;
        data[nDay] = records[index][1]/max;
      }
      svg
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d, i) => Math.floor((i+epoch.getDay())/7)*(size + margin) )
        .attr('y', (d, i) => Math.floor((i+epoch.getDay())%7)*(size + margin) )
        .attr('height', size)
        .attr('width', size)
        .attr('class', d => d === 0 ? 'no-activity' : 'active-day')
        .style('opacity', d => d/0.9 + 0.1);
    }
  },
  mounted() {
    this.renderSVG();
  }
}
</script>

<style>
.no-activity {
  fill: #888;
}

.active-day {
  fill: blue;
}
</style>
