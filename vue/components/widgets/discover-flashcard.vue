<template>
  <div ref="card" class="card-expansion" style="height:148px;">
		<md-card md-with-hover style="cursor:auto;margin:0;">
			<md-card-header>
				<div class="md-title">{{word}}</div>
				<div class="md-subhead" v-if="wordData.ipa">/{{wordData.ipa}}/</div>
				<div class="md-subhead" v-else>&nbsp;</div>
			</md-card-header>

			<md-card-expand>
				<md-card-expand-content v-if="!ui.ajaxLoading">
				<md-card-content>
					<div class="md-subheading" v-if="wordData.en">English Definitions</div>
						<div v-for="en in wordData.en" :key="en[0]+en[1]+en[2]">
							<p style="margin:5px 0">
								<span v-if="en[2]">
									<span class="idm">
										<span class="pos">{{en[0]}}</span>
										{{en[1]}}
									</span>
									{{en[2]}}
								</span>
								<span v-else>
									<span class="pos">{{en[0]}}</span>
									{{en[1]}}
								</span>
							</p>
						</div>
						<div class="md-subheading" style="margin-top:10px" v-if="wordData.zh">Chinese Definitions</div>
						<div v-for="zh in wordData.zh" :key="zh[0]+zh[1]+zh[2]">
							<p style="margin:5px 0">
								<span v-if="zh[2]">
									<span class="idm">
										<span class="pos">{{zh[0]}}</span>
										{{zh[1]}}
									</span>
									{{zh[2]}}
								</span>
								<span v-else>
									<span class="pos">{{zh[0]}}</span>
									{{zh[1]}}
								</span>
							</p>
						</div>
				</md-card-content>
				</md-card-expand-content>
				<md-card-actions md-alignment="space-between">
					<md-button class="md-primary" v-if="this.pinned" @click="unpin">
						<md-icon>add_location</md-icon>
						<span>Unpin</span>
					</md-button>
					<md-button v-else @click="pin">
						<md-icon>add_location</md-icon>
						<span>Pin</span>
					</md-button>
					<md-card-expand-trigger>
						<md-button class="md-icon-button">
							<md-icon>keyboard_arrow_down</md-icon>
						</md-button>
					</md-card-expand-trigger>
				</md-card-actions>
			</md-card-expand>
			<div class="loading-overlay" v-if="ui.ajaxLoading">
				<md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
			</div>
    </md-card>
	</div>
</template>

<script>
import DataApi from '@/util/data.api.js';
import UserApi from '@/util/user.api.js';

export default {
  name: "TaskFlashcard",
  props: ['word', 'pinned'],
  data() {
    return {
      wordData: {
        en: null,
        zh: null,
        ipa: null,
        pronunciation: null
      },
      ui: {
				ajaxLoading: true,
      }
    };
  },
  created() {
    var promise = DataApi.getWordData(this.word);
    if (promise) {
      promise.then(res => {
				setTimeout(() => {
					this.ui.ajaxLoading = false;
				}, 500);
				this.wordData = res.data;
				this.$emit('data-done');
			});
    }
  },
	methods: {
		pin() {
			this.$emit('pinned', this.word);
			UserApi.pin(this.word);
		},
		unpin() {
			this.$emit('unpinned', this.word);
			UserApi.unpin(this.word);
		}
	}
};
</script>

<style scoped>
@import '../../assets/css/flashcard.css';
</style>
