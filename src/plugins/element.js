import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui'

// 导入弹框提示组件,需要进行全局挂载

// 注册为全局可用的组件
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

// 把弹框组件挂载到Vue的原型对象上，每一个组件都可以通过this访问到$message
Vue.prototype.$message = Message
