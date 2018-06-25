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
      <md-subheader>Progress</md-subheader>
      <md-list-item>
        <div style="width:100%;padding:0 10px">
          <div style="width:75%;display:inline-block">
            <md-progress-bar
              md-mode="buffer"
              :md-value="learnt/total"/>
          </div>
          <div class="md-caption" style="width:20%;float:right;text-align:center">
            {{this.learnt}}/{{this.total}}
          </div>
        </div>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
import DataApi from '@/util/data.api';
import CalendarChart from './calendar-chart.vue';

export default {
  name: 'Visualization',
  props: ['data'],
  data() {
    return {
      courses: [],
      coursesObj: {},
      year: new Date().getFullYear(),
      records: [],
      total: 0,
      learnt: 0
    }
  },
  components: {
    CalendarChart
  },
  methods: {
    updateRecords() {
      var experience = this.data.experience;
      var result = [];
      for(let i in experience) {
        result.push([experience[i].time,
          experience[i].done/experience[i].target]);
      }
      this.records = result;
    },
    updateProgress() {
      this.total = this.coursesObj[this.data.course].count;
      this.learnt = Math.max(this.total - this.data.wordsToLearn.length, 0);
    }
  },
  created() {
    DataApi
      .getCourses()
      .then(res => {
        this.courses = res.data;
        for(let index in this.courses) {
          this.coursesObj[this.courses[index].entry] = this.courses[index];
        }
        this.dataDone = true;
        this.updateRecords();
        this.updateProgress();
      })
      .catch(err => console.log(err));
  },
  watch: {
    data() {
      this.updateRecords();
      this.updateProgress();
    }
  }
}
</script>
