/*
 * @Author: yuanhao
 * @Date: 2022-05-30 13:58:33
 * @LastEditTime: 2022-05-30 14:16:15
 * @LastEditors: yuanhao
 * @Description: 
 * @FilePath: \jw-base\src\components\table\index.js
 */
import aTable from './Index.vue'

aTable.install = (Vue) => {
    Vue.component(aTable.name, aTable)
}

export default aTable