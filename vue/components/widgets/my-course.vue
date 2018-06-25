<template>
  <div v-if="dataDone">
    <md-list :md-expand-single="true" style="padding:0">
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
              <div class="md-body-1">{{course.name}}</div>
              <span class="md-caption">{{course.description}}</span>
            </div>
            <span class="md-caption" style="position:absolute;right:40px;top:10px;">{{course.count}}</span>
          </md-list-item>
        </md-list>

        <span class="md-caption" style="position:absolute;right:40px;" v-if="course in coursesObj"><span v-if="wordsLeft">{{wordsLeft}}/</span>{{coursesObj[course].count}}</span>
      </md-list-item>

      <md-list-item md-expand :md-expanded.sync="ui.expandUserDefined">
        <md-icon style="margin-left:20px">edit</md-icon>
        <div class="md-list-item-text" style="margin-top:5px;margin-bottom:5px">
          <h5 class="md-body-1">User defined words</h5>
          <span class="md-caption">Add your own words to the course</span>
        </div>

        <md-list slot="md-expand">
          <md-list-item style="padding:0 5px;">
            <md-field>
              <label>Input your words here</label>
              <md-input v-model="userDefinedWord"></md-input>
              <span class="md-helper-text">Split words with commas</span>
            </md-field>
            <md-button
              class="md-raised md-primary"
              :disabled="getUserDefinedWords().length === 0 || ui.submittingWords"
              @click="submitDefined">
              <md-icon>check</md-icon>
              Submit
            </md-button>
          </md-list-item>
        </md-list>
      </md-list-item>

      <md-list-item>
        <md-icon style="margin-left:20px">tune</md-icon>
        <md-field>
        <label for="wordsDaily">Number of words per day</label>
        <md-select v-model="dailyCount" name="wordsDaily" id="wordsDaily">
          <md-option :value="5">5</md-option>
          <md-option :value="10">10</md-option>
          <md-option :value="20">20</md-option>
          <md-option :value="25">25</md-option>
          <md-option :value="40">40</md-option>
          <md-option :value="50">50</md-option>
          <md-option :value="60">60</md-option>
          <md-option :value="75">75</md-option>
          <md-option :value="90">90</md-option>
          <md-option :value="100">100</md-option>
        </md-select>
        </md-field>
      </md-list-item>
    </md-list>

    <md-dialog :md-active.sync="ui.showCourseDialog">
      <md-dialog-title>Select course</md-dialog-title>

      <md-dialog-content>
        Select course <b>{{ui.courseDialogData.name}}</b> to learn in future.
        Note that this will override the course you are now learning,
        but your usage record will be reserved.
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="ui.showCourseDialog = false">Close</md-button>
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
  props: ['course', 'words-left', 'words-daily'],
  data() {
    return {
      courses: [],
      coursesObj: {},
      userDefinedWord: '',
      wordNonExist: false,
      dailyCount: this.wordsDaily,
      realExtCountTransmitted: false,
      ui: {
        expandCourses: false,
        expandUserDefined: false,
        courseDialogData: {},
        showCourseDialog: false,
        submittingWords: false
      },
      dataDone: false
    }
  },
  watch: {
    wordsDaily(val) {
      this.dailyCount = val;
    },
    dailyCount(val) {
      UserApi.changeWordsDaily(val)
        .then(() => {
          this.$emit('daily-updated', val);
        })
        .catch(err => console.log(err));
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
    getUserDefinedWords() {
      var a = this.userDefinedWord
        .split(',')
        .map(str => str
          .split(' ')
          .filter(x => x !== '')
          .join(' '))
        .filter(x => x !== '');
      return a;
    },
    selectCourse(course) {
      this.ui.courseDialogData = course;
      this.ui.showCourseDialog = true;
    },
    commitSelection(course) {
      UserApi
        .selectCourse(course.entry)
        .then(() => {
          this.$emit('course-selected', course);
          this.ui.showCourseDialog = false;
        })
        .catch(err => console.log(err));
    },
    submitDefined() {
      this.ui.submittingWords = true;
      UserApi.defineWords(this.getUserDefinedWords())
        .then(() => {
          this.ui.submittingWords = false;
          this.$emit('defined-submitted', this.getUserDefinedWords());
          this.userDefinedWord = '';
          this.ui.expandUserDefined = false;
        })
        .catch(err => console.log(err));
    },
  }
}
</script>

<style scoped>

</style>
