<template>
  <div>
		<Header/>
		<div class="main">
			<el-breadcrumb separator-class="el-icon-arrow-right" v-if="rele_list.length > 0">
                <el-breadcrumb-item :to="{ path: '/' }">Dpro</el-breadcrumb-item>
                <el-breadcrumb-item><span @click="backPage()" style="cursor: pointer;">{{breadcrumb_s_title}}</span></el-breadcrumb-item>
            </el-breadcrumb>
			<div class="warp">
				<div class="left" v-if="rele_list.length > 0">
					<h2>相关文章</h2>
					<ul>
						<li v-for="(item, index) of rele_list" :key="index" :id="item.id" :class="item.id == post_id ? 'act' : 'noact'">
							<nuxt-link :to="{ name: 'post-id', params: { id: item.id } }">{{item.title}}</nuxt-link>
                    	</li>
					</ul>
				</div>
				<div class="right"
					v-loading="post.code == 200 ? false : true"
					element-loading-text="拼命加载中"
					element-loading-spinner="el-icon-loading"
					element-loading-background="rgba(0, 0, 0, 0)"
				>
					<h1 v-if="post.code == 200">{{post.data.content.title}}</h1>
					<div class="author" v-if="post.code == 200">
						<div class="author_avatar">
							<img src="~assets/image/logo.png" alt="">
						</div>
						<div>
							<span class="author_name">{{post.data.content.author==null?'Dpro' : post.data.content.author}}</span>
							<span>更新于 · <time>{{this.tool.timestampToTime(post.data.content.createTime)}}</time></span>
						</div>
					</div>
					<div v-if="post.code == 200" class="content" v-html="post.data.content.content"></div>
				</div>
			</div>
		</div>
		<Footer/>
  </div>
</template>

<script>
import qs from 'qs'

import Header from '~/components/common/header.vue'
import Footer from '~/components/common/footer.vue'

export default {
	layout: 'pro',
	components: {
        Header,
        Footer
    },
    data(){
		return{
			post_id: this.$route.params.id,
			post: '',
			breadcrumb_s_title: '', // 面包屑导航二级栏目名
			rele_list: '', // 相关文章列表
		}
	},
	mounted () {
		this.breadcrumb_s_title = localStorage.getItem('breadcrumb_s_title')
		this.getPostContent()
	},
    methods: {
		backPage: function () {
			this.$router.go(-1) // 后退一页
		},
		getPost: function () {

		},
		getPostContent: function () {
			var _this = this
			let postId = {
				id: _this.post_id
			}
			// if (localStorage.getItem("rele_list") != null) {
			// 	_this.rele_list =  JSON.parse(decodeURIComponent(window.atob(localStorage.getItem("rele_list")))) //window.atob解码 用中文 记得加decodeURIComponent()!
			// }
			this.$axios.post('/api/v1/articleDetail',qs.stringify(postId),{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			})
			.then(function (response) {
				clearTimeout(_this.timer)
				_this.rele_list = response.data.data.items

				localStorage.setItem('rele_list', window.btoa(window.encodeURIComponent(JSON.stringify(_this.rele_list)))) //window.btoa编码 用中文 记得加encodeURIComponent()!
				_this.timer = setTimeout(()=>{   //设置延迟执行
					_this.post = response.data
				},300)
			})
			.catch(function (error) {
				console.log(error)
			})
		}
    }
}
</script>

<style scoped>
	.main{
		width: 1160px;
		margin: 20px auto 100px auto;
	}
	.main >>> .el-breadcrumb__inner a, .main >>> .el-breadcrumb__inner.is-link{
        color: #4A90E2;
    }
	h1, h2{
		color: #DBD3D3;
	}
	.warp{
		margin-top: 20px;
		display: flex;
		color: #DBD3D3;
		min-height: 500px;
	}
	.warp .left{
		flex: 0 0 17%;
		/* padding-right: 60px; */
	}
	.warp .left h2{
		margin: 10px;
	}
	.warp .left ul li{
		padding: 10px;
		font-size: 14px;
		margin-bottom: 10px;
	}
	.warp .left .act{
		background: rgb(35, 35, 35);
		border-radius: 5px;
	}
	.warp .right{
		flex: 1 0 66%;
		/* max-width: 66%;
		min-width: 640px; */
		padding: 0 30px;
	}
	.warp .right .author img{
		width: 40px;
		border-radius: 50%;
	}
	.warp .right .author{
		display: flex;
		align-items: center;
		margin: 10px auto;
	}
	.author_name{
		display: block;
		font-size: 16px;
	}
	.author_avatar{
		margin-right: 10px;
	}
	.warp .right .author>div{
		display: inline-block;
	}
	.warp .right .content{
		padding: 20px;
		font-size: 14px;
	}

</style>
