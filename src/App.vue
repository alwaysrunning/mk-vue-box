<template>
  <div id="app">
    <h1 @click="dialog" v-loading="vshow">弹框</h1>
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
      popClass:'ui-ani-bounceIn',
      msg: 'Welcome to Your Vue.js App',
      vshow:true
    }
  },
  methods:{
    dialog(){
      this.$refs.bottom.show()
      return
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
      return 
      var loading = this.$loading({
        type:'',
        ctn:''
      })
      setTimeout(()=>{
        loading.hide()
      },2000)
      
    }
  },
  mounted(){

  }
}
</script>

<style lang="scss" scoped>
h1{
  width:rem(200);
  height: rem(200);
  border:1px solid #f00;
}
</style>

