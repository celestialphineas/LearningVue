<template>
  <div style="min-height:160px;">
		<md-card md-with-hover style="cursor:auto;margin:0;">
			<md-card-header>
				<div class="md-title">{{word}}</div>
				<div class="md-subhead" v-if="wordData.ipa">/{{wordData.ipa}}/</div>
			</md-card-header>

			<md-card-content>
			</md-card-content>
			<md-dialog :md-active.sync="ui.showDefinitionDialog" v-on:md-closed="ui.seenDefinition=true;seenDefTimes++">
				<md-card-header>
					<div class="md-title">{{word}}</div>
					<div class="md-subhead">/{{wordData.ipa}}/</div>
				</md-card-header>
				<md-dialog-content>
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
				</md-dialog-content>
				<md-dialog-actions>
				<md-button class="md-primary" @click="ui.showDefinitionDialog=false">
					<md-icon>done</md-icon>
						<span>Got it</span>
				</md-button>
				</md-dialog-actions>
			</md-dialog>

			<md-card-actions>
				<md-button class="md-icon-button md-primary" v-if="this.pinned.indexOf(word)!==-1" style="position:absolute;right:0;top:0;margin:8px" @click="unpin">
					<md-icon>add_location</md-icon>
				</md-button>
				<md-button class="md-icon-button" v-else style="position:absolute;right:0;top:0;margin:8px" @click="pin">
					<md-icon>add_location</md-icon>
				</md-button>
				<md-button @click="ui.showDefinitionDialog=true">
					<md-icon>sentiment_dissatisfied</md-icon>
					<span v-if="!ui.seenDefinition">Obscure</span>
					<span v-else>Still obsecure</span>
				</md-button>
				<md-button class="md-primary">
					<md-icon v-if="!ui.seenDefinition">done</md-icon>
					<md-icon v-else>sentiment_very_satisfied</md-icon>
						<span>Familiar</span>
				</md-button>
			</md-card-actions>
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
				ajaxLoading: 	true,
				showDefinitionDialog: false,
				seenDefinition: false,
			},
			pinned: [],
			seenDefTimes: 0
		}
	},
	beforeCreate() {
		UserApi
			.getPinned()
			.then(data => this.pinned = data)
			.catch(err => console.log(err));
	},
	created() {
		var promise = DataApi.getWordData(this.word);
		if(promise) {
			promise.then((res) => {
				this.ui.ajaxLoading = false;
				this.wordData = res.data;
				this.$emit('data-done');
			});
		}
	},
	props: ['word'],
	methods: {
		pin() {
			this.pinned.push(this.word);
			UserApi.pin(this.word);
		},
		unpin() {
			this.pinned.splice(this.pinned.indexOf(this.word), 1);
			UserApi.unpin(this.word);
		}
	}
}
</script>

<style scoped>
@import '../../assets/css/flashcard.css';
</style>
