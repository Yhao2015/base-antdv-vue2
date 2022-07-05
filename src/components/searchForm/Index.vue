<!--
 * @Author: yuanhao
 * @Date: 2022-07-04 13:54:25
 * @LastEditTime: 2022-07-05 15:45:35
 * @LastEditors: yuanhao
 * @Description: 
 * @FilePath: \jw-base\src\components\searchForm\Index.vue
-->
<template>
    <div>
        <jw-form 
            :formConfigData="formConfigUsed" 
            :formConfigBase="formConfigBaseUsed" 
            :formFunctionList='formFunctionList'
            :theme="theme" 
            class="fx_searchForm"
            ref="searchForm"
        >
            <a-col slot="formExpand" v-bind="searchGrig" class='text-right marginT4'>
                <a-space class="lineHeight36">
                    <a-button type="primary" @click="onSearch()">
                        搜索
                    </a-button>

                    <a-button type="default" @click="onReset">
                        重置
                    </a-button>
                    <a href="javascript:;" @click="toggleCollapsed" v-if="formShowConfig.length > count">
                        {{ formToggle ? "收缩" : "展开" }}
                        <a-icon :type="formToggle ? 'up' : 'down'" />
                    </a>
                </a-space>
            </a-col>
            <template slot="searchSlot" slot-scope="data">
                <slot :name="data.data.slot" v-if="data.data.slot" :data="data.data"></slot>
            </template>
        </jw-form>
    </div>
</template>

<script>
export default {
    name: 'jw-search-form',
    data() {
        return {
            formConfigBaseUsed: {
                labelCol: null,
                wrapperCol: null,
                formName: "searchForm",
                layout: "inline",
                grid: {
                    xxs: { span: 24 },
                    xs: { span: 24 },
                    sm: { span: 12 },
                    md: { span: 12 },
                    lg: { span: 8 },
                    xl: { span: 8 },
                    xxl: { span: 6 },
                },
                gutter: [16, 8],
            },
            formToggle: false,
            searchGrig: {
                xxs: { span: 24, offset: 0 },
                xs: { span: 24, offset: 0 },
                sm: { span: 12, offset: 0 },
                md: { span: 12, offset: 0 },
                lg: { span: 8, offset: 0 },
                xl: { span: 8, offset: 0 },
                xxl: { span: 6, offset: 0 },
            },
            defaultIcon: {
                searchIcon: "search", // 查询图标
                resetIcon: "undo", // 重置图标
                addIcon: "plus-circle", // 新增图标
                editIcon: "edit", // 编辑图标
                delIcon: "delete", // 删除图标
            },
            count: 3,
            formShowConfig: [], //显示表单数据
            formConfigUsed: []
        }
    },
    props:{
        //表单配置数据
        formConfig: {
            type: Array,
            default: () => []
        },
        //父页面传过来的所有方法
        formFunctionList: {
            type: Object,
            default: () => {
                return {}
            }
        },
        //  其他的配置参数
        otherSettingObj: {
            type: Object,
            default: () => {
                return {}
            },
        },
        //表单的基本配置数据
        formConfigBase: {
            type: Object,
            default: () => {
                return {
                    labelCol: { span: 6 },
                    wrapperCol: { span: 18 }
                }
            }
        },
        theme: {
            type: String,
            default: 'dark'
        }
    },
    watch: {
        formConfig: {
            handler() {
                this.initCount()
                this.initOffset()
            },
            deep: true,
            immediate: true
        },
        formConfigBase: {
            handler(newVal) {
                this.formConfigBaseUsed = {
                    ...this.formConfigBaseUsed,
                    ...newVal
                }
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        initCount() {
            this.formConfigUsed = this.deepClone(this.formConfig)
            this.formShowConfig= this.formConfigUsed.filter(item=>item.type != "hidden" && item.type != "hiddenNumber") || []
            this.formShowConfig.forEach((item, i) => { 
                 if (i > (this.count - 1)) { 
                    item["defaultType"] = item.type
                    item.type = item.type == "number" ? "hiddenNumber" : "hidden"
                 }
            })
        },
        initOffset() {
            for(let key in this.searchGrig) {
                if(this.searchGrig[key].span == 24) {
                    return
                }
                this.searchGrig[key].offset = this.computedSpan(
                    this.searchGrig[key].span
                )
            } 
        },
        computedSpan(span) {
            let formLength = this.formConfigUsed.filter(item=>item.type != "hidden" && item.type != "hiddenNumber").length
            return (24 / span - (formLength % (24 / span)) - 1) * span;
        },
        deepClone(datas) {
             return JSON.parse(JSON.stringify(datas))
        },
        toggleCollapsed() {
            this.formToggle = !this.formToggle
            this.formShowConfig.forEach((item, i) => {
                if (this.formToggle) {
                    if (i > (this.count - 1)) {
                        item.type = item.defaultType;
                    }
                } else {
                    if (i > (this.count - 1)) {
                        item["defaultType"] = item.type;
                        item.type = item.type == "number" ? "hiddenNumber" : "hidden";
                    }
                }
            })
            this.initOffset()
        },
        onSearch(type) {
            let params = this.$refs.searchForm.getFieldsValue();
            if(this.formFunctionList.onSearch) {
                this.formFunctionList.onSearch(params, type)
            }
        },
        onReset() {
            this.$refs.searchForm.resetFields();
            this.onSearch('reset')
        }
    }
}
</script>

<style lang="less" scoped>
.fx_searchForm .ant-form-item {
    margin-bottom: 0;
}

.fx_searchForm {
    /deep/ .ant-form-inline .ant-form-item {
        display: flex;
        margin-right:0px!important;
        /deep/ .ant-form-item-control-wrapper {
            flex: 1;
        }
    }
}
</style>