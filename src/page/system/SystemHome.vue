<template>
	<div id="map_container" style="height: 800px;"></div>
</template>

<script setup>
import {onMounted} from "vue";
import axios from "axios";

onMounted(async () => {
	// 百度地图API功能
	/*let map = new BMapGL.Map("map_container");
	map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 11);
	let local = new BMapGL.LocalSearch(map, {
		renderOptions: {map: map}
	});
	local.search("景点");*/
	let map = new BMapGL.Map("map_container");

	let point = new BMapGL.Point(105.348145, 37.976416);
	map.centerAndZoom(point, 5.0);

	map.setHeading(10);

	let view = new mapvgl.View({
		effects: [new mapvgl.BloomEffect({
			blurSize: 3
		})],
		map: map
	});

	let grid = new mapvgl.HeatGridLayer({
		max: 80, // 最大阈值
		min: 10, // 最小阈值
		// color: function() {
		//     return 'rgb(200, 255, 0)';
		// },
		gridSize: 500,
		// style: 'normal',
		gradient: { // 对应比例渐变色
			0: 'rgb(50, 50, 256)',
			0.3: 'rgb(178, 202, 256)',
			1: 'rgb(250, 250, 256)'
		},
		// textOptions: {
		//     show: true,
		//     color: '#f00'
		// },
		riseTime: 1800, // 楼块初始化升起时间
		maxHeight: 10000, // 最大高度
		minHeight: 200 // 最小高度
	});
	view.addLayer(grid);

	let rs = await axios.get('/beijing.json')
	rs = rs.data.result.data[0].bound
	console.dir(rs)
	let data = [];
	for (let i = 0; i < rs.length; i++) {
		let item = rs[i];
		data.push({
			geometry: {
				type: 'Point',
				coordinates: [item[0], item[1]]
			},
			properties: {
				count: item[2]
			}
		});
	}
	console.dir(data)
	grid.setData(data);

	// setTimeout(() => {
	//     grid.setOptions({
	//         gridSize: 100
	//     });
	// }, 5000);
});

</script>

<style lang="less" scoped>


</style>

