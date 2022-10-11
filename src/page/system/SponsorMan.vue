<!--赞助管理-->
<template>
	<div class="animate" style="margin-top: 80px;padding: 20px;">
		<avue-crud
			ref="crud"
			v-model="form"
			v-model:page="page"
			:data="data"
			:option="option"
			:table-loading="loading"
			@current-change="currentChange"
			@on-load="onLoad"
			@refresh-change="refreshChange"
			@search-change="searchChange"
			@search-reset="searchReset"
			@selection-change="selectionChange"
			@size-change="sizeChange">

		</avue-crud>
	</div>
</template>

<script>
import {getList,} from "../../api/system/sponsor.js";

export default {
	name: "sponsorMan",
	components: {},
	data() {
		return {
			data: [],
			form: {},
			query: {},
			loading: true,
			option: {
				addBtn: false,
				menu: false,
				height: 'auto',
				calcHeight: 145,
				tip: false,
				searchShow: true,
				searchMenuSpan: 6,
				card: true,
				excelBtn: true,
				border: true,
				index: true,
				selection: true,
				dialogClickModal: false,
				column: [
					{label: '文章标题', prop: 'title', width: 200, search: true},
					{label: '赞助者名称', prop: 'userName', search: true},
					{label: '赞助者邮箱', prop: 'email', search: true},
					{label: '金额', prop: 'money',},
					{
						label: '类型', prop: 'type', search: true, type: 'select',
						dicData: [
							{label: '已支付', value: true,},
							{label: '未支付', value: false,},
						],
					},
				]
			},
			currentStartIndex: 0,
			currentEndIndex: 20,
			page: {
				pageSize: 10,
				currentPage: 1,
				total: 0
			},
			selectionList: [],
			editVisible: false,
			articleTitleDisable: false,
			commentModel: false,
			//查看评论时使用的查询条件
			tacticId: '',
		};
	},
	directives: {},
	computed: {},
	methods: {
		searchReset() {
			this.query = {};
			this.onLoad(this.page);
		},
		searchChange(params, done) {
			this.query = params;
			this.page.currentPage = 1;
			this.onLoad(this.page, params);
			done();
		},
		selectionChange(list) {
			this.selectionList = list;
		},
		selectionClear() {
			this.selectionList = [];
			this.$refs.crud.toggleSelection();
		},
		currentChange(currentPage) {
			this.page.currentPage = currentPage;
		},
		sizeChange(pageSize) {
			this.page.pageSize = pageSize;
		},
		refreshChange() {
			this.onLoad(this.page, this.query);
		},
		async onLoad(page, params = {}) {
			this.loading = true;
			let res = await getList(page.currentPage, page.pageSize, Object.assign(params, this.query))
			const data = res.data;
			this.page.total = data.total;
			this.data = data.records;
			this.loading = false;
			this.selectionClear();
		}
	},
	mounted() {
		this.$store.commit('SET_LOADING', false);
	},
}
</script>

<style scoped>

</style>
