<!--
 * @Author: yuanhao
 * @Date: 2022-06-29 17:41:15
 * @LastEditTime: 2022-07-04 14:04:39
 * @LastEditors: yuanhao
 * @Description: 首页
 * @FilePath: \jw-base\src\views\Index.vue
-->
<template>
    <a-layout id="components-layout-demo-custom-trigger">
        <a-layout-sider v-model="collapsed" width='280' :trigger="null" collapsible>
            <div :style="{height: '70px'}"></div>
            <a-menu 
                :selectedKeys="selectedKeys" 
                mode="inline" 
                :defaultSelectedKeys="defaultSelectedKeys"
                :openKeys="openKeys" 
                @openChange="onOpenChange" theme="dark"
            >
                <template v-for='item in leftMenuData'>
                    <a-menu-item 
                        @click='clickMenuTitle(item)' 
                        v-if='item.children.length==0' 
                        :key='item.path'
                    >
                        <div class="fx_menuItem">
                            {{item.name}}
                        </div>
                    </a-menu-item>
                    <a-sub-menu :key="item.path" v-else>
                        <div slot="title" class="fx_menuItem">
                            {{item.name}}
                        </div>
                        <a-menu-item 
                            @click='clickMenuTitle(item,element)' 
                            :title="element.name"
                            v-for='element in item.children' 
                            :key='element.path'
                        >
                            {{element.name}}
                        </a-menu-item>
                    </a-sub-menu>
                </template>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header>
                <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="changeCollapsed" />
            </a-layout-header>
            <a-layout-content>
                <div class='fx_menuTitle'><span></span>{{$route.meta.title}}</div>
                <div class='fx_content'>
                    <router-view v-if="isRouterAlive" :key="$route.fullPath"></router-view>
                </div>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
export default {
    data() {
        return {
            collapsed: false,
            rootSubmenuKeys: ['userManagement'],
            openKeys: [],
            openKeysCache: [],
            defaultSelectedKeys: ['userManagement'],
            leftMenuData: [
                {
                    name: '表格',
                    path: 'table',
                    children: []
                },
                {
                    name: '表单',
                    path: 'form',
                    children: []
                },
                {
                    name: '查询框',
                    path: 'searchForm',
                    children: []
                },
            ],
            isRouterAlive: true, //路由刷新判断
            selectedKeys: []
        }
    },
    mounted() {
        this.initOpenKeys()
    },
    methods: {
        initOpenKeys() {
            let parentKey = ''
            this.leftMenuData.forEach(item => {
                if (item.children && item.children.length > 0) {
                    if (item.children.find(element => element.path == this.$route.name)) {
                        parentKey = item.path
                    }
                } 
                if(item.path == this.$route.name) {
                    parentKey = item.path
                }
            })
            this.openKeys = [parentKey]
            this.selectedKeys = [this.$route.name]
            if(parentKey == '') {
                let path = this.leftMenuData[0].path
                this.$router.push({
                    name: path
                })
                this.selectedKeys = [path]
            }
        },
        changeCollapsed() {
            this.collapsed = !this.collapsed
            if (this.collapsed === true) {
                this.openKeysCache = JSON.parse(JSON.stringify(this.openKeys))
                this.openKeys = []
            } else {
                this.openKeys = this.openKeysCache
            }
        },
        //路由跳转，面包屑设置
        clickMenuTitle(item, element) {
            if (element && element.path !== '' || item.path !== '') {
                this.menuTitle = element ? element.name : item.name
                this.isRouterAlive = false
                this.$router.push({
                    name: element ? element.path : item.path,
                    params: {
                        pageParams: element ? element.path : item.path
                    }
                });
                this.selectedKeys = []
                this.selectedKeys.push(element ? element.path : item.path)
            } else {
                this.$message.error('快马加班赶制中！')
            }
            this.reload()
        },
        //菜单只打开选中的
        onOpenChange(openKeys) {
            const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
            if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                this.openKeys = openKeys;
            } else {
                this.openKeys = latestOpenKey ? [latestOpenKey] : [];
                this.openKeysCache = latestOpenKey ? [latestOpenKey] : [];
            }
        },
        //点击菜单可以刷新当前页面
        reload() {
            this.$nextTick(() => (this.isRouterAlive = true))
        }
    }
}
</script>

<style lang="less" scoped> 
.fx_menuItem {
    display: flex;
    align-items: center;
}

.fx_menuTitle {
    height: 70px;
    line-height: 70px;
    padding-left: 26px;
    background: #ffffff;
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    color: #333333;

    span {
        width: 5px;
        height: 28px;
        background: #267cff;
        border-radius: 3px;
        margin-right: 16px;
        display: inline-block;
        vertical-align: middle;
    }
}

.fx_content {
    padding: 16px;
    min-height: calc(100vh - 180px);
}
</style>