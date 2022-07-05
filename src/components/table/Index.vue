<template>
    <div :class="'jw_'+ skin">
        <a-table 
            :loading="loading"
            :row-key="(record, index) => rowKey && record[rowKey] ? record[rowKey] : index" 
            :columns="columns"
            :data-source="tableData" 
            :pagination="false" 
            :bordered="bordered"
            :rowClassName="rowClassName"
            :scroll="{ x: scrollX, y: scrollY }"
            :row-selection="rowSelection ? {
                type: rowSelection,
                selectedRowKeys: selectedRowKeys,
                onChange: onSelectChange
            } : null"
            :customRow="customRow ? rowClick : null"
            @change="onTableChange"
        >
            <!--序号-->
            <template slot="theIndex" slot-scope="text, record, index">
                {{ (pageNum - 1) * pageSize + index + 1 }}
            </template>
            <!--日期-->
            <template slot="date" slot-scope="text">
                {{ text ? text.replace("T", " ") : "-" }}
            </template>
            <!--空数据-->
            <template slot="emptyData" slot-scope="text">
                {{ text || "-" }}
            </template>
            <!-- 其他单个或者多个可自定义的项 -->
            <template
                v-for="columnsName in slotsList"
                :slot="columnsName"
                slot-scope="text, record, index"
            >
                <slot
                    :name="columnsName"
                    :data="{ text, record, index }"
                ></slot>
            </template>
        </a-table>
        <a-row class="jw_pagination marginT16" v-if="tableData.length">
            <a-pagination
                v-if="pagination"
                show-quick-jumper
                :total="total"
                :page-size="pageSize"
                :current="pageNum"
                :show-total="(total) => `共 ${total} 条记录`"
                @change="changePage"
            >
                <template slot="buildOptionText" slot-scope="props">
                    <span>{{ props.value }} 条/页</span>
                </template>
            </a-pagination>
        </a-row>
    </div>
</template>

<script>
export default {
    name: 'jw-table',
    data() {
        return {
            rowClassName(record, index) {
                let className = "jw_darkRow";
                if (index % 2 === 1) {
                    className = "jw_lightRow";
                }
                return className;
            },
            rowClick: (record, index) => ({
                // 事件
                on: {
                    click: () => {
                        // 点击当前行时要做的事情
                        if (!this.rowSelection && !this.customRow) {
                            return false
                        }
                        const {rowKey} = this
                        let item = rowKey && record[rowKey] ? record[rowKey] : index
                        let i = this.selectedRowKeys.findIndex(
                            (t) => t == item
                        )
                        if (i === -1) {
                            if(this.rowSelection == 'checkbox') {
                                this.selectedRowKeys.push(item)
                                this.selectedRows.push(record)
                            } else {
                                this.selectedRowKeys = [item]
                                this.selectedRows = [record]
                            }
                        } else {
                            this.selectedRowKeys.splice(i, 1);
                            this.selectedRows.splice(i, 1);
                        }
                        this.$emit("onTableClick", [
                            this.selectedRowKeys,
                            this.selectedRows
                        ])
                    },
                    dblclick: () => {
                        this.$emit("fxDblclick", record);
                    },
                    contextmenu: () => {
                        this.$emit("fxContextmenu", record);
                    },
                    mouseenter: () => {
                        this.$emit("fxMouseenter", record);
                    },
                    mouseleave: () => {
                        this.$emit("fxMouseleave", record);
                    },
                }
            }),
            selectedRowKeys: [],
            selectedRows: [],
            slotsList: []
        }
    },
    props: {
        rowKey: {
            type: String,
            default: "",
        },
        columns: {
            type: Array,
            default: () =>  []
        },
        tableData: {
            type: Array,
            default: () => []
        },
        bordered: {
            type: Boolean,
            default: false
        },
        scrollX: {
            type: Number,
            default: 0
        },
        scrollY: {
            type: Number,
            default: 0
        },
        loading: {
            type: Boolean,
            default: false
        },
        pageNum: {
            type: Number,
            default: 1,
        },
        pageSize: {
            type: Number,
            default: 10,
        },
        total: {
            type: Number,
            default: 0,
        },
        customRow: {
            type: Boolean,
            default: false,
        },
        rowSelection: {
            type: [Boolean, String],
            default: false,
        },
        skin: {
            type: String,
            default: 'dark'
        },
        pagination: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        columns: {
            handler() {
                this.getSlotsList()
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        onTableChange(pagination, filters, sorter) {
            if(Object.keys(filters).length) {
                this.$emit('onFilter', filters) // 筛选
            } else if(Object.keys(sorter).length) {
                this.$emit('onSorter', sorter) // 排序
            } else if(Object.keys(pagination).length){
                this.$emit('onPagination', pagination) //分页
            }
        },
        onSelectChange(selectedRowKeys, selectedRows) {
            this.selectedRowKeys = selectedRowKeys
            this.selectedRows = selectedRows
            this.$emit("onTableClick", [
                this.selectedRowKeys,
                this.selectedRows
            ])
        },
        getSlotsList() {
            this.slotsList = []
            this.columns.forEach((item) => {
                if(item.scopedSlots) {
                    const customRender = item.scopedSlots.customRender
                    // 特定slot名称占用
                    if (
                        customRender !== "theIndex" &&
                        customRender !== "date" &&
                        customRender !== "emptyData" 
                    ) {
                        this.slotsList.push(customRender);
                    }
                }
            })
        },
        changePage(current) {
            this.$emit('changePage', current)
        }
    }
}
</script>

<style lang="less" scoped>
@import '~@a/less/table.less';
</style>