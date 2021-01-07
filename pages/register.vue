<template>
	<div id="cantainer">
		<div class="logo">
			<nuxt-link to="/">
				<img src="~assets/image/logo.png" alt="logo" />
			</nuxt-link>
		</div>
		<div class="content">
			<p class="con_top">全球领先的资产交易平台</p>
			<p class="con_center">
				<span>追赶</span>
				<span>超越</span>
				<span>引领</span>
			</p>
			<img src="../static/image/banner2.png" alt width="401px" height="90px" />
			<div class="con_bottom">
				<img class="register_icon" src="~assets/image/login_icon1.png" alt />
				<img class="register_icon" src="~assets/image/login_icon2.png" alt />
				<img class="register_icon" src="~assets/image/login_icon3.png" alt />
			</div>
		</div>
		<div class="registerContent">
			<div class="register_method">
				<span :class="act == 1 ? 'login_act':''" @click="emailMethod">邮箱注册</span>
				<span :class="act == 2 ? 'login_act':''" @click="phoneMethod">手机注册</span>
				<span>简体中文</span>
			</div>
			<form v-if="registerType==='email'" @submit="form_submit">
				<p>邮箱地址</p>
				<input type="email" name="name" v-model="name" @blur="c_email" />
				<p>
					密码
					<span>确认密码</span>
				</p>
				<input type="password" name="pwd" v-model="pwd" @blur="c_pwd" />

				<input type="password" name="userpwd" v-model="pwd1" @blur="checkpwd" />
				<!-- <p>图形验证码</p>
				<input type="text" name="cap" v-model="code" />
				<span ref="txyzm">
					<img class="codeImg" :src="codeImg" @click="getcode" alt />
				</span> -->
				<p>邮箱验证码</p>
				<input type="text" name="code" v-model="yzm" />
				<input v-show="show" type="button" value="点击获取" @click="sendRegCode" />
				<span class="regSendCodeTime" v-show="!show">{{count}}s</span>
				<p>邀请码（可选）</p>
				<input type="text" v-model="inviteCode" onkeyup="this.value=this.value.replace(/\D/g,'')" />
				<br />
				<input type="checkbox" ref="agressments" />
				<span>我已阅读并同意</span>
				<span class="agreement">《用户政策及隐私协议》</span>
				<br />
				<input type="submit" value="注册" />
				<p>
					已有账号，
					<span>
						<nuxt-link to="login">去登录</nuxt-link>
					</span>
				</p>
			</form>
			<form v-else-if="registerType==='phone'" @submit="form_submit">
				<p>手机号码</p>
				<input type="text" @change="checked_phone(name)" maxlength="11" minlength="11" name="name" v-model="name" onkeyup="this.value=this.value.replace(/\D/g,'')" />
				<p>
					密码
					<span>确认密码</span>
				</p>
				<input type="password" name="pwd" v-model="pwd" @blur="c_pwd" />

				<input type="password" name="pwd1" v-model="pwd1" @blur="checkpwd" />
				<!-- <p>图形验证码</p>
				<input type="text" name="cap" v-model="code" />
				<span ref="txyzm">
					<img class="codeImg" :src="codeImg" @click="getcode" alt />
				</span> -->
				<p>手机验证码</p>
				<input type="text" v-model="yzm" />
				<input v-show="showPhone" type="button" value="点击获取" @click="sendRegCodePhone" />
				<span class="regSendCodeTime" v-show="!showPhone">{{count}}s</span>
				<p>邀请码（可选）</p>
				<input type="text" v-model="inviteCode" onkeyup="this.value=this.value.replace(/\D/g,'')" />
				<br />
				<input ref="agressments" type="checkbox" />
				<span>我已阅读并同意</span>
				<span class="agreement">《用户政策及隐私协议》</span>
				<br />
				<input type="submit" value="注册" />
				<p>
					已有账号，
					<span>
						<nuxt-link to="login">去登录</nuxt-link>
					</span>
				</p>
			</form>
		</div>
	</div>
</template>
<script>
	import axios from "axios";
	import qs from "qs";
	import {
		Message
	} from "element-ui";
	export default {
		components: {},

		data() {
			return {
				registerType: "email",
				name: "",
				pwd: "",
				pwd1: "",
				code: "",
				yzm: "",
				cap: "",
				codeImg: "",
				inviteCode: "",
				act: 1,
				show: true,
				showPhone: true,
				count: "",
				timer: null,
				emailorphone: this.$route.params.emailorphone
			};
		},
		mounted() {
			this.getcode();
			this.getregInfo();
		},
		methods: {
			c_email() {
				var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
				if (!re.test(this.name)) {
					Message({
						showClose: true,
						message: "邮箱格式不正确"
					});
					return;
				}
			},
			//获取首页注册信息
			getregInfo() {
				var _this = this;
				var info = this.$route.params.emailorphone;
				if (info) {
					if (info.indexOf("@") != -1) {
						this.name = this.$route.params.emailorphone;
						console.log(this.$route.params.emailorphone);
					} else {
						this.registerType = "phone";
						this.act = 2;
						this.name = this.$route.params.emailorphone;
					}
				}
			},
			c_pwd() {
				var c_pwd = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{8,20}$/;
				if (!c_pwd.test(this.pwd)) {
					Message({
						showClose: true,
						message: "密码8~20位，且为字母、数字、符号等任意2种以上组合。"
					});
					this.pwd = "";
					return;
				}
			},
			checked_phone(name) {
				if (name.length < 11) {
					Message({
						showClose: true,
						message: "手机格式错误"
					});
				}
			},
			phoneMethod() {
				this.registerType = "phone";
				this.act = 2;
				this.name = "";
				this.pwd = "";
				this.pwd1 = "";
				this.code = "";
				this.yzm = "";
				this.inviteCode = "";
			},
			emailMethod() {
				this.registerType = "email";
				this.act = 1;
				this.name = "";
				this.pwd = "";
				this.pwd1 = "";
				this.code = "";
				this.yzm = "";
				this.inviteCode = "";
			},
			async getcode() {
				const code = await this.$axios.$get("/api/v1/servlet/ImageCode", {
					responseType: "arraybuffer"
				});

				let codeImg =
					"data:image/png;base64," +
					btoa(
						new Uint8Array(code).reduce(
							(data, byte) => data + String.fromCharCode(byte),
							""
						)
					);
				this.codeImg = codeImg;
			},
			checkpwd() {
				if (this.pwd !== this.pwd1) {
					Message({
						showClose: true,
						message: "请输入相同的密码"
					});
				}
			},
			sendRegCode() {
				var _this = this
				const TIME_COUNT = 60;
				var db = {
					name: this.name,
					code: this.code
				};
				if (this.code == "") {
					Message({
						showClose: true,
						message: "请输入验证码"
					});
					return;
				}
				this.$axios.setHeader(
					"Content-Type",
					"application/x-www-form-urlencoded"
				);
				this.$axios
					.post("/api/v1/sendRegCode", qs.stringify(db))
					.then(function(response) {
						if (response.data.code == 200) {
							Message({
								showClose: true,
								message: "发送成功，请注意查收"
							});
							if (!_this.timer) {
								_this.count = TIME_COUNT;

								_this.show = false;

								_this.timer = setInterval(() => {
									if (_this.count > 0 && _this.count <= TIME_COUNT) {
										_this.count--;
									} else {
										_this.show = true;
										clearInterval(_this.timer);
										_this.timer = null;
									}
								}, 1000);
							}

						} else if (response.data.code == 2) {
							Message({
								showClose: true,
								message: "图形验证码或用户不存在"
							});
						} else if (response.data.code == 3) {
							Message({
								showClose: true,
								message: "图形验证码输入错误"
							});
						} else if (response.data.code == 4) {
							Message({
								showClose: true,
								message: "用户已存在"
							});
						}
					})
					.catch(function(error) {
						console.log(error);
					});

			},
			sendRegCodePhone() {
				const TIME_COUNT = 60;
                var _this = this
				var db = {
					name: this.name,
					code: this.code
				};
				if (this.code == "") {
					Message({
						showClose: true,
						message: "请输入验证码"
					});

					return;
				}
				this.$axios.setHeader(
					"Content-Type",
					"application/x-www-form-urlencoded"
				);
				this.$axios
					.post("/api/v1/sendRegCode", qs.stringify(db))
					.then(function(response) {
						if (response.data.code == 200) {
							Message({
								showClose: true,
								message: "发送成功，请注意查收"
							});
							if (!_this.timer) {
								_this.count = TIME_COUNT;
							
								_this.showPhone = false;
							
								_this.timer = setInterval(() => {
									if (_this.count > 0 && _this.count <= TIME_COUNT) {
										_this.count--;
									} else {
										_this.showPhone = true;
										clearInterval(_this.timer);
										_this.timer = null;
									}
								}, 1000);
							}
							
						} else if (response.data.code == 2) {
							Message({
								showClose: true,
								message: "图形验证码或用户不存在"
							});
						} else if (response.data.code == 3) {
							Message({
								showClose: true,
								message: "图形验证码输入错误"
							});
						} else if (response.data.code == 4) {
							Message({
								showClose: true,
								message: "用户已存在"
							});
						}
					})
					.catch(function(error) {
						console.log(error);
					});

				
			},

			form_submit(e) {
				var _this = this;
				e.preventDefault();
				if (this.inviteCode == "") {
					var db = {
						name: this.name,
						pwd: this.pwd,
						code: this.yzm
					};
				} else {
					var db = {
						name: this.name,
						pwd: this.pwd,
						code: this.yzm,
						inviteCode: this.inviteCode
					};
				}
				if (this.$refs.agressments.checked !== true) {
					Message({
						showClose: true,
						message: "请勾选协议"
					});
				} else if (this.pwd != this.pwd1) {
					Message({
						showClose: true,
						message: "请输入相同的密码"
					});
				} else {
					this.$axios.setHeader(
						"Content-Type",
						"application/x-www-form-urlencoded"
					);
					this.$axios
						.post("/api/v1/register", qs.stringify(db))
						.then(function(response) {
							if (response.data.code == 200) {
								Message({
									showClose: true,
									message: "注册成功"
								});
								_this.$router.push({
									path: "/login"
								});
							} else if (response.data.code == 1) {
								Message({
									showClose: true,
									message: "用户名为空"
								});
							} else if (response.data.code == 2) {
								Message({
									showClose: true,
									message: "用户已存在"
								});
							} else if (response.data.code == 3) {
								Message({
									showClose: true,
									message: "密码为空"
								});
							} else if (response.data.code == 100) {
								Message({
									showClose: true,
									message: "验证码为空"
								});
							} else if (response.data.code == 101) {
								Message({
									showClose: true,
									message: "ip被冻结,请2小时后再试"
								});
							} else if (response.data.code == 102) {
								Message({
									showClose: true,
									message: "验证码错误"
								});
							}
						})
						.catch(function(error) {
							console.log(error);
						});
				}
			}
		}
	};
</script>
<style scoped>
	input:-webkit-autofill {
		-webkit-box-shadow: 0 0 0px 1000px rgba(41, 32, 32, 1) inset;
		-webkit-text-fill-color: #fff;
	}

	* {
		margin: 0;
		padding: 0;
	}

	input {
		border: 0;
		outline: none;
	}

	#cantainer {
		position: relative;
		width: 1920px;
		height: 1016px;
		background: url("~assets/image/index.png");
		background-size: 100% 100%;
	}

	.logo {
		padding: 44px 0 0 66px;
	}

	.content {
		width: 520px;
		height: 500px;
		padding: 267px 0 0 184px;
	}

	.con_top {
		width: 346px;
		height: 40px;
		font-size: 30px;
		font-family: FZLTTHJW--GB1-0, FZLTTHJW--GB1;
		font-weight: normal;
		color: rgba(255, 255, 255, 1);
		line-height: 39px;
	}

	.con_center {
		height: 29px;
		display: block;
		font-size: 16px;
		margin-top: 25px;
		margin-bottom: 55px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		line-height: 30px;
	}

	.con_center>span {
		margin-right: 62px;
	}

	.con_bottom {
		margin-top: 76px;
	}

	.register_icon {
		margin-right: 23px;
	}

	.registerContent {
		position: absolute;
		width: 720px;
		height: 640px;
		background: rgba(37, 29, 29, 1);
		border-radius: 5px;
		left: 769px;
		top: 125px;
	}

	.register_method>span:nth-of-type(1) {
		width: 87px;
		height: 21px;
		font-size: 21px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #ffffff;
		line-height: 20px;
	}

	.register_method {
		margin-left: 49px;
		margin-top: 56px;
	}

	.login_act {
		color: rgba(189, 58, 59, 1) !important;
	}

	.register_method>span:focus {
		color: rgba(189, 58, 59, 1);
	}

	.register_method>span:nth-of-type(2) {
		width: 90px;
		height: 21px;
		margin-left: 42px;
		font-size: 21px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #fff;
		/* color: rgba(233, 225, 225, 1); */
		line-height: 20px;
	}

	.register_method>span:nth-of-type(3) {
		width: 74px;
		height: 20px;
		margin-left: 352px;
		font-size: 12px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(189, 58, 59, 1);
		line-height: 20px;
	}

	.register_method>span:nth-of-type(3)::after {
		content: "▼";
		color: #bd3a3b;
		font-size: 5px;
		right: 4px;
	}

	form {
		margin-left: 49px;
	}

	form>input {
		font-size: 16px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(233, 225, 225, 1);
	}

	form>input:nth-of-type(1),
	form>input:nth-of-type(6) {
		width: 440px;
		height: 40px;
		background: rgba(41, 32, 32, 1);
		border-radius: 5px;
		border: 1px solid rgba(53, 49, 49, 1);
	}

	form>input:nth-of-type(7) {
		margin-bottom: 33px;
	}

	form>input:nth-of-type(2),
	form>input:nth-of-type(3) {
		width: 202px;
		height: 40px;
		background: rgba(41, 32, 32, 1);
		border-radius: 5px;
		border: 1px solid rgba(53, 49, 49, 1);
	}

	form>input:nth-of-type(3) {
		margin-left: 35px;
	}

	form>input:nth-of-type(4) {
		width: 274px;
		height: 40px;
		background: rgba(41, 32, 32, 1);
		border-radius: 5px;
		border: 1px solid rgba(53, 49, 49, 1);
	}

	.codeImg {
		width: 126px;
		height: 39px;
		margin-left: 20px;
	}

	form>input:nth-of-type(5) {
		width: 274px;
		height: 40px;
		background: rgba(41, 32, 32, 1);
		border-radius: 5px;
		border: 1px solid rgba(53, 49, 49, 1);
	}

	.regSendCodeTime {
		width: 126px;
		height: 40px;
		line-height: 40px;
		display: inline-block;
		background: rgba(189, 58, 59, 1);
		border-radius: 5px;
		border: 0;
		font-size: 18px;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		margin-left: 15px;
	}

	form>input:nth-of-type(5) {
		width: 126px;
		height: 40px;
		/* margin-top: 15px; */
		margin-left: 15px;
		background: rgba(189, 58, 59, 1);
		border-radius: 5px;
		border: 0;
		font-size: 18px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
	}

	form>input:nth-of-type(7) {
		margin: 16px 0px;
		width: 14px;
		height: 14px;
		border-radius: 2px;
		border: 1px solid rgba(151, 151, 151, 1);
		background: rgba(41, 32, 32, 1);
	}

	.agreement {
		color: #cc2a34;
	}

	form>input:nth-of-type(8) {
		width: 240px;
		height: 40px;
		background: rgba(189, 58, 59, 1);
		border-radius: 5px;
		border: 0;
		font-size: 18px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
	}

	form>p {
		margin-top: 26px;
		margin-bottom: 10px;
		font-size: 12px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(233, 225, 225, 1);
		line-height: 20px;
	}

	form>p:nth-of-type(2)>span {
		margin-left: 220px;
	}

	form>p:nth-of-type(6)>span {
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(189, 58, 59, 1);
	}
</style>
