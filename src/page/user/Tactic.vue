<!--文章展示页面-->
<template>
	<div class="articles">
		<banner :src="this.blog.imgUrl"></banner>
		<div class="site-content animate">
			<div class="site-main">
				<article class="hentry">
					<!-- 文章头部 -->
					<header class="entry-header">
						<!-- 标题输出 -->
						<h1 class="entry-title">{{ blog.title }}</h1>

						<hr>
						<div class="breadcrumbs">
							<span id="crumbs">
								最后更新时间：{{ this.$moment(blog.createTime).format('YYYY年MM月DD日') }}
							</span>
							<el-button text @click="this.$router.push({name: 'search', params: {words: blog.uid}});">
								查看同一地点攻略
							</el-button>
						</div>
					</header>
					<!-- 正文输出 -->
					<!--                    <div class="entry-content" v-html="blog.articleContent"></div>-->
					<div class="entry-content">
						<mavon-editor
							id="mavon_editor"
							v-model="blog.content"
							:boxShadow="false" :editable="false"
							:ishljs="true" :scrollStyle="true"
							:subfield="false" :toolbarsFlag="false"
							defaultOpen="preview"
						/>
					</div>
					<!-- 文章底部 -->
					<section-title>
						<footer class="post-footer">
							<div class="post-like">
								<span v-if="blog.uid">
									你觉得这个景点怎么样
									<el-rate v-model="rate_val" allow-half @change="submitRate"/>
								</span>
								<!-- 阅读次数 -->
								<i class="iconfont iconeyes"></i>
								<span class="count">{{ blog.viewsCount }}</span>
							</div>
							<!-- 赞助按钮 -->
							<div class="donate" @click="donateTactic()">
								<span>赏</span>
								<ul :class="{'show':showDonate}" class="donate_inner">
									<!--									<li >
																			<el-button type="primary" plain @click="paySponsor(5)">5元</el-button>
																		</li>
																		<li >
																			<el-button type="primary" plain>5元</el-button>
																		</li>-->
									<iframe :srcdoc="payHtml"
									        border="0"
									        frameborder="no"
									        height="75"
									        marginheight="0"
									        marginwidth="0"
									        scrolling="no"
									        style="overflow:hidden;"
									        width="75">
									</iframe>
								</ul>
							</div>
						</footer>
					</section-title>

					<!--声明-->
					<div class="open-message">
						<p>声明：Meow博客|版权所有，违者必究|如未注明，均为原创</p>
						<p>转载：转载请注明原文链接</p>
					</div>
					<!--评论-->
					<div class="comments" style="text-align: center">
						<el-button v-if="!commentEdit" type="success" @click="commentEdit=true">
							留个言吧
						</el-button>
						<div v-else>
							<mavon-editor v-model="this.replyComment.content" style="z-index: 0;"/>
							<el-button circle icon="Check"
							           style="float: right; position: relative;top: -32px;z-index: 1;"
							           type="success"
							           @click="submitReply"/>
						</div>

						<comment v-for="item in comments" :key="item.commentId" :comment="item"
						         @refreshComment="this.getComment">
							<template v-if="item.children?item.children.length:false">
								<comment v-for="reply in item.children" :key="reply.commentId"
								         :comment="reply"/>
							</template>
						</comment>
					</div>
				</article>
			</div>
		</div>
	</div>
</template>

<script>
import Banner from '../../components/home/BannerView.vue'
import sectionTitle from '../../components/home/SectionTitle.vue'
import comment from '../../components/CommentView.vue'
import {getBlogDetail} from "../../api/user/tactic.js";
import {addComment, getComment} from "../../api/user/comment.js";
import {ElNotification} from "element-plus";
import {getPoiRate, submitPoiRate} from "../../api/user/user_rate_poi.js";
import {getPayStateApi, paySponsorApi} from "../../api/user/pay.js";

export default {
	name: 'Tactic',
	data() {
		return {
			showDonate: false,
			comments: [],
			blog: {},
			replyComment: {
				tacticId: this.$route.params.id,
				content: '',
				level: '0',
				pid: '0',
			},
			commentEdit: false,
			rate_val: null,
			payHtml: null,
			sponsorId: null
		}
	},
	components: {
		Banner,
		sectionTitle,
		comment,
	},
	methods: {
		async getComment() {
			let res = await getComment(this.$route.params.id);
			this.comments = res.data || [];
		},
		async getBlog() {
			let res = await getBlogDetail(this.$route.params.id);
			this.blog = res.data;
			if (this.blog.uid != null) {
				await this.getRate();
			}
		},
		async submitReply() {
			if (this.$store.state.user) {
				let res = await addComment(this.replyComment);
				if (res.success) {
					ElNotification({
						message: '成功',
						type: 'success'
					})
					await this.getComment();
				}
			} else {
				ElNotification({
					message: '请登录后操作',
					type: 'warning'
				})
			}
		},
		submitRate(val) {
			submitPoiRate(val, this.blog.uid);
		},
		async getRate() {
			let res = await getPoiRate(this.blog.uid);
			this.rate_val = res.data;
		},
		paySponsor(num) {
			paySponsorApi({
				tacticId: this.blog.tacticId,
				money: num
			}).then((res) => {
				/*const div = document.createElement('div')
				div.innerHTML = res.data
				document.body.appendChild(div)
				document.forms[0].submit()*/
				this.payHtml = res.data.pay;
				this.sponsorId = res.data.sponsorId;
				this.getPaySate(this.sponsorId);
			})
		},
		async getPaySate(sponsorId) {
			if (sponsorId !== null) {
				// 请求获取状态
				let res = await getPayStateApi(sponsorId);
				if (res.data) {
					this.sponsorId = null;
					ElNotification({
						message: '赞助成功', type: 'success'
					})
				} else {
					// 如果是打开着的
					if (this.showDonate) {
						// 过2s调用
						setTimeout(() => {
							this.getPaySate(sponsorId);
						}, 2000);
					}
				}
			}
		},
		donateTactic() {
			// 如果不展开展开的时候就请求赞助支付接口
			if (!this.showDonate) {
				this.paySponsor(6);
			}
			this.showDonate = !this.showDonate;
		}
	},
	mounted() {
		this.$store.commit('SET_LOADING', false);
	},
	updated() {
	},
	created() {
		this.getBlog();
		this.getComment();
	},
}
</script>
<style lang="less" scoped>
.site-content {
	position: relative;

	.site-main {
		/*padding: -300px 0 0 0;*/
	}
}

#article-menus {
	position: sticky;
	top: 0;
	box-shadow: 0 2px 6px rgba(0, 0, 0, .1);
	border-radius: 3px;
	padding: 15px;
	width: 200px;
	transform: translateX(-240px) translateY(150px);
	font-size: 14px;
}

article.hentry {
	.entry-header {
		.entry-title {
			font-size: 23px;
			font-weight: 600;
			color: #737373;
			margin: 0.67em 0;

			&:before {
				content: "#";
				margin-right: 6px;
				color: #d82e16;
				font-size: 20px;
				font-weight: 600;
			}
		}

		hr {
			height: 1px;
			border: 0;
			background: #EFEFEF;
			margin: 15px 0;
		}

		.breadcrumbs {
			font-size: 14px;
			color: #D2D2D2;
			text-decoration: none;
			margin-bottom: 30px;
		}
	}

	.entry-content {
		#mavon_editor {
			z-index: 0;
		}
	}

	footer.post-footer {
		width: 100%;
		padding: 20px 10px;
		margin-top: 30px;
		height: 65px;
		position: relative;

		i {
			font-size: 18px;
			margin-right: 5px;
		}

		.post-like {
			float: right;
			margin: 7px 0 0 20px;
		}

		.post-share {
			float: right;
			list-style: none;
			margin-right: 20px;
		}

		.donate {
			float: left;
			line-height: 36px;
			border-radius: 100%;
			-webkit-border-radius: 100%;
			-moz-border-radius: 100%;
			border: 1px solid #2B2B2B;

			&:hover {
				border: 1px solid goldenrod;

				span {
					color: goldenrod;
				}
			}

			span {
				color: #2B2B2B;
				padding: 10px;
				position: relative;
				cursor: pointer;
			}

			.donate_inner {
				display: none;
				margin: 0;
				list-style: none;
				position: absolute;
				left: 80px;
				top: -10px;
				background: #FFF;
				padding: 10px;
				border: 1px solid #ddd;
				box-shadow: 0 2px 6px rgba(0, 0, 0, .08);
				border-radius: 3px;

				&.show {
					display: block;
				}

				li {
					float: left;
				}

				img {
					width: 100px;
				}

				p {
					text-align: center;
					font-size: 15px;
					color: #D2D2D2;
					line-height: 1rem;
				}
			}

			.donate_inner:after, .donate_inner:before {
				content: "";
				position: absolute;
				left: 0;
				bottom: 45%;
				margin-left: -8px;
				border-top: 8px solid transparent;
				border-bottom: 8px solid transparent;
				border-right: 8px solid #fff;
			}

			.donate_inner:before {
				left: -1px;
				border-right: 8px solid #ddd;
			}

		}

		.post-tags {
			margin: 7px 0 0 20px;
			float: left;
			text-transform: uppercase;

			a:hover {
				color: #ff6d6d;
			}
		}
	}

	.open-message {
		margin: 50px 0;
		position: relative;
		background: #2B2B2B;
		padding: 10px 30px;
		border-radius: 3px;
		font-size: 14px;
		color: #fff;

		&:after {
			content: "";
			border-left: 10px solid transparent;
			border-right: 10px solid transparent;
			border-bottom: 10px solid #2B2B2B;
			position: absolute;
			top: -8px;
			left: 48%;
		}

		p {
			margin: 10px 0;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		a {
			color: #A0DAD0;
			padding: 0 5px;
		}
	}
}
</style>
