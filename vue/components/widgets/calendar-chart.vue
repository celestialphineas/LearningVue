<template>
  <div>
    <svg style="width:840px;height:150px;">
      <g id="calendar-tags" ref="calendar-tags"></g>
      <g id="calendar" ref="calendar"></g>
    </svg>

  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  props: ['year', 'records'],
  watch: {
    records() {
      this.renderSVG();
    }
  },
  methods: {
    renderSVG() {
      var size = 12, margin = 3;
      var chart = d3.select(this.$refs.calendar)
        .attr("transform", "translate(" + 30 + "," + 25 + ")");
      var year =  this.year;
      var records = this.records;
      var days = ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0) ? 366 : 365;
      var epoch = new Date(year + '/1/1');
      var data = new Array(days).fill(0);
      var max = records.length ? records.reduce((a, b) => a[1]>b[1]?a:b)[1] : 1;
      var todayIndex = Math.floor((new Date().getTime() - epoch.getTime())/1000/3600/24);
      for(let index in records) {
        let nDay = Math.floor((records[index][0] - epoch.getTime())/1000/3600/24);
        if(nDay >= days || nDay < 0) continue;
        data[nDay] = records[index][1]/max;
      }
      chart
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d, i) => Math.floor((i+epoch.getDay())/7)*(size + margin) )
        .attr('y', (d, i) => Math.floor((i+epoch.getDay())%7)*(size + margin) )
        .attr('height', size)
        .attr('width', size)
        .attr('class', (d, i) => (d===0?'no-activity':'active-day')+' '+(i===todayIndex?'today':''))
        .style('fill-opacity', d => d/0.9 + 0.1);

      var tags = d3.select(this.$refs['calendar-tags'])
        .attr("transform", "translate(" + 10 + "," + 0 + ")");
      var firstDays
        = new Array(12).fill(0)
            .map((x, i) => Math.floor(((new Date(year, i, 1).getTime() - epoch.getTime())
              /1000/3600/24 + epoch.getDay())/7));

      tags
        .selectAll('text')
        .data(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
        .enter()
        .append('text')
        .attr('x', (d, i) => firstDays[i] * (size + margin) + 18)
        .attr('y', 15)
        .text(d => d)
        .attr('class', 'month-tag')
        .exit()
        .data(['S', 'M', 'T', 'W', 'T', 'F', 'S'])
        .enter()
        .append('text')
        .attr('x', 0)
        .attr('y', (d, i) => i * (size + margin) + 35)
        .text(d => d)
        .attr('class', 'month-tag')
        .exit();
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
  fill: #FF6D00;
  stroke-width:2px;
  stroke-opacity:0;
  stroke:#EF5350;
  transition: 0.5s;
}

.active-day:hover {
  fill: #EF5350;
  stroke-width:2px;
  stroke-opacity:1;
  stroke:#EF5350;
}

.month-tag {
  font-size: 8pt;
}

.today {
  stroke-width:1px;
  stroke-opacity:1;
  stroke:#000;
}
</style>