<template>
	<div v-if="infoItem!==undefined" style="padding: 10px;z-index: 100;position: absolute;">
		<el-row :gutter="20" class="section-top">
			<el-card :body-style="{padding: '10px',width:'200px'}" class="panel-card">
				<div slot="header" class="clearfix" style="margin-bottom: 10px;">{{ infoItem.name }}</div>
				{{ infoItem.address }}
				<el-button @click="getRoadToHotel(infoItem)">到这去</el-button>
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

		<!--		自己的位置-->
		<bm-marker :dragging="false"
		           :icon="{url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif', size: {width: 300, height: 157}}"
		           :position="{lng: location.lng, lat: location.lat}"/>

		<div v-for="item in locationInfo">
			<bm-marker :dragging="false"
			           :position="{lng: item.locationLng, lat: item.locationLat}" @click="infoItem= item;">
			</bm-marker>
		</div>

		<bm-driving v-if="roadModel"
		            :auto-viewport="true" :end="hotelLocation" :start="location"/>
	</baidu-map>

</template>

<script>

import store from "../../../store/index.js";
import {searchHotel} from "../../../api/user/baiduMap.js";
import PoiDetail from "../../../components/search/PoiDetail.vue";

export default {
	name: "HotelSearchPage",
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
			hotelLocation: {
				lat: '',
				lng: ''
			},
			roadModel: false
		}
	},
	watch: {
		async keys() {
			let searchRes = await this.searchHotelByKey(this.keys);
			this.locationInfo = searchRes.data;
		}
	},
	async created() {
		let searchRes = await this.searchHotelByKey(this.keys);
		this.locationInfo = searchRes.data;
	},
	async mounted() {

	},
	methods: {
		searchHotelByKey(key) {
			this.location.lat = store.state.location.point.lat
			this.location.lng = store.state.location.point.lng
			return searchHotel(key, this.location.lat + "," + this.location.lng);
		},
		getRoadToHotel(hotel) {
			console.log(hotel)
			this.hotelLocation.lat = hotel.locationLat;
			this.hotelLocation.lng = hotel.locationLng;
			this.roadModel = true
		}
	},
}
</script>

<style scoped>
.map {
	width: 100%;
	height: 300px;
}
</style>