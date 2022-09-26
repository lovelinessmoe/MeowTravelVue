<template>
	<div>
		<div style="padding: 10px;z-index: 100;position: absolute;">
			<el-row :gutter="20" class="section-top">
				<el-card :body-style="{padding: '10px',width:'200px'}" class="panel-card">
					<div slot="header" class="clearfix">城市注册人数</div>
					<div v-for="(item, index) in locateData"
					     :key="index"
					     class="list">
						<span :class="'index'+(index+1)" class="index">{{ index + 1 }}</span>
						<!-- 没有统计时占空位 -->
						<div v-if="JSON.stringify(item) == '{}'" class="label-empty"> -</div>
						<div v-else class="label">
							<div class="name">
								<h4>{{ item.city }}</h4>
							</div>
						</div>
						<div class="value">{{ item.ccount || 0 }}</div>
					</div>
				</el-card>
			</el-row>
		</div>
		<div id="map_container" style="height: 800px;"></div>
	</div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {getUserLocationVisual} from "../../api/system/visual.js";

let locateData = ref([]);

onMounted(async () => {
	let map = initMap({
		tilt: 30,
		heading: 0,
		center: [100, 31],
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
	locateData.value = rs.data;
	rs = rs.data;
	let randomCount = rs.length;

	while (randomCount--) {
		let temp = rs[randomCount];
		let cityName = temp.city;
		let cityCenter = mapv.utilCityCenter.getCenterByCityName(cityName);
		data.push({
			geometry: {
				type: 'Point',
				coordinates: [cityCenter.lng, cityCenter.lat],
			},
			properties: {
				text: cityName + '\n' + temp.ccount,
				textColor: '#fff',
				borderColor: ['#69bd69', '#b65353', '#6060c2'][randomCount % 3],
				backgroundColor: ['#69bd69', '#b65353', '#6060c2'][randomCount % 3],
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
.section-top {
	padding-left: 60px;
	padding-top: 80px;
}

.list {
	padding: 5px 0;
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;
	border-bottom: 1px solid #ddd;

	&.last {
		border-bottom: none;
	}

	.index {
		color: #fff;
		text-align: center;
		width: 20px;
		height: 20px;
		line-height: 20px;
		background: #9195A3;
		border-radius: 4px;

		&.index1 {
			background: #FE2D46;
		}

		&.index2 {
			background: #F60;
		}

		&.index3 {
			background: #FAA90E;
		}
	}

	.label {
		font-size: 13px;
		flex: 2;
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;

		.img {
			margin: 0 5px;

			img {
				width: 35px;
				height: 35px;
				border-radius: 50%;
			}
		}

		.name {
			flex: 1;
		}

		h4 {
			margin: 0;
			font-weight: normal;
		}
	}

	.value {
		flex: 1;
		text-align: right;
	}

	.label-empty {
		flex: 1;
		height: 35px;
		line-height: 35px;
		font-size: 13px;
		text-align: center;
	}
}

.clearfix:before, .clearfix:after {
	display: table;
	content: "";
}

.clearfix:after {
	clear: both;
}

</style>

