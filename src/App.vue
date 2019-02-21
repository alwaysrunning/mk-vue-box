<template>
  <div id="app">
    <div class="loadingDirect" v-loading="vshow">加载指令</div>
    <div class="btn" @click="dialog">底部上拉弹框</div>
    <div class="btn" @click="tips">弱提示按钮</div>
    <div class="btn" @click="confirm">确认弹框</div>
    <div class="btn" @click="loading">加载弹框</div>
    <mk-pop-bottom  ref="bottom" :options="{}">
			<div slot="ctn" style="height:200px;">111</div>
		</mk-pop-bottom>
  </div>
</template>
<script>

export default {
  name: 'app',
  data () {
    return {
      vshow:true
    }
  },
  methods:{
    tips(){
      this.$tips('hello andy')
      //this.$tips({ctn:'hello world',delay:3000})
    },

    confirm(){
      let o =this.$confirm('<span>111</span>', {
        top:'40%',
				hideClose: true,
        title:'提示',
        cancelValue:'取消',
        okValue:'确定',
        ctn:'',
        hideClose: false,
      }).$on('sure', ()=>{
        console.log('sure')
      }).$on('cancel', ()=>{
        console.log('cancel')
      })
    },

    dialog(){
      this.$refs.bottom.show()
    },

    loading(){
      var loading = this.$loading({
        type:'',
        ctn:''
      })
      setTimeout(()=>{
        loading.hide()
      },3000)
    }
  },
  mounted(){

  }
}
</script>

<style lang="scss" scoped>
.loadingDirect{
  width:rem(200);
  height: rem(200);
}
.btn{
  background-color: #409EFF;
  border-color: #409EFF;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: .1s;
  transition: .1s;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  margin-bottom:20px;
}
</style>

