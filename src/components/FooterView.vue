<template>
	<div id="layout-footer">
		<div class="footer-main">
			<!--<div class="footer-item" v-if="socials.length">
				<div v-for="item in socials" :key="item.id"><a target="_blank" class="out-link" :href="item.href"><i
						class="iconfont" :class="item.icon"></i>{{item.title}}</a></div>
			</div>-->
			<div class="footer-item">
				<div style="font-size:17px;font-weight: bold;">资源</div>
				<div><a class="out-link" href="https://segmentfault.com/weekly?utm_source=sf-footer" target="_blank">每周精选</a>
				</div>
				<div><a class="out-link" href="https://blog.daliansky.net/" target="_blank">黑果小兵的部落阁</a></div>
				<div><a class="out-link" href="https://www.liaoxuefeng.com/" target="_blank">廖雪峰的官方网站</a></div>
			</div>
			<div class="footer-item">
				<div>
					<span>喵喵出行由</span>
					<!--                    <img height="20" src="@/assets/img/upyun_logo.svg" style="vertical-align:middle;" width="40"/>-->
					<a class="out-link" href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral"
					   target="_blank"> 又拍云 </a>
					<span>提供CDN加速/云存储服务</span>
				</div>
			</div>
		</div>
		<div class="copyright">Copyright © 2022 by <a class="out-link" href="https://www.ashes.vip" target="_blank">ashes.vip</a>
			. All rights reserved. |
			<a class="out-link" href="https://www.beian.miit.gov.cn" target="_blank">蒙ICP备2021003323号-2</a>
		</div>
	</div>
</template>

<script>
export default {
	name: "FooterView",
}
</script>


<style lang="less" scoped>
#layout-footer {
	padding: 2%;
	border-top: 1px solid #F7F7F7;
	font-size: 13px;
	color: #9c9c9c;

	a.out-link:hover {
		color: #ff6d6d;
	}

	.footer-main {
		max-width: 800px;
		margin: 0 auto 20px auto;
		display: flex;
		justify-content: space-around;
		align-items: flex-start;

		.footer-item {
			flex: 1;


			& > div:not(:last-child) {
				margin-bottom: 10px;
			}

			i {
				margin-right: 10px;
			}
		}
	}

	.copyright {
		text-align: center;
	}
}

/*****/
@media (max-width: 800px) {
	#layout-footer {
		.footer-main .footer-item:nth-child(3) {
			flex: 2;
		}
	}
}

@media (max-width: 600px) {
	#layout-footer {
		.footer-main {
			display: block;

			.footer-item {
				display: flex;
				justify-content: space-around;
				align-items: center;
				flex-wrap: wrap;

				& > div {
					margin-bottom: 10px;
				}
			}
		}
	}
}

/*****/
</style>
