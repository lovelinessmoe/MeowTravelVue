<template>
	<div id="map_container" style="height: 800px;"></div>
</template>

<script>
import {searchSights} from "../../../api/user/baiduMap.js";
import store from "../../../store/index.js";
import {ElButton} from "element-plus";

export default {
	name: "SightsSearchPage",
	props: ['keys'],
	data() {
		return {
			location: {
				lat: '',
				lng: ''
			},
		};
	},
	created() {
		this.location.lat = store.state.location.point.lat
		this.location.lng = store.state.location.point.lng
	},
	async mounted() {
		// 百度地图API功能
		let map = initMap({
			tilt: 30,
			heading: 0,
			center: [this.location.lng, this.location.lat],
			zoom: 15,
			style: whiteStyle,
		});

		// 添加比例尺控件
		let scaleCtrl = new BMapGL.ScaleControl();
		map.addControl(scaleCtrl);
		// 添加缩放控件
		let zoomCtrl = new BMapGL.ZoomControl();
		map.addControl(zoomCtrl);

		let searchRes = await searchSights("", this.location.lat + "," + this.location.lng);
		console.log(searchRes);

		for (let item of searchRes.data) {
			console.log(item)
			let point = new BMapGL.Point(item.location.lng, item.location.lat);
			let marker = new BMapGL.Marker(point);        // 创建标注
			map.addOverlay(marker);

			let opts = {
				width: 200,     // 信息窗口宽度
				height: 100,     // 信息窗口高度
				title: item.name, // 信息窗口标题
				message: "sss"
			}

			let infoWindow = new BMapGL.InfoWindow(item.address +
				'<br><input id="' + item.uid + '"' +
				' type="button" value="查看详细信息" />', opts);  // 创建信息窗口对象
			marker.addEventListener("click", function () {
				map.openInfoWindow(infoWindow, point); //开启信息窗口
			}); // 将标注添加到地图中

			let elb = new ElButton().$mount();

			document.getElementById(item.uid).append(elb.$el);
		}
	}
}
</script>

<style scoped>

</style>