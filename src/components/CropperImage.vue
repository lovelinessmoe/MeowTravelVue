<!--图片裁剪-->
<template>
	<div class="cropper-content">
		<div class="cropper-box">
			<div class="cropper">
				<!--                        :autoCropWidth="option.autoCropWidth"-->
				<!--                        :autoCropHeight="option.autoCropHeight"-->
				<vue-cropper
					ref="cropper"
					:autoCrop="option.autoCrop"
					:canMove="option.canMove"
					:canMoveBox="option.canMoveBox"
					:canScale="option.canScale"
					:centerBox="option.centerBox"
					:enlarge="option.enlarge"
					:fixed="option.fixed"
					:fixedBox="option.fixedBox"
					:fixedNumber="fixedNumber"
					:full="option.full"
					:height="option.height"
					:img="option.img"
					:info="option.info"
					:infoTrue="option.infoTrue"
					:maxImgSize="option.maxImgSize"
					:mode="option.mode"
					:original="option.original"
					:outputSize="option.outputSize"
					:outputType="option.outputType"
					@imgLoad="imgLoad"
					@realTime="realTime">
				</vue-cropper>
			</div>
			<!--进度条-->
			<!--            <el-progress :percentage="percentage" :status="status"/>-->
			<!--底部操作工具按钮-->
			<div class="footer-btn">
				<div class="scope-btn">
					<label class="btn" for="uploads">选择封面</label>
					<input id="uploads" accept="image/png, image/jpeg, image/gif, image/jpg"
					       style="position:absolute; clip:rect(0 0 0 0);"
					       type="file" @change="selectImg($event)">
					<el-button icon="el-icon-zoom-in" plain size="mini" type="danger" @click="changeScale(1)">放大
					</el-button>
					<el-button icon="el-icon-zoom-out" plain size="mini" type="danger" @click="changeScale(-1)">缩小
					</el-button>
					<el-button plain size="mini" type="danger" @click="rotateLeft">↺ 左旋转</el-button>
					<el-button plain size="mini" type="danger" @click="rotateRight">↻ 右旋转</el-button>
				</div>
				<div class="upload-btn">
					<el-button size="mini" type="success" @click="uploadImg('blob')">上传封面 <i
						class="el-icon-upload"></i>
					</el-button>
				</div>
			</div>
		</div>
		<!--预览效果图-->
		<div class="show-preview">
			<div :style="previews.div" class="preview">
				<img :src="previews.url" :style="previews.img">
			</div>
		</div>
	</div>
</template>

<script>
import 'vue-cropper/dist/index.css'
import {VueCropper} from "vue-cropper";

export default {
	name: "CropperImage",
	components: {
		VueCropper
	},
	props: {
		fixedNumber: {default: () => [1, 1]},
		url: {type: String}
	},
	created() {
		this.option.img = this.url;
	},
	emits: ['upload-img-success'],
	data() {
		return {
			previews: {},
			option: {
				img: '',             //裁剪图片的地址
				outputSize: 0.7,       //裁剪生成图片的质量(可选0.1 - 1)
				outputType: 'png',  //裁剪生成图片的格式（jpeg || png || webp）
				info: true,          //图片大小信息
				canScale: true,      //图片是否允许滚轮缩放
				autoCrop: true,      //是否默认生成截图框
				// autoCropWidth: 230,  //默认生成截图框宽度
				// autoCropHeight: 150, //默认生成截图框高度
				fixed: true,         //是否开启截图框宽高固定比例
				// fixedNumber: [2, 1], //截图框的宽高比例
				full: true,         //false按原比例裁切图片，不失真
				fixedBox: true,      //固定截图框大小，不允许改变
				canMove: true,      //上传图片是否可以移动
				canMoveBox: false,    //截图框能否拖动
				original: false,     //上传图片按照原始比例渲染
				centerBox: true,    //截图框是否被限制在图片里面
				height: false,        //是否按照设备的dpr 输出等比例图片
				infoTrue: true,     //true为展示真实输出图片宽高，false展示看到的截图框宽高
				maxImgSize: 3000,    //限制图片最大宽度和高度
				enlarge: 1,          //图片根据截图框输出比例倍数
				mode: '230px 150px'  //图片默认渲染方式
			},
			// percentage: 0,
			// status: null,
		};
	},
	methods: {
		//初始化函数
		imgLoad(msg) {
			console.log(msg);
		},
		//图片缩放
		changeScale(num) {
			num = num || 1
			this.$refs.cropper.changeScale(num)
		},
		//向左旋转
		rotateLeft() {
			this.$refs.cropper.rotateLeft()
		},
		//向右旋转
		rotateRight() {
			this.$refs.cropper.rotateRight()
		},
		//实时预览函数
		realTime(data) {
			this.previews = data
		},
		//选择图片
		selectImg(e) {
			let file = e.target.files[0]
			if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(e.target.value)) {
				this.$message({
					message: '图片类型要求：jpeg、jpg、png',
					type: "error"
				});
				return false
			}
			//转化为blob
			let reader = new FileReader()
			reader.onload = (e) => {
				let data
				if (typeof e.target.result === 'object') {
					data = window.URL.createObjectURL(new Blob([e.target.result]))
				} else {
					data = e.target.result
				}
				this.option.img = data
			}
			//转化为base64
			reader.readAsDataURL(file)
		},
		//上传图片
		uploadImg(type) {
			if (type === 'blob') {
				//获取截图的blob数据
				this.$refs.cropper.getCropBlob(async (img) => {
					this.$emit('upload-img', img);
				})
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.cropper-content {
	display: flex;
	display: -webkit-flex;
	justify-content: flex-end;

	.cropper-box {
		flex: 1;
		width: 100%;

		.cropper {
			width: auto;
			height: 300px;
		}
	}

	.show-preview {
		flex: 1;
		-webkit-flex: 1;
		display: flex;
		display: -webkit-flex;
		justify-content: center;

		.preview {
			overflow: hidden;
			border: 1px solid #67c23a;
			background: #cccccc;
		}
	}
}

.footer-btn {
	margin-top: 30px;
	display: flex;
	display: -webkit-flex;
	justify-content: flex-end;

	.scope-btn {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		padding-right: 10px;
	}

	.upload-btn {
		flex: 1;
		-webkit-flex: 1;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
	}

	.btn {
		outline: none;
		display: inline-block;
		line-height: 1;
		white-space: nowrap;
		cursor: pointer;
		-webkit-appearance: none;
		text-align: center;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		outline: 0;
		-webkit-transition: .1s;
		transition: .1s;
		font-weight: 500;
		padding: 8px 15px;
		font-size: 12px;
		border-radius: 3px;
		color: #fff;
		background-color: #409EFF;
		border-color: #409EFF;
		margin-right: 10px;
	}
}
</style>

