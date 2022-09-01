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


.quote {
	border-left: 3px solid #ff6d6d;
	background-color: #FBFBFB;
	padding: 15px 20px;
	border-radius: 3px;
}

.site-content {
	.notify {
		margin: 60px 0;
		border-radius: 3px;

		& > div {
			padding: 20px;
		}
	}


	.search-result {
		padding: 15px 20px;
		text-align: center;
		font-size: 20px;
		font-weight: 400;
		border: 1px dashed #ddd;
		color: #828282;
	}
}

.top-feature {
	width: 100%;
	height: auto;
	margin-top: 30px;

	.feature-content {
		margin-top: 10px;
		display: flex;
		justify-content: space-between;
		position: relative;

		.feature-item {
			width: 32.9%;
		}
	}
}

.site-main {
	padding-top: 80px;

	&.search {
		padding-top: 0;
	}
}

.more {
	margin: 50px 0;

	.more-btn {
		width: 100px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		color: #ADADAD;
		border: 1px solid #ADADAD;
		border-radius: 20px;
		margin: 0 auto;
		cursor: pointer;

		&:hover {
			color: #8fd0cc;
			border: 1px dashed #8fd0cc;
		}
	}
}

/******/
@media (max-width: 800px) {
	.top-feature {
		display: none;
	}

	.site-main {
		padding-top: 40px;
	}

	.site-content {
		.notify {
			margin: 30px 0 0 0;
		}

		.search-result {
			margin-bottom: 20px;
			font-size: 16px;
		}
	}
}

/******/
</style>

