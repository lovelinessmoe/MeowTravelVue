<template>
	<div class="home" style="margin-top: 80px;">
		<div class="site-content animate">
			<span style="font-size: 45px;color: #16bdb2;">我发布的旅游攻略</span>

			<!--文章列表-->
			<div class="site-main">
				<template v-for="(item,index) in postList" :key="item.tacticId">
					<UserEditBlogCard :blog="item" @deleteIt="deleteTactic"/>
				</template>
			</div>

			<!--加载更多-->
			<div v-show="hasNextPage" class="more">
				<div class="more-btn" @click="loadMore">More</div>
			</div>
		</div>
	</div>
</template>

<script setup>

import UserEditBlogCard from "../../../components/userTactic/UserEditBlogCard.vue";
import {onBeforeMount, ref} from "vue";
import {getUserTacticList} from "../../../api/user/tactic.js";

let hasNextPage = ref(false);
let postList = ref([]);
let current = ref(1);

onBeforeMount(async () => {
	await getListPage();
});

function deleteTactic() {
	current.value = 1;
	postList.value = [];
	getListPage();
}

async function getListPage(current = 1, size = 10) {
	let res = await getUserTacticList(current, size);
	res = res.data;
	postList.value = postList.value.concat(res.records || []);
	hasNextPage.value = res.hasNextPage;
}

async function loadMore() {
	await getListPage(++current.value);
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
