<!--景点管理-->
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
			<template #poiPhotoUrl="scope">
				<el-image :src="scope.row.poiPhotoUrl" style="max-height: 100px"/>
			</template>

			<!--操作插槽-->
			<template #menu="{row,index}">
				<el-button icon="el-icon-edit" plain
				           size="default"
				           text
				           type="primary"
				           @click.stop="editPoiImg(row,index)">修改图片
				</el-button>
			</template>
		</avue-crud>
	</div>


	<!-- 景点图片剪裁组件弹窗 -->
	<el-dialog
		v-model="cropperModel"
		fullscreen="fullscreen"
		title="裁切封面">
		<cropper-image
			:fixedNumber="[16,9]"
			:url="editPoi.poiPhotoUrl?editPoi.poiPhotoUrl:''"
			@upload-img="handleUpload">
		</cropper-image>
	</el-dialog>

</template>

<script>
import {getPageBaiduPoi, savePoiImgUrl} from "../../api/system/baiduPoi.js";
import useUpYun from "../../hooks/useUpYun.js";
import CropperImage from "../../components/CropperImage.vue";

export default {
	name: "UserMan",
	components: {CropperImage},
	data() {
		return {
			data: [],
			form: {},
			query: {},
			loading: true,
			option: {
				addBtn: false,
				editBtn: false,
				delBtn: false,
				height: 'auto',
				calcHeight: 150,
				tip: false,
				searchShow: true,
				searchMenuSpan: 6,
				card: true,
				excelBtn: true,
				border: true,
				index: true,
				viewBtn: false,
				selection: true,
				dialogClickModal: false,
				column: [
					{label: '图片', prop: 'poiPhotoUrl', slot: true},
					{label: '名称', prop: 'name', search: true},
					{
						label: '类型', prop: 'type', search: true,
						dicUrl: "/system/dict/getDictByCode?code=POI_TYPE",
						type: "select",
					},
					{label: '地址', prop: 'address', search: true},
					{label: '手机号', prop: 'telephone', search: true},
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
			cropperModel: false,
			editPoi: {}
		};
	},
	directives: {},
	created() {
	},
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
			let res = await getPageBaiduPoi(page.currentPage, page.pageSize, Object.assign(params, this.query))
			const data = res.data;
			this.page.total = data.total;
			this.data = data.records;
			this.loading = false;
			this.selectionClear();
		},
		editPoiImg(row, index) {
			this.$nextTick(() => {
				this.editPoi = row;
				this.cropperModel = true;
			})
		},
		//上传图片
		async handleUpload(data) {
			let {uploadPoiImg} = useUpYun();
			let res = await uploadPoiImg(data, this.editPoi.uid);
			if (res.success) {
				this.cropperModel = false;
				// 上传完保存
				await savePoiImgUrl(res.data, this.editPoi.uid)
				await this.onLoad(this.page, this.query);
			}
		},
	},
	mounted() {
	},
}
</script>

<style scoped>

</style>
