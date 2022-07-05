/*
 * @Author: yuanhao
 * @Date: 2022-05-30 11:47:44
 * @LastEditTime: 2022-07-04 14:59:06
 * @LastEditors: yuanhao
 * @Description: 
 * @FilePath: \jw-base\src\components\form\index.js
 */
import form from './Index.vue'

form.install = (Vue) => {
    Vue.component(form.name, form)
}

export default form