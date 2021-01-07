<template>
    <div>
        <Header/>
        <div class="main">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">DPRO</el-breadcrumb-item>
                <el-breadcrumb-item>公告中心</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="post_list">
                <h2>公告中心</h2>
                <div v-if="postList.code == 200" class="post_box" >
                    <ul v-for="(item, index) in postList.data.articleType" v-bind:key="index" class="post_ul" >
                         <h3 style="color:#DBD3D3;font-size:18px">{{item.fname}}</h3>


                    <li class="li-style" v-for="(v,idx) in postList.data[item.fid]" v-bind:key="idx" v-if="idx<6">
                        <img src="~assets/image/helpStar.png" alt="">
                        <nuxt-link :to="{ name: 'post-id', params: { id: v.id } }" >{{v.title}}</nuxt-link>
                    </li>
                    </ul>

                </div>
                <div v-if="postList.code == 200">
                    <el-pagination
                        background
                        :hide-on-single-page="true"
                        @current-change="handleCurrentChange"
                        layout="prev, pager, next"
                        :total="postList.totalCount">
                    </el-pagination>
                </div>
                <!-- <p v-if="parseInt(postList.totalCount) > 0 && postList.data.length != parseInt(postList.totalCount)" @click="getAllPost(parseInt(postList.totalCount))">查看所有{{postList.totalCount}}文章</p> -->
                <p v-if="parseInt(postList.totalCount) == 0">暂无文章</p>
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
    data () {
        return{
            postType: 1, //类型(1重要公告,2活动公告,3上线公告,4帮助中心)
        }
    },
    computed: {
        ...mapState(['postList']),

    },
    created () {
        this.$store.dispatch('GET_noticeList',{
            page: 1,
            pageSize: 10,
            type: this.postType
        })
        if (process.browser) {
            localStorage.setItem('breadcrumb_s_title', '公告中心')
        }
    },
    methods: {
        handleCurrentChange(val) {
            this.$store.dispatch('GET_noticeList',{
                page: val,
                pageSize: 10,
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
        margin-bottom: 134px;
    }
    .main >>> .el-breadcrumb__inner a, .main >>> .el-breadcrumb__inner.is-link{
        color: #4A90E2;
    }
    .post_list{
        padding: 60px 0 0 200px;
    }
    .post_list h2{
        font-size:34px;
        font-weight:400;
        color:rgba(219,211,211,1);
        line-height:36px;
        margin-bottom: 9px;
    }
    .post_list ul{
        /* width: 500px; */
    }
    .post_list ul li {
        font-size: 14px;
        color: #DBD3D3;
        margin: 16px 0;
        border-bottom: 1px #383636 solid;
        padding-bottom: 15px;
    }
    .post_list ul li {
        overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
    }
    .post_list ul li:last-child{
        border-bottom: none;
    }
    /* .post_list>p{
        width:152px;
        height:24px;
        font-size:16px;
        font-weight:400;
        color:rgba(74,144,226,1);
        line-height:24px;
        margin-bottom: 134px;
        cursor: pointer;
    } */
    .post_box{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .post_ul{
        /* flex: 1; */
        width: 48%;
        max-width: 48%;
        margin-top: 30px;

    }
</style>
