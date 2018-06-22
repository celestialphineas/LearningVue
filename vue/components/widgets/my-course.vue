<template>
  <div v-if="dataDone">
    <md-list :md-expand-single="ui.expandCourses" style="padding:0">
      <md-subheader>Now learning course</md-subheader>
      <md-list-item md-expand :md-expanded.sync="ui.expandCourses">
        <md-icon style="margin-left:20px">book</md-icon>
        <div class="md-list-item-text" style="margin-top:5px;margin-bottom:5px" v-if="course in coursesObj">
          <h5 class="md-title">{{coursesObj[course].name}}</h5>
          <span class="md-caption">{{coursesObj[course].description}}</span>
        </div>
        <div class="md-list-item-text" v-else>
          Select your course...
        </div>
        <md-list slot="md-expand">
          <md-list-item class="md-inset" v-for="course in courses" v-bind:key="course.entry" @click="selectCourse(course)">
            <div class="md-list-item-text" style="margin-left:20px;margin-top:5px;margin-bottom:5px">
              <h5 class="md-title">{{course.name}}</h5>
              <span class="md-caption">{{course.description}}</span>
            </div>
            <span class="md-caption" style="position:absolute;right:80px;">{{course.count}}</span>
          </md-list-item>
        </md-list>
        <span class="md-caption" style="position:absolute;right:80px;" v-if="course in coursesObj"><span v-if="wordsLeft">{{wordsLeft}}/</span>{{coursesObj[course].count}}</span>
      </md-list-item>
    </md-list>

    <md-dialog :md-active.sync="ui.showCourseDialog">
      <md-dialog-title>Select course</md-dialog-title>

      <md-dialog-content>
        Select course <b>{{ui.courseDialogData.name}}</b> to learn in future.
        Note that this will override the course you are now learning.
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="commitSelection(ui.courseDialogData)">Save</md-button>
      </md-dialog-actions>
    </md-dialog>

  </div>
</template>

<script>
import DataApi from '@/util/data.api';
import UserApi from '@/util/user.api';

export default {
  name: 'MyCourse',
  props: ['course', 'words-left'],
  data() {
    return {
      courses: [],
      coursesObj: {},
      ui: {
        expandCourses: false,
        courseDialogData: {},
        showCourseDialog: false,
      },
      dataDone: false
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
      })
      .catch(err => console.log(err));
  },
  methods: {
    selectCourse(course) {
      this.ui.courseDialogData = course;
      this.ui.showCourseDialog = true;
    },
    commitSelection(course) {
      UserApi
        .selectCourse(course.entry)
        .then()
        .catch(err => console.log(err));
      this.$emit('course-selected', course);
      this.ui.showCourseDialog = false;
    }
  }
}
</script>

<style scoped>

</style>
