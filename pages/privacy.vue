<template>
    <div>
        <Header/>
        <div class="main">
            <div class="title">隐私声明</div>
            <div class="content"
                v-loading="page_content.code == 200 ? false : true" 
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0)"
            >
                <div v-if="page_content.code == 200" class="text" v-html="page_content.data.content.content.replace(/color:#333333/g, '')"></div>
                <!-- page_content.data.content.content.replace(/color:#333333/g, '')  这里g的意思是全局-->
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
    components: {
        Header,
        Footer,
    },
    data () {
        return {
            page_id: 4, // 页面id 在文章里面
            page_content: ''
        }
    },
    mounted () {
        this.getPostContent()
    },
    methods: {
        getPostContent: function () {
			let pageId = {
				id: this.page_id
			}
			var _this = this
			// if (localStorage.getItem("rele_list") != null) {
			// 	_this.rele_list =  JSON.parse(localStorage.getItem('rele_list'))
			// }
			this.$axios.post('/api/v1/articleDetail',qs.stringify(pageId),{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			})
			.then(function (response) {
                var reg = new RegExp("color:#333333","g")
                
                // _this.page_content = response.data.data.content.content.replace(reg,"''")
                _this.page_content = response.data
			})
			.catch(function (error) {
				console.log(error)
			})
        },
    }
    
}
</script>

<style scoped>
    .main{
        width: 1302px;
        margin: 0 auto;
        color: #DBD3D3;
    }
    .title{
        height: 66px;
        line-height: 66px;
        margin: 20px auto;
        background: #302828;
        font-size:20px;
        font-weight:500;
        padding-left: 28px;
    }
    .content{
        background: #302828;
        margin-bottom: 90px;
        min-height: 500px;
    }
    .s_title{
        padding: 27px 0 24px 28px;
        font-size:20px;
        font-weight:500;
    }
    .text{
        font-size:14px;
        font-weight:400;
        line-height:24px;
        padding: 21px 28px 21px 28px;
        white-space: pre-wrap;           /* css-3 */
        white-space: -moz-pre-wrap;      /* Mozilla, since 1999 */
        white-space: -pre-wrap;          /* Opera 4-6 */
        white-space: -o-pre-wrap;        /* Opera 7 */
        word-wrap: break-word;
    }
    span{
        color: #DBD3D3;
    }
</style>