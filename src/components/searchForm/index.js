/*
 * @Author: yuanhao
 * @Date: 2022-05-30 11:47:44
 * @LastEditTime: 2022-05-30 13:13:33
 * @LastEditors: yuanhao
 * @Description: 
 * @FilePath: \jw-base\src\components\form\index.js
 */
import searchForm from './Index.vue'

searchForm.install = (Vue) => {
    Vue.component(searchForm.name, searchForm)
}

export default searchForm