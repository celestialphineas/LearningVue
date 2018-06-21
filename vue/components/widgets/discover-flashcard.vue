<template>
  <div>
		<md-card md-with-hover style="cursor:auto;margin:0;">
			<md-card-header>
				<div class="md-title">{{word}}</div>
				<div class="md-subhead" v-if="wordData.ipa">/{{wordData.ipa}}/</div>
			</md-card-header>

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

			<md-card-actions>
				<md-button class="md-primary">
					<md-icon>add_location</md-icon>
					<span>Pin</span>
				</md-button>
			</md-card-actions>
			<div class="loading-overlay" v-if="ui.ajaxLoading">
				<md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
			</div>
    </md-card>
	</div>
</template>

<script>
import DataApi from "@/util/data-api.js";

export default {
  name: "TaskFlashcard",
  data() {
    return {
      wordData: {
        en: null,
        zh: null,
        ipa: null,
        pronunciation: null
      },
      ui: {
        ajaxLoading: true
      }
    };
  },
  components: {},
  created() {
    var promise = DataApi.getWordData(this.word);
    if (promise) {
      promise.then(res => {
        this.ui.ajaxLoading = false;
				this.wordData = res.data;
				this.$emit('data-done');
      });
    }
  },
  props: ["word"]
};
</script>

<style scoped>
@import '../../assets/css/flashcard.css';
</style>
