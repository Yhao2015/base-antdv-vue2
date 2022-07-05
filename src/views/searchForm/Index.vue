<!--
 * @Author: yuanhao
 * @Date: 2022-07-04 13:54:56
 * @LastEditTime: 2022-07-05 15:44:28
 * @LastEditors: yuanhao
 * @Description: 
 * @FilePath: \jw-base\src\views\searchForm\Index.vue
-->
<template>
    <div>
        <h2>label右对齐搜索表单</h2>
        <a-card :bordered="false">
            <jw-search-form :formConfig="formConfigSearchData" :formFunctionList='functions' theme="">
                <span slot="ceshi">
                    卡槽测试
                </span>
            </jw-search-form>
        </a-card> 

        <h2>label左对齐搜索表单</h2>
        <a-card :bordered="false">
            <jw-search-form :formConfig="formConfigSearchData" :formConfigBase='formConfigBase' :formFunctionList='functions' theme="">
                <span slot="ceshi">
                    卡槽测试
                </span>
            </jw-search-form>
        </a-card>
        <h1>一个页面只能有一个搜索表单，否则改变页面宽度有一个不能自动改变个数</h1>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formConfigSearchData: [
                {
                    label: '资源分类', code: 'resourceClassifyId', type: 'select',defaultValue:'0', show: true, dataFormat: [
                        { name: '全部', value: '0' },
                        { name: '应用资源', value: '1' },
                        { name: '数据资源', value: '2' },
                        { name: '地图资源', value: '3' },
                    ]
                },
                {
                    label: '主题分类', code: 'businessClassifyId', type: 'select', show: true, dataFormat: []
                },
                {label:'资源编码',code:'resourceCode',type:'input',show:true},
                { label: '资源名称', code: 'resourceName', type: 'input', show: true },
                { label: '资源名称大大', code: 'resourceName', type: '', slot: "ceshi", show: true }
            ],
            functions: {

            },
            formConfigBase: {
                labelCol: null,
                wrapperCol: null,
            }
        }
    }
}
</script>

<style>

</style>