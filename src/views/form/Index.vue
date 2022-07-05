<!--
 * @Author: yuanhao
 * @Date: 2022-06-29 17:37:22
 * @LastEditTime: 2022-07-05 16:47:04
 * @LastEditors: yuanhao
 * @Description: 表单
 * @FilePath: \jw-base\src\views\form\Index.vue
-->
<template>
    <div>
        <a-tabs>
            <a-tab-pane key="example" tab="例子">
                <a-card>
                    <jw-form :formConfigData="formConfigData" :formFunctionList="functions" theme="" ref="forms">
                        <a-input
                            v-decorator="[
                                data.data.code,
                                {
                                    initialValue: data.data.defaultValue || '',
                                    rules: [
                                        {
                                            required: data.data.required,
                                            message: '请输入' + data.data.label
                                        }
                                    ]
                                }
                            ]"
                            slot="databaseTable"
                            slot-scope="data"
                            :disabled="data.data.disabled"
                            :placeholder="data.data.placeholder || '请输入' + data.data.label"
                            class="fx_databaseTableInput"
                        >
                            <a-button type="primary" slot="addonAfter">建表</a-button>
                        </a-input>
                    </jw-form>
                </a-card>
            </a-tab-pane>
            <a-tab-pane key="api" tab="API">
                <h2>formConfigData Props</h2>
                <jw-table :columns="columns" :tableData="sourceData_1" skin="" />
                <br />

                <h2>formConfigBase Props</h2>
                <jw-table :columns="columns" :tableData="sourceData_2" skin="" />
                <br />

                <h2>formFunctionList</h2>
                <jw-table :columns="columns" :tableData="sourceData_3" skin="" />

                <br />
                <h2>theme</h2>
                <jw-table :columns="columns" :tableData="sourceData_4" skin="" />
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formConfigData: [
                {
                    label: '资源名称',
                    code: 'resourceName',
                    type: 'input',
                    required: true,
                    show: true,
                    checkFunName: 'formCheck',
                    funParams: {
                        len: 64,
                        pattern: 'patternString',
                        message: '字符数上限为64位，包含大小写字母、数字、中文！'
                    }
                },
                {
                    label: '资源分类',
                    code: 'resourceClassifyId',
                    type: 'select',
                    required: true,
                    show: true,
                    defaultValue: 1,
                    dataFormat: [
                        {
                            name: '应用资源',
                            value: 1
                        },
                        {
                            name: '数据资源',
                            value: 2
                        },
                        {
                            name: '地图资源',
                            value: 3
                        }
                    ]
                },
                {
                    label: '资源分类多选',
                    code: 'resourceClassifyIds',
                    type: 'select',
                    required: true,
                    hideNullData: true,
                    show: true,
                    defaultValue: [1],
                    extra: {
                        mode: 'multiple'
                    },
                    dataFormat: [
                        {
                            name: '应用资源',
                            value: 1
                        },
                        {
                            name: '数据资源',
                            value: 2
                        },
                        {
                            name: '地图资源',
                            value: 3
                        }
                    ]
                },
                {
                    label: '日期',
                    code: 'year',
                    type: 'year',
                    required: true,
                    show: true
                },
                {
                    label: '日期范围',
                    code: 'dateRange',
                    type: 'dateRange',
                    required: true,
                    show: true
                },
                {
                    label: '数字',
                    code: 'number',
                    type: 'number',
                    required: true,
                    show: true
                },
                {
                    label: '行政区域',
                    code: 'area',
                    type: 'cascader',
                    funName: 'getProvinceData',
                    required: true,
                    show: true,
                    dataFormat: [],
                    loadingFunName: 'loadingFunName',
                    changeFunName: 'cascaderSelectChange'
                },
                {
                    label: '数据库表名',
                    code: 'databaseTable',
                    type: 'databaseTable',
                    required: true,
                    show: true,
                    slot: 'databaseTable'
                },
                {
                    label: '资源类型',
                    code: 'treeSelect',
                    type: 'treeSelect',
                    required: true,
                    show: true,
                    // multiple: true,
                    // treeCheckable: true,
                    dataFormat: [
                        {
                            title: 'Node1',
                            value: '0-0',
                            key: '0-0',
                            children: [
                                {
                                    value: '0-0-1',
                                    key: '0-0-1',
                                    title: 'Child Node1'
                                },
                                {
                                    title: 'Child Node2',
                                    value: '0-0-2',
                                    key: '0-0-2'
                                }
                            ]
                        },
                        {
                            title: 'Node2',
                            value: '0-1',
                            key: '0-1'
                        }
                    ],
                    changeFunName: 'resourceTypeChange'
                },
                {
                    label: '矢量数据',
                    code: 'resourceSubId',
                    type: 'select',
                    required: true,
                    show: true,
                    funName: 'getVectorData',
                    dataFormat: []
                },
                {
                    label: '资源URL',
                    code: 'resourceSubUrl',
                    type: 'input',
                    required: true,
                    show: false
                },
                {
                    label: '资源描述',
                    code: 'resourceDescription',
                    type: 'textarea',
                    required: true,
                    show: true,
                    checkFunName: 'formCheck',
                    funParams: "{len:100,message:'字符数上限为100位！'}",
                    extra: {
                        rows: 6
                    }
                },
                {
                    label: '操作权限',
                    code: 'checkboxGroup',
                    type: 'checkbox',
                    required: false,
                    show: true,
                    dataFormat: [
                        {
                            name: '申请',
                            value: 'isApply'
                        },
                        {
                            name: '预览',
                            value: 'isGlanceOver'
                        }
                    ]
                },
                {
                    label: '资源主键',
                    code: 'id',
                    type: 'hiddenNumber',
                    required: true,
                    defaultValue: '0',
                    show: true
                },
                {
                    label: '密码',
                    code: 'password',
                    type: 'password',
                    required: true,
                    show: true,
                    checkFunName: 'formCheck',
                    funParams: {
                        len: 64,
                        pattern: 'patternString',
                        message: '字符数上限为64位，包含大小写字母、数字、中文！'
                    }
                },
                {
                    label: '上传',
                    code: 'file',
                    type: 'file',
                    show: true,
                    changeFunName: 'uploadFile'
                }
            ],
            functions: {
                uploadFile: this.uploadFile
            },
            columns: [
                {
                    title: '参数',
                    dataIndex: 'parameter',
                    width: '20%'
                },
                {
                    title: '说明',
                    dataIndex: 'explain',
                    width: '35%'
                },
                {
                    title: '类型',
                    dataIndex: 'type',
                    width: '20%'
                },
                {
                    title: '默认值',
                    dataIndex: 'defaultValue',
                    width: '25%'
                }
            ],
            sourceData_1: [
                {
                    parameter: 'label',
                    explain: 'label 标签的文本',
                    type: 'string',
                    defaultValue: ''
                },
                {
                    parameter: 'code',
                    explain: '必填输入控件唯一标志',
                    type: 'string',
                    defaultValue: ''
                },
                {
                    parameter: 'type',
                    explain: '类型, 常规隐藏字段hidden, 数字类隐藏hiddenNumber,不然控制台会报错',
                    type: 'string',
                    defaultValue: `input | hidden | number | hiddenNumber| 
                    password | textarea | radio | checkbox | date | week |  
                    month | year | dateRange | cascader | select | 
                    treeSelect | file`
                },
                {
                    parameter: 'slot',
                    explain: '扩展类型',
                    type: 'string',
                    defaultValue: ''
                },
                {
                    parameter: 'required',
                    explain: '是否必填，如不设置，则会根据校验规则自动生成',
                    type: 'boolean',
                    defaultValue: 'false'
                },
                {
                    parameter: 'show',
                    explain: '是否显示',
                    type: 'boolean',
                    defaultValue: 'false'
                },
                {
                    parameter: 'defaultValue',
                    explain: '默认值',
                    type: 'string | Array',
                    defaultValue: ''
                },
                {
                    parameter: 'extra',
                    explain: '扩展熟悉，参考https://1x.antdv.com/components/form-cn/#API',
                    type: 'object{}',
                    defaultValue: ''
                },
                {
                    parameter: 'dataFormat',
                    explain: '枚举值, 使用类型: radio, checkbox, select, treeSelect, cascader。其中radio, checkbox, select可通过fieldnames{key, text}映射，默认{name, value}',
                    type: 'Array[]',
                    defaultValue: ''
                },
                {
                    parameter: 'changeFunName',
                    explain: '方法映射',
                    type: 'string',
                    defaultValue: ''
                }
            ],
            sourceData_2: [
                {
                    parameter: 'labelCol',
                    explain: 'label 标签布局, 设置 span 值, { span: 5 }',
                    type: 'object',
                    defaultValue: ''
                },
                {
                    parameter: 'wrapperCol',
                    explain: '需要为输入控件设置布局样式时，使用该属性，用法同 labelCol',
                    type: 'object',
                    defaultValue: ''
                },
                {
                    parameter: 'formName',
                    explain: '经 Form.create() 包装过的组件会自带 this.form 属性',
                    type: 'string',
                    defaultValue: 'form'
                },
                {
                    parameter: 'layout',
                    explain: '表单布局',
                    type: 'horizontal | vertical | inline',
                    defaultValue: 'horizontal'
                },
                {
                    parameter: 'grid',
                    explain: '响应式栅格',
                    type: 'number | object',
                    defaultValue: `{
                        xxs: 24,
                        xs: 24,
                        sm: 24,
                        md: 24,
                        lg: 24,
                        xl: 24,
                        xxl: 24
                    }`
                },
                {
                    parameter: 'gutter',
                    explain: '栅格间隔，可以写成像素值或支持响应式的对象写法来设置水平间隔, [水平间距, 垂直间距]',
                    type: 'number | object | array',
                    defaultValue: '[16, 0]'
                },
                {
                    parameter: 'colon',
                    explain: '配置 Form.Item 的 colon 的默认值',
                    type: 'boolean',
                    defaultValue: 'true'
                }
            ],
            sourceData_3: [
                {
                    parameter: '',
                    explain: 'changeFunName对应的方法名',
                    type: 'function',
                    defaultValue: ''
                }
            ],
            sourceData_4: [
                {
                    parameter: 'theme',
                    explain: '主题风格',
                    type: 'string',
                    defaultValue: "dark | ''"
                }
            ]
        }
    },
    methods: {
        uploadFile(file, callback) {
            let params = new FormData()
            params.append('file', file)
            return new Promise((resolve) => {
                setTimeout(() => {
                    callback({
                        url: '123',
                        thumbUrl: '233'
                    })
                    resolve()
                }, 1000)
            })
        }
    }
}
</script>

<style></style>
