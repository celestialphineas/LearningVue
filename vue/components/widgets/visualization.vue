<template>
  <div>
    <md-list>
      <md-subheader>{{year}} Calendar</md-subheader>
      <md-list-item>
        <div style="width:100%">
          <calendar-chart
            :year="year"
            :records="records"
            style="overflow-x:scroll;width:100%"
          />
        </div>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
import CalendarChart from './calendar-chart.vue';

export default {
  name: 'Visualization',
  props: ['data'],
  data() {
    return {
      year: new Date().getFullYear()
    }
  },
  components: {
    CalendarChart
  },
  computed: {
    records() {
      var experience = this.data.experience;
      var result = [];
      for(let i in experience) {
        result.push([experience[i].time,
          experience[i].done/experience[i].target]);
      }
      return result;
    }
  }
}
</script>
