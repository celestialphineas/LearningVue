<template>
  <div>
		<md-card md-with-hover>
      <md-ripple>
        <md-card-header>
          <div class="md-title">{{word}}</div>
        </md-card-header>

        <md-card-content>
          {{wordData}}
        </md-card-content>

        <md-card-actions>
          <md-button>Action</md-button>
          <md-button>Action</md-button>
        </md-card-actions>
				<div class="loading-overlay" v-if="ui.ajaxLoading">
					<md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
				</div>
      </md-ripple>
    </md-card>
	</div>
</template>

<script>
import DataApi from '@/util/data-api.js';
import Axios from 'axios';

export default {
	name: 'TaskFlashcard',
	data() {
		return {
			wordData: {
				en: null,
				zh: null,
				ipa: null,
				pronunciation: null
			},
			ui: {
				ajaxLoading: 	true
			}
		}
	},
	components: {

	},
	created() {
		var promise = DataApi.getWordData(this.word);
		if(promise) {
			promise.then((res) => {
				this.ui.ajaxLoading = false;
				this.wordData = res.data;
				Axios.get(this.wordData.pronunciation).then(
					res => console.log(res)
				);
			});
		}
	},
	props: ['word']
}
</script>

<style scoped>
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
