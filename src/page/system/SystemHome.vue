<template>
	<div id="map_container" style="height: 800px;"></div>
</template>

<script setup>
import {onMounted} from "vue";
import {getUserLocationVisual} from "../../api/system/visual.js";

onMounted(async () => {
	// 百度地图API功能
	/*let map = new BMapGL.Map("map_container");
	map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 11);
	let local = new BMapGL.LocalSearch(map, {
		renderOptions: {map: map}
	});
	local.search("景点");*/


	var map = initMap({
		tilt: 30,
		heading: 0,
		center: [109.792816, 27.702774],
		zoom: 5,
		style: whiteStyle,
		skyColors: [
			// 地面颜色
			'rgba(226, 237, 248, 0)',
			// 天空颜色
			'rgba(186, 211, 252, 1)',
		],
	});


	// 添加比例尺控件
	let scaleCtrl = new BMapGL.ScaleControl();
	map.addControl(scaleCtrl);
	// 添加缩放控件
	let zoomCtrl = new BMapGL.ZoomControl();
	map.addControl(zoomCtrl);

	let data = [];
	// 构造数据

	let rs = await getUserLocationVisual()
	rs = rs.data
	let randomCount = rs.length
	while (randomCount--) {
		let temp = rs[randomCount]
		let cityName = temp.city;
		let cityCenter = mapv.utilCityCenter.getCenterByCityName(cityName);
		console.log(cityName, cityCenter)
		data.push({
			geometry: {
				type: 'Point',
				coordinates: [cityCenter.lng, cityCenter.lat],
			},
			properties: {
				text: cityName + '\n' + temp.ccount,
				// textColor: '#fff',
				// borderColor: ['#0f0', '#f00', '#00f'][randomCount % 3],
				// backgroundColor: ['#0f0', '#f00', '#00f'][randomCount % 3],
			},
		});
	}

	let view = new mapvgl.View({
		map: map,
	});

	let layer = new mapvgl.LabelLayer({
		textAlign: 'center',
		textColor: '#fc0',
		borderColor: '#666',
		backgroundColor: '#666',
		// pickedTextColor: '#fff',
		// pickedBorderColor: '#666',
		// pickedBackgroundColor: '#666',
		padding: [2, 5],
		borderRadius: 5,
		fontSize: 12,
		lineHeight: 16,
		collides: true, // 是否开启碰撞检测, 数量较多时建议打开
		enablePicked: true,
		autoSelect: true,
		onClick: e => {
			// 点击事件
			console.log('click', e);
		},
	});
	view.addLayer(layer);
	layer.setData(data);
});

</script>

<style lang="less" scoped>


</style>

