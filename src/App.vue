<!--
 * @Author: yuanhao
 * @Date: 2022-05-30 11:45:27
 * @LastEditTime: 2022-07-05 13:24:17
 * @LastEditors: yuanhao
 * @Description: 
 * @FilePath: \jw-base\src\App.vue
-->
<template>
    <div id="app" :style="{ transform: transform }">
        <a-config-provider :locale="zhCN">
            <router-view />
        </a-config-provider>
    </div>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
    name: 'App',
    data() {
        return {
            zhCN,
            transform: 'scale(1,1)'
        }
    },
    mounted() {
        this.initScale()
        window.onresize = () => {
            this.initScale()
        }
    },
    methods: {
        initScale() {
            let xRate = (parseInt((window.innerWidth / 1920) * 10000) / 10000).toFixed(4)
            let yRate = (parseInt((window.innerHeight / 1080) * 10000) / 10000).toFixed(4)
            sessionStorage.xRate = xRate
            sessionStorage.yRate = yRate
            this.transform = 'scale(' + xRate + ',' + yRate + ')'
        }
    }
}
</script>

<style lang="less" scoped>
#app {
    width: 1920px;
    height: 1080px;
    overflow: hidden;
    -moz-transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
    -o-transform-origin: 0 0;
}
</style>
