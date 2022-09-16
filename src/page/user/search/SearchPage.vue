<template>
	<div class="site-content animate" style="padding-top: 80px;">
		<Search v-model:search-value="key" v-bind:need-suggest="needSuggest"></Search>
		<el-tabs v-model="activeName" class="demo-tabs" style="padding-top: 50px;"
		         @tab-click="handleClick">
			<el-tab-pane label="攻略" name="tactic">
				<tactic-search-page v-if="activeName==='tactic'" v-bind:keys="key"/>
			</el-tab-pane>
			<el-tab-pane label="景点" name="sights">
				<sights-search-page v-if="activeName==='sights'" v-bind:keys="key"/>
			</el-tab-pane>
			<el-tab-pane label="酒店" name="hotel">
				<hotel-search-page v-if="activeName==='hotel'" v-bind:keys="key"/>
			</el-tab-pane>
		</el-tabs>

	</div>
</template>

<script>

import Search from "../../../components/home/Search.vue";
import TacticSearchPage from "./TacticSearchPage.vue";
import SightsSearchPage from "./SightsSearchPage.vue";
import HotelSearchPage from "./HotelSearchPage.vue";

export default {
	name: "SearchPage",
	components: {HotelSearchPage, SightsSearchPage, TacticSearchPage, Search},
	props: [],
	created() {
		this.key = this.$route.params.words;
		// 更新vuex的用户位置状态
		this.$store.commit('REFRESH_USER_LOCATION');
	},
	data() {
		return {
			activeName: 'tactic',
			key: '',
		}
	},
	computed: {
		needSuggest() {
			return this.activeName !== "tactic";
		}
	},
	methods: {}
}
</script>

<style lang="less" scoped>

</style>

