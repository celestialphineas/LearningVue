<template>
  <div style="max-width:1200px;margin-left:auto;margin-right:auto">
    <md-empty-state
      v-if="words.length === 0 && ui.showEmpty"
      md-icon="add_location"
      md-label="Pin Your Words"
      md-description="Pin anything you want to record in your daily learning and “Discover”.">
    </md-empty-state>
    <VueWaterfall
      :line-gap="300"
      :watch="words"
      align="center"
      style="overflow:visible">
      <!-- each component is wrapped by a waterfall slot -->
      <VueWaterfallSlot
        v-for="(word, index) in words"
        :width="284"
        :height="148"
        :order="index"
        :key="word"
        move-class="item-move"
      >
        <PinnedFlashcard
          :word="word"
          style="margin:8px;"
          @unpinned="unpinned"/>
      </VueWaterfallSlot>
    </VueWaterfall>
  </div>
</template>

<script>
import PinnedFlashcard from '../widgets/pinned-flashcard.vue';
import UserApi from '@/util/user.api';
import VueWaterfall from 'vue-waterfall/lib/waterfall';
import VueWaterfallSlot from 'vue-waterfall/lib/waterfall-slot';

export default {
  name: 'Pinned',
  data() {
    return {
      words: [],
      ui: {
        showEmpty: false
      }
    }
  },
  beforeCreate() {
    UserApi.getPinned()
      .then(data => {
        this.words = data;
        this.ui.showEmpty = true;
      })
      .catch(err => console.log(err));
  },
  created() {

  },
  components: {
    PinnedFlashcard,
    VueWaterfall, VueWaterfallSlot
  },
  methods: {
    unpinned(word) {
      this.words.splice(this.words.indexOf(word), 1);
    }
  }
}
</script>

<style>
.item-move {
  transition: all .5s cubic-bezier(.55,0,.1,1);
  -webkit-transition: all .5s cubic-bezier(.55,0,.1,1);
}
</style>
