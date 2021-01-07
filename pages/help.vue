<template>
    <div>
        <Header/>
        <div class="main">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">DPRO</el-breadcrumb-item>
                <el-breadcrumb-item>帮助中心</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="post_list">
                <h2>帮助中心</h2>
                <ul v-if="postListByType.code == 200">
                    <li class="li-style" v-for="(item, index) in postListByType.data.rows" v-bind:key="index">
                        <img src="~assets/image/helpStar.png" alt="">
                        <nuxt-link :to="{ name: 'post-id', params: { id: item.id } }" >{{item.title}}</nuxt-link>
                    </li>
                </ul>
                <p v-if="parseInt(postListByType.data.total) > 0 && postListByType.data.length != parseInt(postListByType.data.total)" @click="getAllPost(parseInt(postListByType.data.total))">查看所有{{postListByType.data.total}}篇文章</p>
                <p v-if="parseInt(postListByType.data.total) == 0">暂无文章</p>
            </div>
        </div>
        <Footer/>
    </div>
</template>


<script>
import { mapState } from 'vuex'

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
            postType: 3, //类型(1重要公告,2活动公告,3上线公告,4帮助中心)
        }
    },
    computed: {
        ...mapState(['postListByType']),
    },
    created () {
        this.$store.dispatch('GET_noticeListByType',{
            page: 1,
            pageSize: 6,
            type: this.postType
        })
        if (process.browser) {
            localStorage.setItem('breadcrumb_s_title', '帮助中心')
        }
    },
    methods: {
        getAllPost: function (a) {
            this.$store.dispatch('GET_noticeListByType',{
                page: 1,
                pageSize: a,
                type: this.postType
            })
        }
    }
}
</script>

<style scoped>
    .main{
        width: 1170px;
        margin: 0 auto;
        padding-top: 28px;
    }
    .main >>> .el-breadcrumb__inner a, .main >>> .el-breadcrumb__inner.is-link{
        color: #4A90E2;
    }
    .post_list{
        padding: 60px 0 0 200px;
        height: 618px;
    }
    .post_list h2{
        font-size:36px;
        font-weight:400;
        color:rgba(219,211,211,1);
        line-height:36px;
        margin-bottom: 9px;
    }
    .post_list ul{
        width: 500px;
    }
    .post_list ul li {
        font-size: 16px;
        color: #DBD3D3;
        margin: 16px 0;
    }
    .post_list>p{
        width:152px;
        height:24px;
        font-size:16px;
        font-weight:400;
        color:rgba(74,144,226,1);
        line-height:24px;
        margin-bottom: 134px;
        cursor: pointer;
    }
</style>
