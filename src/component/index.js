import pop from './pop.vue';
import tips from './tips.vue';
import loading from './loading.vue';
import bottom from './bottom.vue';
import vLoading from './directive/loading.vue';
import { setStyle } from '@/component/dom.js';

function install(Vue) {
  if (install.installed) return
  install.installed = true

  let prototype = Vue.prototype
  let dialog = {}

  let createInstance = function(tmp, type, opts){
    if(!dialog[type]){
      let Component = Vue.extend(tmp)
      let instance = new Component().$mount(document.createElement('div'))
      dialog[type] = instance
    }
    Object.assign(dialog[type].$data, opts)
    dialog[type].show()
    return dialog[type];
  }

  prototype.$confirm = function (ctn, opts) {
    return createInstance(pop, 'box', Object.assign(opts,{ctn:ctn}))
  }

  prototype.$tips = function (opts) {
    let obj = {}
    if(typeof opts != 'object'){
      obj.ctn = opts
    }else{
      obj = opts
    }
    return createInstance(tips, 'tips', obj)
  }


  prototype.$loading = function (opts) {
    return createInstance(loading, 'loading', opts)
  }

  Vue.component(bottom.name, bottom)

  // v-loading指令
  let createLoading = function(visible){
    let loadingComponent = Vue.extend(vLoading);
    let instance = new loadingComponent({
      el: document.createElement('div'),
      data:{
        visible:visible
      }
    })
    return instance
  }
  
  let insertDom = (el, binding, isAppend) => {
    setStyle(el, 'position', 'relative')
    setStyle(el, 'overflow', 'hidden')
    if (isAppend) {
      el.appendChild(el.wrapDom)
    } else {
      el.instance.show()
    }
  }
  

  Vue.directive('loading', {
    bind(el, binding, vnode){
      let loadingComponent = Vue.extend(vLoading);
      let instance = new loadingComponent({
        el: document.createElement('div'),
        data:{
          text: el.getAttribute('loading-text') || '',
          visible:binding.value
        }
      })
      el.instance = instance
      el.wrapDom = el.instance.$el
      insertDom(el, binding, true)
    },

    update(el, binding, vnode){
      if(!binding.value){
        el.instance.hide()
        setStyle(el, 'overflow', '')
      }else{
        insertDom(el, binding, false)
      }
    }
  })
  
}

export default {
  install
}
