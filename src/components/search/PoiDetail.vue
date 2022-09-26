<template>
	<!--	v-if 防止异步未完成报错-->
	<el-card v-if="poiDetail" :body-style="{ padding: '0px' }">
		<img
			:src="poiDetail.poiPhotoUrl"
			alt="" style="width: 100%;display: block;"/>
		<div style="padding: 14px">
			<span style="font-size: 16px;">{{ poiDetail.name }}</span>
			<div class="bottom">
				<span style="font-size: 12px;  color: #999;">
					地址：{{ poiDetail.address }}
				</span>
				<br>
				<el-button style=" padding: 0;min-height: auto;"
				           text
				           @click="this.$router.push({name: 'search', params: {words: poiDetail.uid}});">
					查看攻略
				</el-button>
			</div>
		</div>
	</el-card>
</template>

<script>
import {getPoiDetailById} from "../../api/user/baiduMap.js";

export default {
	name: "PoiDetail",
	props: ["poiId", "poi"],
	async created() {
		let res;
		if (this.poiId) {
			res = await getPoiDetailById(this.poiId);
			res = res.data;
		} else {
			res = this.poi;
		}
		this.poiDetail = res;
	},
	data() {
		return {
			poiDetail: null
		}
	}
}
</script>

<style scoped>

</style>