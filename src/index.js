/*
 * @Author: yuanhao
 * @Date: 2022-05-30 11:51:48
 * @LastEditTime: 2022-07-04 15:02:09
 * @LastEditors: yuanhao
 * @Description: 
 * @FilePath: \jw-base\src\index.js
 */
import form from './components/form'
import searchForm from './components/searchForm'
import table from './components/table'

let components = [form, searchForm, table]

let install = function(Vue) {
    if(install.installed) {
        return
    }

    components.map(item => {
        Vue.component(item.name, item)
    })
}

if(typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}


export default {
    install
}