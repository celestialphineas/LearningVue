<template>
  <div>
  <md-empty-state
    v-if="words.length === 0 && ui.showEmpty"
    md-icon="directions_walk"
    md-label="Start with a Course"
    md-description="To start using memoria, you need to select a course">
    <md-button class="md-primary md-raised" href="/my">Start now</md-button>
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
          style="margin:8px;"/>
      </VueWaterfallSlot>
    </VueWaterfall>
  </div>
</template>

<script>
import TaskFlashcard from '../widgets/task-flashcard.vue';
import VueWaterfall from 'vue-waterfall/lib/waterfall';
import VueWaterfallSlot from 'vue-waterfall/lib/waterfall-slot';

export default {
  name: 'TodaysTask',
  data() {
    return {
      words: ['hello', 'world', 'word', 'this', 'that'],
      ui: {
        showEmpty: false
      }
    }
  },
  components: {
    TaskFlashcard,
    VueWaterfall, VueWaterfallSlot
  }
}
</script>

<style>
</style>
