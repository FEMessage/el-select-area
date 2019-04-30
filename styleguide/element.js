import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ElFormRenderer from '@femessage/el-form-renderer'
Vue.use(ElementUI)
Vue.component('el-form-renderer', ElFormRenderer)
