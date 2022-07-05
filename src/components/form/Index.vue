<!--
 * @Author: your name
 * @Date: 2021-12-13 14:08:22
 * @LastEditTime: 2022-07-05 15:24:50
 * @LastEditors: yuanhao
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \jw-base\src\components\form\Index.vue
-->
<template>
    <div>
        <a-form
            :form="form"
            :class="['jw_searchFrom', { jw_themeDark: theme == 'dark' }]"
            :label-col="formConfigBaseUsed.labelCol"
            :wrapper-col="formConfigBaseUsed.wrapperCol"
            :layout="formConfigBaseUsed.layout"
        >
            <a-row type="flex" justify="start" align="middle" :gutter="formConfigBaseUsed.gutter || [16, 16]">
                <a-col
                    v-for="(item, index) in formConfigData"
                    :key="index"
                    v-bind="item.grid || formConfigBaseUsed.grid"
                    v-show="item.type.indexOf('hidden') == -1"
                    :class="item.colClass ? item.colClass : ''"
                >
                    <a-form-item
                        :label="item.label"
                        v-if="item.show"
                        :colon="formConfigBaseUsed.colon"
                        :labelAlign="formConfigBaseUsed.labelAlign || 'right'"
                        :label-col="item.labelCol || formConfigBaseUsed.labelCol"
                        :wrapper-col="item.wrapperCol || formConfigBaseUsed.wrapperCol"
                    >
                        <!-- 单行输入框 -->
                        <a-input
                            v-if="item.type == 'input' || item.type == 'hidden'"
                            v-decorator="[
                                item.code,
                                {
                                    initialValue: item.defaultValue || '',
                                    rules: [
                                        {
                                            required: item.required,
                                            message: '请输入' + item.label
                                        },
                                        {
                                            validator: item.checkFunName
                                                ? (rule, value, callback) => {
                                                      checkFunction(rule, value, callback, item.checkFunName, item.funParams, item)
                                                  }
                                                : null
                                        }
                                    ]
                                }
                            ]"
                            v-bind="item.extra"
                            class="widthPi100"
                            :allowClear="item.allowClear || true"
                            :disabled="item.disabled"
                            :placeholder="item.placeholder || '请输入'"
                            @change="item.changeFunName ? formChange(...arguments, item.changeFunName, item) : null"
                        />
                        <!--数字输入框-->
                        <a-input-number
                            v-else-if="item.type == 'number' || item.type == 'hiddenNumber'"
                            v-decorator="[
                                item.code,
                                {
                                    initialValue: item.defaultValue || '',
                                    rules: [
                                        {
                                            required: item.required,
                                            message: '请输入' + item.label
                                        }
                                    ]
                                }
                            ]"
                            :min="item.min || null"
                            v-bind="item.extra"
                            :placeholder="item.placeholder || '请输入'"
                            :disabled="item.disabled"
                            class="widthPi100"
                            :allowClear="item.allowClear || true"
                            @change="item.changeFunName ? formChange(...arguments, item.changeFunName, item) : null"
                        />
                        <!-- 密码 -->
                        <a-input-password
                            v-else-if="item.type == 'password'"
                            v-decorator="[
                                item.code,
                                {
                                    initialValue: item.defaultValue || '',
                                    rules: [
                                        {
                                            required: item.required,
                                            message: '请输入' + item.label
                                        },
                                        {
                                            pattern: item.pattern || null,
                                            message: item.help || '请输入' + item.label,
                                            max: item.max || null
                                        },
                                        {
                                            validator: item.checkFunName
                                                ? (rule, value, callback) => {
                                                      checkFunction(rule, value, callback, item.checkFunName, item.funParams, item)
                                                  }
                                                : null
                                        }
                                    ]
                                }
                            ]"
                            v-bind="item.extra"
                            :allowClear="item.allowClear || true"
                            :disabled="item.disabled"
                            :placeholder="item.placeholder || '请输入'"
                            @change="item.changeFunName ? formChange(...arguments, item.changeFunName, item) : null"
                        />
                        <a-textarea
                            v-else-if="item.type == 'textarea'"
                            class="widthPi100"
                            :allowClear="item.allowClear || true"
                            v-bind="item.extra"
                            v-decorator="[
                                item.code,
                                {
                                    initialValue: item.defaultValue || '',
                                    rules: [
                                        {
                                            required: item.required,
                                            message: '请输入' + item.label
                                        },
                                        {
                                            pattern: item.pattern || null,
                                            message: item.help || '请输入' + item.label,
                                            max: item.max || null
                                        },
                                        {
                                            validator: item.checkFunName
                                                ? (rule, value, callback) => {
                                                      checkFunction(rule, value, callback, item.checkFunName, item.funParams, item)
                                                  }
                                                : null
                                        },
                                        {
                                            validator: replaceBraceFun
                                        }
                                    ]
                                }
                            ]"
                            :placeholder="item.placeholder || '请输入'"
                            :disabled="item.disabled"
                        />
                        <!-- 单选  -->
                        <a-radio-group
                            v-if="item.type == 'radio'"
                            v-bind="item.extra"
                            v-decorator="[
                                item.code,
                                {
                                    initialValue: item.defaultValue || '',
                                    rules: [
                                        {
                                            required: item.required,
                                            message: '请选择' + item.label
                                        }
                                    ]
                                }
                            ]"
                            :disabled="item.disabled"
                            class="widthPi100"
                            @change="item.changeFunName ? formChange(...arguments, item.changeFunName, item) : null"
                        >
                            <a-radio
                                v-for="element in item.dataFormat"
                                :data="element"
                                :key="element[item.fieldnames ? item.fieldnames.key : 'value']"
                                :value="element[item.fieldnames ? item.fieldnames.key : 'value']"
                            >
                                {{ element[item.fieldnames ? item.fieldnames.text : 'name'] }}
                            </a-radio>
                        </a-radio-group>
                        <!-- 多选 -->
                        <a-checkbox-group
                            v-else-if="item.type == 'checkbox'"
                            v-bind="item.extra"
                            v-decorator="[
                                item.code,
                                {
                                    initialValue: item.defaultValue || [],
                                    rules: [
                                        {
                                            required: item.required,
                                            message: '请选择' + item.label
                                        }
                                    ]
                                }
                            ]"
                            :disabled="item.disabled"
                            class="widthPi100"
                            @change="item.changeFunName ? formChange(...arguments, item.changeFunName, item) : null"
                        >
                            <a-checkbox
                                v-for="element in item.dataFormat"
                                :disabled="element.disabled"
                                :data="element"
                                :key="element[item.fieldnames ? item.fieldnames.key : 'value']"
                                :value="element[item.fieldnames ? item.fieldnames.key : 'value']"
                            >
                                {{ element[item.fieldnames ? item.fieldnames.text : 'name'] }}
                            </a-checkbox>
                        </a-checkbox-group>
                        <!-- 时间 -->
                        <a-date-picker
                            v-else-if="item.type == 'date'"
                            v-decorator="[
                                item.code,
                                {
                                    initialValue: item.defaultValue || null,
                                    rules: [
                                        {
                                            required: item.required,
                                            message: '请选择' + item.label
                                        }
                                    ]
                                }
                            ]"
                            v-bind="item.extra"
                            :placeholder="item.placeholder || '请选择'"
                            :disabled="item.disabled"
                            class="widthPi100"
                            :allowClear="item.allowClear || true"
                            :dropdownClassName="isTransform ? 'jw_popupContainer' : ''"
                            :getCalendarContainer="(trigger) => (isTransform ? trigger.parentNode : null)"
                            @change="item.changeFunName ? dateFormChange(item.changeFunName, ...arguments, item) : null"
                        />
                        <!-- 周 -->
                        <a-week-picker
                            v-else-if="item.type == 'week'"
                            v-decorator="[
                                item.code,
                                {
                                    initialValue: item.defaultValue || null,
                                    rules: [
                                        {
                                            required: item.required,
                                            message: '请选择' + item.label
                                        }
                                    ]
                                }
                            ]"
                            v-bind="item.extra"
                            :placeholder="item.placeholder || '请选择'"
                            :disabled="item.disabled"
                            class="widthPi100"
                            :allowClear="item.allowClear || true"
                            :dropdownClassName="isTransform ? 'jw_popupContainer' : ''"
                            :getCalendarContainer="(trigger) => (isTransform ? trigger.parentNode : null)"
                            @change="item.changeFunName ? dateFormChange(item.changeFunName, ...arguments, item) : null"
                        />
                        <!-- 月  -->
                        <a-month-picker
                            v-else-if="item.type == 'month'"
                            v-decorator="[
                                item.code,
                                {
                                    initialValue: item.defaultValue || null,
                                    rules: [
                                        {
                                            required: item.required,
                                            message: '请选择' + item.label
                                        }
                                    ]
                                }
                            ]"
                            v-bind="item.extra"
                            :placeholder="item.placeholder || '请选择'"
                            :disabled="item.disabled"
                            class="widthPi100"
                            :allowClear="item.allowClear || true"
                            :dropdownClassName="isTransform ? 'jw_popupContainer' : ''"
                            :getCalendarContainer="(trigger) => (isTransform ? trigger.parentNode : null)"
                            @change="item.changeFunName ? dateFormChange(item.changeFunName, ...arguments, item) : null"
                        />
                        <!-- 年 -->
                        <a-date-picker
                            v-else-if="item.type == 'year'"
                            v-decorator="[
                                item.code,
                                {
                                    initialValue: item.defaultValue || null,
                                    rules: [
                                        {
                                            required: item.required,
                                            message: '请选择' + item.label
                                        }
                                    ]
                                }
                            ]"
                            :placeholder="item.placeholder || '请选择'"
                            :dropdownClassName="isTransform ? 'jw_popupContainer' : ''"
                            :getCalendarContainer="(trigger) => (isTransform ? trigger.parentNode : null)"
                            :disabled="item.disabled"
                            mode="year"
                            :open="open"
                            class="widthPi100"
                            format="YYYY"
                            :allowClear="item.allowClear || true"
                            @panelChange="(value, mode) => onPanelChange(value, mode, item)"
                            @openChange="onOpenChange"
                        />
                        <!-- 时间范围 -->
                        <a-range-picker
                            v-else-if="item.type == 'dateRange'"
                            v-decorator="[
                                item.code,
                                {
                                    initialValue: item.defaultValue || [],
                                    rules: [
                                        {
                                            required: item.required,
                                            message: '请选择' + item.label
                                        }
                                    ]
                                }
                            ]"
                            v-bind="item.extra"
                            :placeholder="item.placeholder || ['开始时间', '结束时间']"
                            :disabled="item.disabled"
                            class="widthPi100"
                            :allowClear="item.allowClear || true"
                            :dropdownClassName="isTransform ? 'jw_popupContainer' : ''"
                            :getCalendarContainer="(trigger) => (isTransform ? trigger.parentNode : null)"
                            @change="item.changeFunName ? dateFormChange(item.changeFunName, ...arguments, item) : null"
                        />
                        <!-- 级联选择 -->
                        <a-cascader
                            v-else-if="item.type == 'cascader'"
                            :options="item.dataFormat"
                            v-decorator="[
                                item.code,
                                {
                                    initialValue: item.defaultValue || [],
                                    rules: [
                                        {
                                            required: item.required,
                                            message: '请输入' + item.label
                                        }
                                    ]
                                }
                            ]"
                            v-bind="item.extra"
                            :allowClear="item.allowClear || true"
                            :disabled="item.disabled"
                            :placeholder="item.placeholder || '请选择'"
                            @change="item.changeFunName ? formChange(...arguments, item.changeFunName, item) : null"
                        />
                        <!-- 下拉选择框 -->
                        <a-select
                            v-else-if="item.type == 'select'"
                            v-decorator="[
                                item.code,
                                {
                                    initialValue: item.defaultValue || (item.extra && item.extra.mode == 'multiple' ? [] : ''),
                                    rules: [
                                        {
                                            required: item.required,
                                            message: '请选择' + item.label
                                        }
                                    ]
                                }
                            ]"
                            class="widthPi100"
                            show-search
                            v-bind="item.extra"
                            :allowClear="item.allowClear || true"
                            :filter-option="filterOption"
                            :placeholder="item.placeholder || '请选择'"
                            :dropdownClassName="isTransform ? 'jw_popupContainer' : ''"
                            :getPopupContainer="(triggerNode) => triggerNode.parentNode || document.body"
                            :disabled="item.disabled"
                            @change="item.changeFunName ? selectFormChange(item.changeFunName, ...arguments, item) : null"
                        >
                            <a-select-option v-if="!item.hideNullData" :key="-1" value="">
                                {{ item.placeholder || '请选择' }}
                            </a-select-option>
                            <a-select-option
                                v-for="element in item.dataFormat"
                                :data="element"
                                :key="element[item.fieldnames ? item.fieldnames.key : 'value']"
                                :value="element[item.fieldnames ? item.fieldnames.key : 'value']"
                            >
                                {{ element[item.fieldnames ? item.fieldnames.text : 'name'] }}
                            </a-select-option>
                        </a-select>
                        <a-tree-select
                            v-else-if="item.type == 'treeSelect'"
                            v-decorator="[
                                item.code,
                                {
                                    initialValue: item.defaultValue || (item.multiple ? [] : ''),
                                    rules: [
                                        {
                                            required: item.required,
                                            message: '请输入' + item.label
                                        }
                                    ]
                                }
                            ]"
                            :dropdownClassName="isTransform ? 'jw_popupContainer' : ''"
                            :getPopupContainer="(triggerNode) => triggerNode.parentNode || document.body"
                            v-bind="item.extra"
                            :class="['widthPi100', item.className]"
                            :dropdown-style="{ maxHeight: item.maxHeight || '400px', overflow: 'auto' }"
                            :allowClear="item.allowClear || true"
                            :multiple="item.multiple || false"
                            :treeCheckable="item.treeCheckable || false"
                            :tree-data="item.dataFormat"
                            :placeholder="item.placeholder || '请选择'"
                            :treeNodeFilterProp="item.treeNodeFilterProp || 'title'"
                            @change="item.changeFunName ? selectFormChange(item.changeFunName, ...arguments, item) : null"
                        >
                        </a-tree-select>
                        <a-upload
                            v-else-if="item.type == 'file'"
                            :multiple="item.multiple"
                            :listType="item.listType || 'picture-card'"
                            :fileList="fileList"
                            :remove="handleRemove"
                            :beforeUpload="(file) => beforeUpload(file, item)"
                            v-bind="item.extra"
                            v-decorator="[
                                item.code,
                                {
                                    rules: [
                                        {
                                            required: item.required,
                                            message: '请上传' + item.label
                                        }
                                    ]
                                }
                            ]"
                        >
                            <template v-if="fileList.length < (item.max || 1000)">
                                <a-icon :type="loading ? 'loading' : 'plus'" />
                                <div class="ant-upload-text">上传</div>
                            </template>
                        </a-upload>
                        <slot v-else :name="item.slot" :data="item"></slot>
                        <!--增删改查表单插槽，解决插槽二级穿透问题-->
                        <slot name="searchSlot" :data="item"></slot>
                    </a-form-item>
                </a-col>
                <slot name="formExpand" :data="formConfigBaseUsed.grid"></slot>
            </a-row>
        </a-form>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    name: 'jw-form',
    data() {
        return {
            form: this.$form.createForm(this, {
                name: this.formConfigBase.formName || 'form'
            }),
            formConfigBaseUsed: {},
            isTransform: false,
            open: false,
            fileList: [],
            uploadFileList: [],
            loading: false
        }
    },
    props: {
        //表单内容配置数据
        formConfigData: {
            type: Array,
            default: () => []
        },
        //表单的基本配置数据
        formConfigBase: {
            type: Object,
            default: () => {
                return {
                    labelCol: { span: 5 },
                    wrapperCol: { span: 15 },
                    formName: 'form',
                    layout: 'horizontal',
                    grid: {
                        xxs: 24,
                        xs: 24,
                        sm: 24,
                        md: 24,
                        lg: 24,
                        xl: 24,
                        xxl: 24
                    },
                    gutter: [16, 0],
                    colon: true
                }
            }
        },
        //相关业务方法
        formFunctionList: {
            type: Object,
            default: () => {
                return {}
            }
        },
        theme: {
            type: String,
            default: 'dark'
        }
    },
    watch: {
        formConfigBase: {
            handler(newVal) {
                if (Object.keys(newVal).length) {
                    this.formConfigBaseUsed = {
                        ...this.formConfigBaseUsed,
                        ...newVal
                    }
                }
            },
            deep: true,
            immediate: true
        }
    },
    mounted() {
        this.isTransform = !document.querySelector('div').style.transform ? false : true
    },
    methods: {
        moment,
        /**
         * @description: 获取所有表单数据
         * @param {*}
         * @return {*}
         */
        getFieldsValue() {
            var params = this.form.getFieldsValue()
            return params
        },
        /**
         * @description: 获取某个表单数据
         * @param {*} key
         * @return {*}
         */
        getFieldValue(key) {
            return this.form.getFieldValue(key)
        },
        /**
         * @description: 清空表单
         * @param {*}
         * @return {*}
         */
        resetFields(names) {
            names ? this.form.resetFields(names) : this.form.resetFields()
        },
        /**
         * @description: 批量设置表单数据
         * @param {*} datas
         * @return {*}
         */
        setFieldsValue(datas) {
            var formData = this.getFieldsValue() //防止表单没有对应数据
            for (var item in formData) {
                if (datas[item] != undefined) {
                    this.setFieldValue(item, datas[item])
                }
            }
        },
        /**
         * @description: 设置表单单个数据
         * @param {*} key
         * @param {*} data
         * @return {*}
         */
        setFieldValue(key, data) {
            this.form.setFieldsValue({
                [key]: data
            })
        },
        /**
         * @description: 调用父页面方法
         * @param {*} funName
         * @param {*} datas
         * @return {*}
         */
        emitFunction(funName, datas) {
            if (this.formFunctionList[funName]) {
                this.formFunctionList[funName](datas)
            }
        },
        /**
         * @description: 调用父页面校验方法
         * @param {*} rule
         * @param {*} value
         * @param {*} callback
         * @param {*} checkFunName
         * @param {*} funParams
         * @return {*}
         */
        checkFunction(rule, value, callback, checkFunName, funParams, item) {
            this.formFunctionList[checkFunName](rule, value, callback, funParams, item)
        },
        /**
         * @description: 表单校验
         * @param {*} callback
         * @return {*}
         */
        checkForm(callback) {
            this.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    callback(values)
                }
            })
        },
        /**
         * @description: select过滤方法
         * @param {*} input
         * @param {*} option
         * @return {*}
         */
        filterOption(input, option) {
            return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
        },
        /**
         * @description: select  change事件调用父页面方法
         * @param {*} e
         * @param {*} option
         * @param {*} changeFunName
         * @return {*}
         */
        selectFormChange(changeFunName, e, option, info, item) {
            if (this.formFunctionList[changeFunName]) {
                this.formFunctionList[changeFunName](e, option, info, item)
            }
        },
        /**
         * @description: 时间 change事件调用父页面方法
         * @param {*} changeFunName
         * @param {*} date
         * @param {*} dateString
         * @param {*} item
         * @return {*}
         */
        dateFormChange(changeFunName, date, dateString, item) {
            if (this.formFunctionList[changeFunName]) {
                this.formFunctionList[changeFunName](date, dateString, item)
            }
        },
        /**
         * @description: input等  change事件调用父页面方法
         * @param {*} e
         * @param {*} changeFunName
         * @return {*}
         */
        formChange(e, changeFunName, item) {
            if (this.formFunctionList[changeFunName]) {
                this.formFunctionList[changeFunName](e, item)
            }
        },
        /**
         * @description: 重新校验单个表单元素
         * @param {*} fields
         * @param {*} options
         * @param {*} callback
         * @return {*}
         */
        checkFormItem(fields, options, callback) {
            this.form.validateFields(fields, options, callback)
        },
        // 去掉首尾空格
        replaceBraceFun(rule, value, callback) {
            let newValue = value.replace(/^\s+|\s+$/g, '')
            this.form.setFieldsValue({ [rule.field]: newValue })
            callback()
        },
        onOpenChange(status) {
            this.open = status
        },
        onPanelChange(value, mode, item) {
            this.$nextTick(() => {
                let nowDate = new Date(value).getFullYear()
                this.open = false
                this.form.setFieldsValue({
                    [item.code]: moment(nowDate, 'YYYY')
                })
                if (item.changeFunName) {
                    this.dateFormChange(item.changeFunName, value, nowDate, item)
                }
            })
        },
        //移除文件
        handleRemove(file) {
            const index = this.fileList.indexOf(file)
            const newFileList = this.fileList.slice()
            newFileList.splice(index, 1)
            this.fileList = newFileList
            this.uploadFileList = this.fileList.map((el) => el.url)
        },
        //上传文件
        beforeUpload(file, item) {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
            if (!isJpgOrPng) {
                this.$message.error('支持 .jpg .png .gif等图片格式')
            }

            const isLt1M = file.size / 1024 / 1024 < 1
            if (!isLt1M) {
                this.$message.error('图片大小不可超过1M')
            }
            if (isJpgOrPng && isLt1M) {
                if (item.changeFunName) {
                    this.loading = true
                    this.formChange(file, item.changeFunName, (data) => {
                        this.loading = false
                        if (data) {
                            this.fileList = [
                                ...this.fileList,
                                {
                                    uid: new Date().getTime(),
                                    name: file.name,
                                    status: 'done',
                                    url: data.url,
                                    thumbUrl: data.thumbUrl
                                }
                            ]
                            this.uploadFileList = this.fileList.map((el) => el.url)
                        }
                    })
                }
            }
            return false
        },
        handlePreview(file) {
            if (file.thumbUrl) {
                window.open(file.thumbUrl)
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import '~@a/less/form.less';
.widthPi100 {
    width: 100% !important;
}
.relative {
    position: relative;
}
/deep/ .jw_popupContainer {
    top: 36px !important;
    left: 0px !important;
}
</style>
<style lang="less">
.jw_themeDark {
    @import '~ant-design-vue/dist/antd.less';
    @checkbox-check-color: #1890ff;
}
</style>
