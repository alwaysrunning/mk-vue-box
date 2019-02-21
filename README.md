## usage  

Installation  
``` js  
npm install mk-vue-dialog --save 
```  

``` js  
import utils from 'mk-vue-dialog'
Vue.use(utils); 
```

### 加载指令
``` html
<div v-loading="vshow">加载指令</div>
```  

### 底部上拉弹框
``` html
<mk-pop-bottom  ref="bottom" :options="{}">
  <div slot="ctn" style="height:200px;">111</div>
</mk-pop-bottom>
```  
``` js  
this.$refs.bottom.show()
```

### 弱提示
``` js  
this.$tips('hello world')

this.$tips({
  ctn:'hello world', // 提示内容
  delay:3000, // 提示时长
  top:'30%', // 到顶部的距离
})
```

### 加载弹框
``` js  
let o =this.$confirm('<span>111</span>', {
  top:'40%',
  hideClose: true,
  title:'提示',
  cancelValue:'取消',
  okValue:'确定',
  hideClose: false,
}).$on('sure', ()=>{
  
}).$on('cancel', ()=>{
  
})
```

### Contributor

yanghaitao