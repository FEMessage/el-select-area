import {storiesOf} from '@storybook/vue'
import Basic from './basic.vue'
import DefaultValue from './default-value.vue'
import ResponseType from './response-type.vue'
import Level from './level.vue'
import Disabled from './disbaled.vue'

import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

storiesOf('el-select-area', module)
  .add('basic usage', () => ({
    template: `<Basic/>`,
    components: {Basic}
  }))
  .add('default-value', () => ({
    template: `<DefaultValue/>`,
    components: {DefaultValue}
  }))
  .add('response-type', () => ({
    template: `<ResponseType/>`,
    components: {ResponseType}
  }))
  .add('level', () => ({
    template: `<Level/>`,
    components: {Level}
  }))
  .add('disabled', () => ({
    template: `<Disabled/>`,
    components: {Disabled}
  }))
