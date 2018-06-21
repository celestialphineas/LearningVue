<template>
  <div>
  <Waterfall
    :resizable="true">
    <WaterfallItem
      v-for="word in words"
      :width="300"
      :key="word">
      <TaskFlashcard :word="word" style="margin:8px;"/>
    </WaterfallItem>
  </Waterfall>
  </div>
</template>

<script>
import TaskFlashcard from '../widgets/task-flashcard.vue';
import {Waterfall, WaterfallItem} from 'vue2-waterfall';

export default {
  name: 'TodaysTask',
  data() {
    return {
      words: ['hello', 'world', 'flow', 'waterfall']
    }
  },
  components: {
    TaskFlashcard,
    Waterfall, WaterfallItem
  }
}
</script>

<style>
</style>
