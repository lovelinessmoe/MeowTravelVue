<template>
	<div>
		<baidu-map :center="{lng: location.lng, lat: location.lat}" :zoom="15"
		           class="map" style="height: 800px;">
			<div v-for="item in locationInfo">
				<bm-marker :dragging="false"
				           :position="{lng: item.location.lng, lat: item.location.lat}" @click="item.open = true">
					<bm-info-window :show="item.open"
					                @close="item.open=false" @open="item.open = true">
						{{ item }}
					</bm-info-window>
				</bm-marker>
			</div>
		</baidu-map>
	</div>
</template>


<script>

import store from "../../../store/index.js";
import {searchSights} from "../../../api/user/baiduMap.js";

export default {
	name: "HotelSearchPage",
	data() {
		return {
			location: {
				lat: '',
				lng: ''
			},
			locationInfo: [],
		}
	},
	methods: {},
	async created() {
		this.location.lat = store.state.location.point.lat
		this.location.lng = store.state.location.point.lng
		let searchRes = await searchSights("", this.location.lat + "," + this.location.lng);
		for (let item of searchRes.data) {
			item.open = false;
		}
		this.locationInfo = searchRes.data;
		console.log(searchRes);
	}
}
</script>

<style scoped>
.map {
	width: 100%;
	height: 300px;
}
</style>