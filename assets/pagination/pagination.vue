<template>
          <div class="pagination">
            <span class="lftArrow" @click="prevEvent()" :class="{notAllowed: isNotLftClick}"> < </span>
            <div v-for="(item, index) in pageList" :key="index">
              <span @click="pageClick(index)" :class="{pageChoice: pageChoiceOn === index}">{{item}}</span>
            </div>
            <span class="rgtArrow" @click="nextEvent()" :class="{notAllowed: isNotRgtClick}"> > </span>
          </div>
</template>

<script>
export default {
  name: "pagination",
  data(){
    return {
      pageList: [],
      pageSize: 10,
      page: 1,
      pageNum: 0,
      isNotLftClick: true,
      isNotRgtClick: true,
      pageChoiceOn: 0,
    }
  },
  props: {
    pageTotal: {

    }
  },
  methods: {
    nextEvent(){
      if(this.page >= this.pageNum){

      }else{
        if(this.page >= this.pageNum){
          this.page = this.pageNum
        }else{
          this.page = this.page + 1
        }
        this.$emit('initData', this.page, this.pageSize)
      }
    },
    prevEvent(){

      if(this.page === 1){

      }else{
        if(this.page <= 1){
          this.page = 1
        }else{
          this.page = this.page - 1
        }
        this.$emit('initData', this.page, this.pageSize)
      }
    },
    pageClick(index){
      this.page = index + 1
      this.$emit('initData', this.page, this.pageSize)
      this.pageChoiceOn = index
    },
  },
  created() {
    this.$emit('initData', this.page, this.pageSize)
  },
  watch: {
    page:{
      handler(newValue, oldValue) {
        if(newValue === this.pageNum){
          this.isNotLftClick = false
          this.isNotRgtClick = true
        }else if(newValue === 1){
          this.isNotLftClick = true
          this.isNotRgtClick = true
        }
        this.pageChoiceOn = newValue - 1
      },
      deep: true
    },
    pageTotal: {
      handler(newValue, oldValue) {
        this.pageTotal = newValue

        if(newValue === 1){
          this.isNotLftClick = true
          this.isNotRgtClick = true
        }

        if(this.pageTotal % this.pageSize === 0){
          this.pageNum = 1
        }else{
          this.pageNum = parseInt(this.pageTotal / this.pageSize ) + 1
        }

        for(let i = 1;i< this.pageNum + 1; i++){
          this.pageList.push(i)
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
