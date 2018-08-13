 import vueNiceScrollbar from './components/vue-nice-scrollbar.vue'

 vueNiceScrollbar.install = function(Vue) {
    Vue.component('vue-nice-scrollbar', vueNiceScrollbar)
 }

 const install = function (Vue) {
     Vue.component('vue-nice-scrollbar', vueNiceScrollbar)
 }

 if (typeof window !== 'undefined' && window.Vue) {
     install(window.Vue)
 }

export default vueNiceScrollbar