<template>
  <div id="cantainer">
    <PersonalNav />
    <div class="title">
      <p>高级实名认证</p>
    </div>
    <div class="content">
      <div  style="font-size: 20px; text-align: center;padding-top: 60px;">
          感谢您提交高级实名认证，请耐心等待客服审核
      </div>
      
    </div>
    <Footer />
  </div>
</template>
<script>
import PersonalNav from "../components/common/header.vue";
import Footer from "../components/common/footer";
import qs from "qs";
import { Message } from "element-ui";
export default {
  components: {
    PersonalNav,
    Footer
  },
  data() {
    return {
      tempImg1: "",
      tempImg2: "",
      tempImg3: "",
      userInfoArr: ''
    };
  },
  mounted () {
    var _this = this
    this.$axios.get('/api/v1/frontSession')
    .then(function (response) {
        if(response.data.code==200){
            _this.userInfoArr = response.data.data;
        }
    })
    .catch(function (error) {
        console.log(error);
    });
  },
  methods: {
    uploadFile1(event) {
      var _this = this;
      let file = event.target.files[0];
      let db = new FormData();
      db.append("img", file);
      db.append("type", 1);
      this.$axios
        .post("/api/v1/account/upload", db)

        .then(function(response) {
          if (response.data.code == 200) {
            let url = response.data.data;
            _this.tempImg1 = url;
            Message({
                        showClose: true,
                        message: '图片上传成功'
                    })
          }else if(response.data.code==1){
                Message({
                        showClose: true,
                        message: '图片不能为空'
                    })
            }else if(response.data.code==2){
                Message({
                        showClose: true,
                        message: '图片超过大小'
                    })
            }else if(response.data.code==3){
               Message({
                        showClose: true,
                        message: '图片类型不允许'
                    })
            }else if(response.data.code==4){
                Message({
                        showClose: true,
                        message: '图片上传失败'
                    })
            }
        })

        .catch(function(error) {
          console.log(error);
        });
    },
     uploadFile2(event) {
      var _this = this;
      let file = event.target.files[0];
      let db = new FormData();
      db.append("img", file);
      db.append("type", 1);
      this.$axios
        .post("/api/v1/account/upload", db)
        .then(function(response) {
          if (response.data.code == 200) {
            let url = response.data.data;
            _this.tempImg2 = url;
            Message({
                        showClose: true,
                        message: '图片上传成功'
                    })
          }else if(response.data.code==1){
                Message({
                        showClose: true,
                        message: '图片不能为空'
                    })
            }else if(response.data.code==2){
                Message({
                        showClose: true,
                        message: '图片超过大小'
                    })
            }else if(response.data.code==3){
               Message({
                        showClose: true,
                        message: '图片类型不允许'
                    })
            }else if(response.data.code==4){
                Message({
                        showClose: true,
                        message: '图片上传失败'
                    })
            }
        })

        .catch(function(error) {
          console.log(error);
        });
    },
     uploadFile3(event) {
      var _this = this;
      let file = event.target.files[0];
      let db = new FormData();
      db.append("img", file);
      db.append("type", 1);
      this.$axios
        .post("/api/v1/account/upload", db)
        .then(function(response) {
          if (response.data.code == 200) {
            let url = response.data.data;
            _this.tempImg3 = url;
            Message({
                        showClose: true,
                        message: '图片上传成功'
                    })
          }else if(response.data.code==1){
                Message({
                        showClose: true,
                        message: '图片不能为空'
                    })
            }else if(response.data.code==2){
                Message({
                        showClose: true,
                        message: '图片超过大小'
                    })
            }else if(response.data.code==3){
               Message({
                        showClose: true,
                        message: '图片类型不允许'
                    })
            }else if(response.data.code==4){
                Message({
                        showClose: true,
                        message: '图片上传失败'
                    })
            }
        })

        .catch(function(error) {
          console.log(error);
        });
    },
    uploadauth(){
      var db={
            'fIdentityPath1':this.tempImg1,
            'fIdentityPath2':this.tempImg2,
            'fIdentityPath3':this.tempImg3,
            
        }
        
        this.$axios.setHeader('Content-Type', 'application/x-www-form-urlencoded')
        this.$axios.post('/api/v1/account/uploadAuth',qs.stringify(db))
        .then(function (response) {
            if (response.data.code == 200) {
            Message({
                        showClose: true,
                        message: '认证提交成功，请关注审核回复'
                    })
          }else if(response.data.code==1){
                Message({
                        showClose: true,
                        message: '图片地址不能为空'
                    })
            }else if(response.data.code==2){
                Message({
                        showClose: true,
                        message: '请勿重复提交'
                    })
            }
           
        })
        .catch(function (error) {
            console.log(error);
        });
    }
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
#cantainer {
  position: relative;
  width: 1920px;
  height: 1825px;
  background: rgba(27, 21, 21, 1);
}
.title {
  width: 1302px;
  height: 66px;
  margin-top: 20px;
  margin-left: 309px;
  vertical-align: middle;
  line-height: 66px;
  background: rgba(48, 40, 40, 1);
}
.title p {
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(219, 211, 211, 1);
  margin-left: 28px;
}
.content {
  width: 1302px;
  height: 900px;
  margin-top: 20px;
  margin-left: 309px;
  margin-bottom: 50px;
  vertical-align: middle;
  background: rgba(40, 32, 32, 1);
}
.content .wrap {
  margin-left: 30px;
}
.content_load1,
.content_load2,
.content_load3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1200px;
  height: 180px;
  vertical-align: middle;
}

.content_load1>div:nth-of-type(1)>p{
  width: 250px;
  font-size:12px;
  margin-top: 15px;
font-family:PingFangSC-Regular,PingFang SC;
font-weight:400;
color:rgba(178,170,170,1);
}
.content_load2>div:nth-of-type(1)>p{
  width: 250px;
  font-size:12px;
  margin-top: 15px;
font-family:PingFangSC-Regular,PingFang SC;
font-weight:400;
color:rgba(178,170,170,1);
}
.content_load3>div:nth-of-type(1)>p{
  width: 250px;
  font-size:12px;
  margin-top: 15px;
font-family:PingFangSC-Regular,PingFang SC;
font-weight:400;
color:rgba(178,170,170,1);
}

.fileParent {
  position: relative;
  width: 288px;
  height: 170px;
  border-radius: 2px;
  border: 1px solid rgba(142, 138, 138, 1);
}
.fileParent img {
  position: absolute;
  width: 60px;
  height: 39px;
  left: 0;
  top: 0;
}
.file {
  position: absolute;
  width: 288px;
  height: 170px;
  top: 0;
  left: 0;
  opacity: 0;
}
.uploadauth{
  width:250px;
height:50px;
margin-top: 100px;
font-size:22px;
font-family:PingFangSC-Medium,PingFang SC;
font-weight:500;
color:rgba(255,255,255,1);
background:rgba(189,58,59,1);
border-radius:5px;
border: 0;
outline: none;

}
.back{
  margin-left: 10px;
  font-size: 18px;
  color:rgba(189,58,59,1);
}



</style>