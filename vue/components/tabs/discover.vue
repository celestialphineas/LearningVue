<template>
  <div>
  <Waterfall
  :resizable="true">
    <WaterfallItem
      v-for="word in words"
      :width="300"
      :key="word">
      <DiscoverFlashcard :word="word" style="margin:8px;"/>
    </WaterfallItem>
  </Waterfall>
  </div>
</template>

<script>
import DiscoverFlashcard from '../widgets/discover-flashcard.vue';
import DataApi from '../../util/data-api.js';
import {Waterfall, WaterfallItem} from 'vue2-waterfall';

const count = 20;

export default {
  name: 'Discover',
  data() {
    return {
      count,
      words: [],
      sizes: new Array(count).fill({width: 320, height: 50}),
      ui: {
        ajaxLoading: true,
        ajaxErr: false,
      }
    }
  },
  components: {
    DiscoverFlashcard,
    Waterfall, WaterfallItem
  },
  created() {
    this.wordPromise = DataApi.getRandom(this.count);
    if(this.wordPromise) {
      this.wordPromise.then(res => {
        this.ui.ajaxLoading = false;
        this.words = res.data;
      });
    } else {
      this.ui.ajaxErr = true;
    }
  },
}
</script>

<style>
.loading-overlay {
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
