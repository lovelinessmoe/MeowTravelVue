<template>
	<div style="display: inline-block;position: relative;">
		<input v-model="searchValue" placeholder="  搜索。。。。" type="text"
		       @keyup.enter="search"/>
	</div>
</template>

<script>
export default {
	name: "Search",
	data() {
		return {searchValue: '',};
	},
	methods: {
		search() {
			console.log(this.searchValue)
			this.$router.push({name: 'search', params: {words: this.searchValue}});
		},
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
	margin-left: 10px;
	border-radius: 50px;
	border: 1px solid #16bdb2;

	&:focus {
		border: 3px solid #8fd0cc;
	}
}
</style>