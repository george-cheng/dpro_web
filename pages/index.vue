<template>
  <div class="container">
    <div>
      <IndexHotspot/>
      <IndexTop/>
      <IndexPrice/>
      <IndexIntroduce/>
      <!-- <IndexSupernode/> -->
      <IndexQRcode/>
      <IndexRegister/>
    </div>
  </div>
</template>

<script>
import IndexHotspot from '~/components/index/Index-Hotspot.vue'
import IndexTop from '~/components/index/Index-Top.vue'
import IndexPrice from '~/components/index/Index-Price.vue'
import IndexIntroduce from '~/components/index/Index-Introduce.vue'
// import IndexSupernode from '~/components/index/Index-Supernode.vue'
import IndexQRcode from '~/components/index/Index-QRcode.vue'
import IndexRegister from '~/components/index/Index-Register.vue'

import { mapState } from 'vuex'

export default {
  components: {
    IndexHotspot,
    IndexTop,
    IndexPrice,
    IndexIntroduce,
    // IndexSupernode,
    IndexQRcode,
    IndexRegister
  },
  data(){
    return{
      user:'123'
    }
  },
  computed:{
    ...mapState(['usertoken','systemNoticeUnReads']),
  },
  async fetch ({ store, params, $axios }) {
    // 调用vuex里面actions GET_priceData去请求数据
    // await store.dispatch('GET_priceData');
    // await store.dispatch('GET_noticeList',{
    //   page: 1,
    //   pageSize: 5,
    //   type: 1
    // });
  },
  mounted(){
    localStorage.setItem('user', this.user);
    this.$store.commit('usertoken', localStorage.getItem('user')) //设置vuex中的用户token
    this.$store.dispatch('GET_priceData');
    this.$store.dispatch('GET_noticeList',{
      page: 1,
      pageSize: 10,
      type: 1
    });
	this.$store.dispatch('setUserSystemNoticeUnReads');
  },
}
</script>

<style>
body{
  background: #1B1515;
}
</style>
