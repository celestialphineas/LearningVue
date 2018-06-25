<template>
  <div>
    <md-list>
      <md-subheader>Calendar</md-subheader>
      <md-list-item>
        <calendar-chart style="overflow-x:scroll"></calendar-chart>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
import CalendarChart from './calendar-chart.vue';

export default {
  props: ['data'],
  components: {
    CalendarChart
  }
}
</script>
