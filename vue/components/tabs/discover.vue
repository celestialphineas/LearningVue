<template>
  <div style="max-width:1200px;margin-left:auto;margin-right:auto">
  <Waterfall
  :resizable="true">
    <WaterfallItem
      v-for="word in words"
      :width="300"
      :key="word">
      <DiscoverFlashcard
        :word="word"
        :pinned="pinned.indexOf(word) !== -1"
        @pinned="pin"
        @unpinned="unpin"
        style="margin:8px;"/>
    </WaterfallItem>
  </Waterfall>
  </div>
</template>

<script>
import DiscoverFlashcard from '../widgets/discover-flashcard.vue';
import DataApi from '../../util/data.api.js';
import UserApi from '../../util/user.api.js';
import {Waterfall, WaterfallItem} from 'vue2-waterfall';

const count = 20;

export default {
  name: 'Discover',
  data() {
    return {
      count,
      words: [],
      pinned: [],
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
    UserApi.getPinned().then(data => this.pinned = data).catch(err => console.log(err));
    if(this.wordPromise) {
      this.wordPromise.then(res => {
        this.ui.ajaxLoading = false;
        this.words = res.data;
      });
    } else {
      this.ui.ajaxErr = true;
    }
  },
  methods: {
    pin(word) {
      this.pinned.push(word);
    },
    unpin(word) {
      this.pinned.splice(this.pinned.indexOf(word), 1);
    }
  }
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
