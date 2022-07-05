<!--
 * @Author: yuanhao
 * @Date: 2022-06-29 17:36:33
 * @LastEditTime: 2022-07-04 11:02:18
 * @LastEditors: yuanhao
 * @Description: 表格
 * @FilePath: \jw-base\src\views\table\Index.vue
-->
<template>
    <div>
        <a-tabs>
            <a-tab-pane key="example" tab="例子">
                <jw-table :columns="columns" :tableData="sourceData" skin=""></jw-table>
            </a-tab-pane>
            <a-tab-pane key="api" tab="API">
                123
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
export default {
    data() {
        return {
            columns: [
                {
                    title: '日期',
                    dataIndex: 'date',
                    align: 'center'
                },
                {
                    title: '单位等效利用时数(h)',
                    dataIndex: 'installedKw',
                    align: 'center'
                },
                {
                    title: '等效时数(h)',
                    dataIndex: 'equivalent',
                    align: 'center'
                },
                {
                    title: '总发电量(kWh)',
                    dataIndex: 'epTotal',
                    align: 'center'
                },
                {
                    title: '同比发电量(kWh)',
                    dataIndex: 'epPariPass',
                    align: 'center'
                },
                {
                    title: '同比增减率(%)',
                    dataIndex: 'ratePariPass',
                    align: 'center'
                },
                {
                    title: '减排CO₂(吨)',
                    dataIndex: 'co2Weight',
                    align: 'center'
                }
            ],
            sourceData: [
                {
                    date: '2022-5-1',
                    installedKw: '20',
                    equivalent: '30',
                    epTotal: '100',
                    epPariPass: '1',
                    ratePariPass: '22',
                    co2Weight: '10'
                }
            ],
        }
    }
}
</script>

<style>

</style>