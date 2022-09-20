<template>
	<div v-if="infoItem!==undefined" style="padding: 10px;z-index: 100;position: absolute;">
		<el-row :gutter="20" class="section-top">
			<el-card :body-style="{padding: '10px',width:'200px'}" class="panel-card">
				<div slot="header" class="clearfix" style="margin-bottom: 10px;">{{ infoItem.name }}</div>
				{{ infoItem.address }}
				<el-button @click="seeLocationDetail(infoItem.uid)">查看详情</el-button>
			</el-card>
		</el-row>
	</div>
	<baidu-map :center="{lng: location.lng, lat: location.lat}" :scroll-wheel-zoom="true"
	           :zoom="15" class="map"
	           style="height: 800px;"
	>
		<!--	           mapType="BMAP_HYBRID_MAP"-->
		<!--		比例尺-->
		<bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
		<!--		缩放-->
		<bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
		<!--		城市列表-->
		<!--		<bm-city-list anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-city-list>-->

		<div v-for="item in locationInfo">
			<bm-marker :dragging="false"
			           :position="{lng: item.locationLng, lat: item.locationLat}" @click="infoItem= item;">
			</bm-marker>
		</div>
	</baidu-map>


	<el-dialog
		v-model="detailModel"
		title="查看地点详情">
		<el-card>

		</el-card>

	</el-dialog>

</template>

<script>
import {searchSights} from "../../../api/user/baiduMap.js";
import store from "../../../store/index.js";

export default {
	name: "SightsSearchPage",
	props: ['keys'],
	data() {
		return {
			location: {
				lat: '',
				lng: ''
			},
			locationInfo: [],
			infoItem: undefined,
			detailModel: false
		};
	},
	async created() {
		this.location.lat = store.state.location.point.lat
		this.location.lng = store.state.location.point.lng
		let region = store.state.location.address.city
		let searchRes = await searchSights("", this.location.lat + "," + this.location.lng, region);
		this.locationInfo = searchRes.data;
		console.log(searchRes);
	},
	async mounted() {

	},
	methods: {
		async seeLocationDetail(uid) {
			console.log(uid)
		}
	}
}
</script>

<style scoped>

</style>