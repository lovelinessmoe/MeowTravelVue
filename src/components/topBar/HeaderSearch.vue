<!--搜索-->
<template>
	<div class="header-search">
		<i class="iconfont iconsearch" @click.stop="click"></i>
		<input ref="searchInput" v-model="searchValue" :class="{'show':show}" type="text" @click.stop=""
		       @keyup.enter="search"/>
	</div>
</template>

<script>
export default {
	name: "HeaderSearch",
	data() {
		return {
			searchValue: '',
			show: false
		}
	},
	watch: {
		show(value) {
			if (value) {
				document.body.addEventListener('click', this.close)
			} else {
				document.body.removeEventListener('click', this.close)
			}
		}
	},
	methods: {
		search() {
			console.log(this.searchValue)
			this.$router.push({name: 'search', params: {words: this.searchValue}});
			this.close()
		},
		click() {
			this.searchValue = ''
			this.show = !this.show
			if (this.show) {
				this.$refs.searchInput && this.$refs.searchInput.focus()
			}
		},
		close() {
			this.$refs.searchInput && this.$refs.searchInput.blur()
			this.show = false
		}
	}
}
</script>

<style lang="less" scoped>
.header-search {
	display: inline-block;
	position: relative;

	i {
		font-size: 18px;
		position: relative;
		top: 3px;
	}

	input {
		border: none;
		outline: none;
		overflow: hidden;
		background: transparent;
		height: 30px;
		width: 0;
		transition: .2s all;

		&.show {
			width: 200px;
			margin-left: 10px;
		}

		&:focus {
			border-bottom: 1px solid #8fd0cc;
		}
	}
}
</style>
