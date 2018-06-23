<template>
  <div>
  <md-empty-state
    v-if="ui.showEmpty"
    md-icon="directions_walk"
    md-label="Start with a Course"
    md-description="To start using memoria, you need to select a course">
    <md-button class="md-primary md-raised" href="/my">Start now</md-button>
  </md-empty-state>
  <md-empty-state
    v-if="ui.showAllDone"
    md-icon="check"
    md-label="You've finished task today!"
    md-description="Or perhaps you want to discover something new?">
    <md-button class="md-primary md-raised" to="discover">Discover</md-button>
  </md-empty-state>
    <VueWaterfall
      :line-gap="300"
      :watch="words"
      align="center"
      style="overflow:visible;">
      <!-- each component is wrapped by a waterfall slot -->
      <VueWaterfallSlot
        v-for="(word, index) in words"
        :width="284"
        :height="160"
        :order="index"
        :key="word"
        move-class="item-move"
      >
        <TaskFlashcard
          :word="word"
          :pinned="pinned"
          @pinned="pin"
          @unpinned="unpin"
          @familiar="familiar"
          style="margin:8px;"/>
      </VueWaterfallSlot>
    </VueWaterfall>
  </div>
</template>

<script>
import TaskFlashcard from '../widgets/task-flashcard.vue';
import VueWaterfall from 'vue-waterfall/lib/waterfall';
import VueWaterfallSlot from 'vue-waterfall/lib/waterfall-slot';
import UserApi from '@/util/user.api';

export default {
  name: 'TodaysTask',
  data() {
    return {
      pinned: [],
      course: null,
      ajaxDone: false,
      words: [],
      ui: {
        showEmpty: false,
        showAllDone: false
      }
    }
  },
  beforeCreate() {
		UserApi
			.getPinned()
			.then(data => this.pinned = data)
			.catch(err => console.log(err));
    UserApi
      .getToday()
      .then(res => {
        this.words = res.data.words;
        this.course = res.data.course;
        if(!this.words.length && this.course === null) {
          this.ui.showEmpty = true;
        }
      })
      .catch(err => console.log(err));
  },
  watch: {
    words() {
      if(this.words.length === 0 && !this.ui.showEmpty) {
        this.ui.showAllDone = true;
      }
    }
  },
  methods: {
    pin(word) {
      this.pinned.push(word);
    },
    unpin(word) {
      this.pinned.splice(this.pinned.indexOf(word), 1);
    },
    familiar(word) {
      this.words.splice(this.words.indexOf(word), 1);
    }
  },
  components: {
    TaskFlashcard,
    VueWaterfall, VueWaterfallSlot
  }
}
</script>

<style>
.item-move {
  transition: all .5s cubic-bezier(.55,0,.1,1);
  -webkit-transition: all .5s cubic-bezier(.55,0,.1,1);
}
</style>
