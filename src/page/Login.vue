<!--登陆-->
<template>
	<!--登录表单的容器-->
	<div class="login_container"
	     style="background-image: url('https://s2.loli.net/2022/04/03/NxQafWFpP5YkTm3.jpg');
                background-repeat: no-repeat;background-size: cover">
		<!--登录区域-->
		<div class="login_box">
			<el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login_form">
				<el-form-item prop="email">
					<el-input v-model="loginForm.email" placeholder="请输入邮箱"
					          prefix-icon="Message"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input v-model="loginForm.password" placeholder="请输入登录密码"
					          prefix-icon="Lock" type="password"></el-input>
				</el-form-item>
				<el-form-item v-if="type === 'register'" prop="password">
					<el-input v-model="loginForm.RePassword" placeholder="请重复输入一次登录密码"
					          prefix-icon="Lock" type="password"></el-input>
				</el-form-item>
				<el-form-item v-if="type === 'register'" prop="username">
					<el-input v-model="loginForm.userName" placeholder="请输入用户昵称"
					          prefix-icon="User"></el-input>
				</el-form-item>
				<el-form-item prop="verifyCode">
					<div class="verifyCode_box">
						<el-input ref="verifyCode" v-model="loginForm.code"
						          class="verifyCode"
						          placeholder="请输入验证码" prefix-icon="Grid"></el-input>
						<img alt="你瞅啥" class="verifyCode_img" v-bind:src="captchaImg" @click="captcha">
					</div>
				</el-form-item>
				<el-form-item v-if="type === 'register'" prop="mailCode">
					<div class="email_box">
						<el-input ref="mailCode" v-model="loginForm.mailCode"
						          class="mailCode"
						          placeholder="请输入邮箱验证码" prefix-icon="Watermelon"></el-input>
						<el-button :disabled="!loginForm.code" class="email_button" type="primary"
						           @click="getEmailCode()">获取邮箱验证码
						</el-button>
					</div>
				</el-form-item>
				<el-form-item class="login_btn">
					<el-button v-if="type === 'register'" type="primary" @click="submitForm('loginForm')">注册
					</el-button>
					<el-button v-else type="primary" @click="submitForm('loginForm')">登陆</el-button>
					<el-button @click="resetForm('loginForm')">重置</el-button>
					<el-button v-if="type === 'register'" @click="type = 'login'">返回登陆</el-button>
					<el-button v-else @click="type = 'register'">去注册</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import {captcha, getRegisterEmail, login, register} from '../api/login'
import {ElNotification} from 'element-plus'
import {setUser} from "../store/token.js";

export default {
	name: "LoginComponent",
	data() {
		return {
			type: "login",
			loginForm: {
				userName: '',
				password: '',
				email: '',
				code: '',
				captchaVerification: '',
				RePassword: '',
				mailCode: '',
				province: '',
				city: '',
				district: '',
				street: '',
			},
			captchaImg: null,
			loginRules: {
				userName: [{
					required: true,
					message: '请输入用户名称',
					trigger: 'blur'
				}, {
					min: 3,
					max: 16,
					message: '长度在 3 到 16 个字符',
					trigger: 'blur'
				}],
				password: [{
					required: true,
					message: '请输入登录密码',
					trigger: 'blur'
				}, {
					min: 3,
					max: 16,
					message: '长度在 3 到 16 个字符',
					trigger: 'blur'
				}],
				RePassword: [{
					required: true,
					message: '请重复输入一次登录密码',
					trigger: 'blur'
				}],
				verifyCode: [{
					required: true,
					message: '请输入验证码',
					trigger: 'blur'
				}],
				email: [{
					required: true,
					message: '请输入邮箱',
					trigger: 'blur'
				}]
			},
		}
	},
	created() {
		this.captcha();
		this.locationInfoInsert();
	},
	methods: {
		async submitForm() {
			if (this.type === 'login') {
				const res = await login(this.loginForm)
				if (res.success) {
					setUser(res.data);
					ElNotification({
						message: '登陆成功',
						type: 'success'
					});
					await this.$router.push('/travel/home');
				} else {
					//重新获取验证码
					await this.captcha()
					//验证码获得焦点
					this.$refs.verifyCode.$el.querySelector('input').focus()
				}
			} else {
				if (this.loginForm.RePassword !== this.loginForm.password) {
					ElNotification({
						message: '两次输入的密码不相同',
						type: 'error'
					})
					return false;
				}
				const res = await register(this.loginForm)
				if (res.success) {
					ElNotification({
						message: '注册成功，快去登陆吧',
						type: 'success'
					})
					//重新获取验证码
					await this.captcha()
					//验证码获得焦点
					this.$refs.verifyCode.$el.querySelector('input').focus()
					this.type = 'login'
				} else {
					//重新获取验证码
					await this.captcha()
					//验证码获得焦点
					this.$refs.verifyCode.$el.querySelector('input').focus()
				}
			}
		},
		resetForm(formName) {
			this.$refs[formName].resetFields()
		},
		locationInfoInsert() {
			let that = this;
			let geolocation = new BMapGL.Geolocation();
			geolocation.getCurrentPosition(function (r) {
				if (this.getStatus() == BMAP_STATUS_SUCCESS) {
					let lng = r.point.lng;
					let lat = r.point.lat;
					let myGeo = new BMapGL.Geocoder();
					// 根据坐标得到地址描述
					myGeo.getLocation(new BMapGL.Point(lng, lat), function (result) {
						if (result) {
							console.log(result)
							that.loginForm.province = result.addressComponents.province;
							that.loginForm.city = result.addressComponents.city;
							that.loginForm.district = result.addressComponents.district;
							that.loginForm.street = result.addressComponents.street;
						}
					});
				} else if (this.getStatus() == ERR_POSITION_UNAVAILABLE) {
					that.locationInfoInsert()
				} else {
					ElNotification({
						title: '错误',
						message: h('i', {style: 'color: teal'}, '没有提供权限定位'),
					})
				}
			});
		},

		async captcha() {
			let captchaRes = await captcha()
			this.captchaImg = captchaRes.data.img
			this.loginForm.captchaVerification = captchaRes.data.captchaVerification
			this.loginForm.code = ''
		},
		async getEmailCode() {
			if (this.loginForm.userName === '' || this.loginForm.email === '' || this.loginForm.code === '') {
				ElNotification({
					message: '请输入用户名或邮箱或验证码',
					type: 'error'
				})
				return false;
			}
			let res = await getRegisterEmail(this.loginForm);
			if (res.success) {
				ElNotification({
					message: '发送成功',
					type: 'success'
				})
			} else {
				//重新获取验证码
				await this.captcha()
				//验证码获得焦点
				this.$refs.verifyCode.$el.querySelector('input').focus()
			}
		}
	}
}
</script>

<style lang="less" scoped>
.login_container {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 80px;
	min-height: calc(100vh - 80px);
}

.login_box {
	border: 1px solid red;
	margin: 0 auto;
	padding: 20px;
	background-color: whitesmoke;
	width: 300px;
	border-radius: 18px;

	.login_form {
		width: 100%;

		.login_btn {
			display: flex;
			justify-content: flex-end;
		}

		.verifyCode_box {
			width: 100%;
			display: flex;

			.verifyCode {
				width: 50%;
				justify-content: left;
			}

			.verifyCode_img {
				width: 50%;
				height: 30px;
				justify-content: flex-end;
			}
		}

		.email_box {
			width: 100%;
			display: flex;

			.mailCode {
				width: 50%;
				justify-content: left;
			}

			.email_button {
				width: 50%;
				height: 30px;
				justify-content: flex-end;
			}
		}
	}
}
</style>
