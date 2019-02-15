import Vue from 'vue'
import App from './App.vue'
import 'babel-polyfill'
import '@/assets/fonts/_common.scss';
import '@/assets/sass/common.scss';
import plugin from '@/component'
Vue.use(plugin);

new Vue({
  el: '#app',
  render: h => h(App)
})
