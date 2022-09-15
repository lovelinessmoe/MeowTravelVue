<template>
	<div id="search">
		<input v-model="searchValue" placeholder="  搜索。。。。" type="text"
		       @input="$emit('update:searchValue', $event.target.value)" @keyup.enter="search"/>
		<div v-if="suggestions.length!== 0 "
		     style="opacity: 0.8;border-radius: 50px;background-color: #c8edd9;
		     position: absolute;width: 400px;">
			<div v-for="(item, index) in suggestions"
			     :key="index" style="padding-bottom: 5px;padding-top: 5px;">
				<span style="padding-left: 45px;font-size: 20px;">{{ item.name }}</span>
			</div>
		</div>
	</div>
</template>

<script>
import {getSearchSuggestion} from "../../api/user/baiduMap.js";
import {ElNotification} from "element-plus";
import store from "../../store/index.js";

export default {
	name: "Search",
	data() {
		return {
			// searchValue: '',
			suggestions: [],
			region: '',
		};
	},
	props: ['needSuggest', 'searchValue'],
	watch: {
		searchValue(value) {
			//需要搜索建议
			if (this.needSuggest) {
				if (value === '') {
					this.suggestions = [];
				} else {
					let region = store.state.location.address.city;
					getSearchSuggestion(value, region).then((res) => {
						this.suggestions = res.data;
					})
				}
			}
		}
	},
	created() {
		this.getUserLocation();
	},
	methods: {
		search() {
			this.$router.push({name: 'search', params: {words: this.searchValue}});
		},
		getUserLocation() {
			let that = this;
			let geolocation = new BMapGL.Geolocation();
			geolocation.getCurrentPosition(function (r) {
				if (this.getStatus() === 0) {
					store.state.location = r;
				} else if (this.getStatus() === 8) {
					that.getUserLocation();
				} else {
					ElNotification({
						title: '错误',
						message: h('i', {style: 'color: teal'}, '没有提供权限定位'),
					});
				}
			});
		}
	},
	computed: {}
};
</script>

<style lang="less" scoped>


input {
	border: none;
	font-size: 32px;
	color: #c7254e;
	outline: none;
	overflow: hidden;
	background: transparent;
	height: 80px;
	transition: .2s all;
	width: 400px;
	//margin-left: 10px;
	border-radius: 50px;
	border: 1px solid #16bdb2;

	&:focus {
		border: 3px solid #8fd0cc;
	}
}

#search {
	display: inline-block;
	position: relative;

}

</style>