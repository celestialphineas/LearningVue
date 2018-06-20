<template>
  <div>
    <Waterfall
    :resizable="true">
    <WaterfallItem
      v-for="word in words"
      :width="300"
      :key="word">
      <PinnedFlashcard :word="word" style="margin:8px;"/>
    </WaterfallItem>
  </Waterfall>
  </div>
</template>

<script>
import PinnedFlashcard from '../widgets/pinned-flashcard.vue';
import {Waterfall, WaterfallItem} from 'vue2-waterfall';

export default {
  name: 'Pinned',
  data() {
    return {
      words: ['hello', 'world', 'flow', 'waterfall']
    }
  },
  components: {
    PinnedFlashcard,
    Waterfall, WaterfallItem
  },
  activated() {
    Waterfall.render();
  },
  updated() {
    Waterfall.render();
  }
}
</script>

<style>
</style>
