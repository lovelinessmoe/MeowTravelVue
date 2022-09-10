<template>
	<div class="home">
		<banner isHome="true"></banner>
		<div class="site-content animate">
			<!--通知栏-->
			<div class="notify">
				<div v-if="hideSlogan" class="search-result">
					<span v-if="searchWords">搜索结果："{{ searchWords }}" 相关文章</span>
					<span v-else-if="category">分类 "{{ category }}" 相关文章</span>
				</div>
				<div v-else class="quote">
					{{ notice }}
				</div>
			</div>
			<!--文章列表-->
			<div :class="{'search':hideSlogan}" class="site-main">
				<section-title v-if="!hideSlogan">推荐</section-title>
				<template v-for="item in postList" :key="item.tacticId">
					<BlogCard :blog="item"></BlogCard>
				</template>
			</div>

			<!--加载更多-->
			<div v-show="hasNextPage" class="more">
				<div class="more-btn" @click="loadMore">More</div>
			</div>
		</div>
	</div>
</template>

<script>
import {getList} from "../api/tactic.js";
import Banner from "../components/BannerView.vue";
import sectionTitle from '../components/SectionTitle.vue'
import BlogCard from '../components/BlogCard.vue'
import SmallIco from '../components/SmallIco.vue'

export default {
	name: "HomePage",
	components: {Banner, sectionTitle, BlogCard, SmallIco},
	props: ['cate', 'words'],
	async created() {
		await this.getListPage();
	},
	data() {
		return {
			postList: [],
			current: 1,
			hasNextPage: false
		}
	},
	computed: {
		searchWords() {
			return this.$route.params.words
		},
		category() {
			return this.$route.params.cate
		},
		hideSlogan() {
			return this.category || this.searchWords
		},
		notice() {
			return "苟利国家生死以，岂因祸福避趋之";
			// return this.$store.getters.notice
		}
	},
	methods: {
		async getListPage(current = 1, size = 5, params = undefined) {
			let res = await getList(current, size, params);
			res = res.data;
			this.postList = this.postList.concat(res.records || []);
			this.hasNextPage = res.hasNextPage;
		},
		async loadMore() {
			await this.getListPage(++this.current);
		},
	}
}
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

