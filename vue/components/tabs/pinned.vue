<template>
  <div>
    <Waterfall
    :resizable="true">
    <WaterfallItem
      v-for="word in words"
      :width="300"
      :key="word">
      <PinnedFlashcard :word="word" style="margin:8px;" v-on:unpinned="unpinned"/>
    </WaterfallItem>
  </Waterfall>
  </div>
</template>

<script>
import PinnedFlashcard from '../widgets/pinned-flashcard.vue';
import {Waterfall, WaterfallItem} from 'vue2-waterfall';
import UserApi from '@/util/user.api';

export default {
  name: 'Pinned',
  data() {
    return {
      words: []
    }
  },
  beforeCreate() {
    UserApi.getPinned().then(data => this.words = data).catch(err => console.log(err));
  },
  components: {
    PinnedFlashcard,
    Waterfall, WaterfallItem
  },
  methods: {
    unpinned(word) {
      this.words.splice(this.words.indexOf(word), 1);
    }
  }
}
</script>

<style>
</style>
