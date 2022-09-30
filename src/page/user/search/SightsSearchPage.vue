<template>
	<div v-if="infoItem!==undefined" style="padding: 10px;z-index: 100;position: absolute;">
		<el-row :gutter="20" class="section-top">
			<el-card :body-style="{padding: '10px',width:'200px'}" class="panel-card">
				<div slot="header" class="clearfix" style="margin-bottom: 10px;">{{ infoItem.name }}</div>
				{{ infoItem.address }}
				<el-button @click="seeLocationDetail(infoItem.uid)">查看详情</el-button>
				<el-button @click="seeRecommendHotel(infoItem)">查看推荐酒店</el-button>
			</el-card>
		</el-row>
	</div>
	<baidu-map :center="{lng: location.lng, lat: location.lat}"
	           :scroll-wheel-zoom="true"
	           :zoom="10" class="map"
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
		<PoiDetail v-if="detailModel" :poi-id="detailId"></PoiDetail>
	</el-dialog>

	<el-dialog
		v-model="hotelRecommendModel"
		title="推荐酒店">
		<div style="display: flex;width: 100%;flex-wrap: wrap;justify-content: space-between;">
			<PoiDetail v-for="item in hotelRecommendList"
			           :poi="item" style="flex: 0 0 32%;border-radius: 10px;margin-bottom: 10px;"/>
		</div>
	</el-dialog>
</template>

<script>
import {searchHotel, searchSights} from "../../../api/user/baiduMap.js";
import store from "../../../store/index.js";
import PoiDetail from "../../../components/search/PoiDetail.vue";

export default {
	name: "SightsSearchPage",
	components: {PoiDetail},
	props: ['keys'],
	data() {
		return {
			location: {
				lat: '',
				lng: ''
			},
			locationInfo: [],
			infoItem: undefined,
			detailModel: false,
			detailId: undefined,
			hotelRecommendModel: false,
			hotelRecommendList: []
		};
	},
	watch: {
		async keys(value) {
			let searchRes = await this.searchSightsByKey(this.keys);
			this.locationInfo = searchRes.data;
		}
	},
	async created() {
		let searchRes = await this.searchSightsByKey(this.keys);
		this.locationInfo = searchRes.data;
	},
	async mounted() {

	},
	methods: {
		searchSightsByKey(key) {
			this.location.lat = store.state.location.point.lat
			this.location.lng = store.state.location.point.lng
			let region = store.state.location.address.city
			// return searchSights(key, this.location.lat + "," + this.location.lng, region);
			return searchSights(key, '', region);
		},
		async seeLocationDetail(uid) {
			this.detailId = uid;
			this.detailModel = true
		},
		async seeRecommendHotel(sight) {
			let res = await searchHotel("", sight.locationLat + "," + sight.locationLng);
			this.hotelRecommendList = res.data;
			this.hotelRecommendModel = true;
		}
	}
}
</script>

<style scoped>

</style>