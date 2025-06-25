<script setup>
import { ref, watch } from 'vue'
import { useLoginStore } from '@/stores/Login'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
const useStore = useLoginStore()
const router = useRouter()
const route = useRoute()
const selectItem = (index) => {
  // 处理菜单项选择事件
  router.push(index)
  console.log(index)
}
const logout = () => {
  useStore.clearUserInfo()
  ElMessage({
    message: '注销成功',
    type: 'success',
    duration: 3000, // 2秒后自动关闭
  })
  setTimeout(() => {
    // 跳转到登录页
    router.push('/login')
  }, 3000)
}
const activeIndex = ref(route.fullPath)

watch(
  () => route.fullPath,
  (newPath) => {
    activeIndex.value = newPath
  },
)
</script>
<template>
  <div id="Home">
    <el-container id="container">
      <el-aside width="250px" style="background: #545c64; padding: 0">
        <div class="aside-content">
          <div class="aside-header">
            <img src="../../assets/logo.svg" alt="logo" style="width: 25px; height: 25px" />
            <div style="margin-left: 15px; color: #fff; font-size: 17px">电商后台管理</div>
          </div>
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            @select="selectItem"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            style="border-right: none; flex: 1; min-height: 0"
          >
            <el-sub-menu index="1">
              <template #title>
                <el-icon>
                  <List />
                </el-icon>
                <span>订单管理</span>
              </template>
              <el-menu-item index="/home/order?type=0">普通订单</el-menu-item>
              <el-menu-item index="/home/order?type=1">秒杀订单</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="2">
              <template #title>
                <el-icon>
                  <Shop />
                </el-icon>
                <span>商品管理</span>
              </template>
              <el-menu-item index="/home/goods/0">普通商品</el-menu-item>
              <el-menu-item index="/home/goods/1">秒杀商品</el-menu-item>
              <el-menu-item index="/home/goods/2">今日推荐</el-menu-item>
              <el-menu-item index="/home/goods/category">商品分类</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="3">
              <template #title>
                <el-icon>
                  <Avatar />
                </el-icon>
                <span>店长管理</span>
              </template>
              <el-menu-item index="/home/ownerlist">店长列表</el-menu-item>
              <el-menu-item index="/home/ownerreq">店长申请审批列表</el-menu-item>
              <el-menu-item index="/home/ownerorder">店长订单</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="4">
              <template #title>
                <el-icon>
                  <Ticket />
                </el-icon>
                <span>财务管理</span>
              </template>
              <el-menu-item index="/home/tradeinfo">交易明细</el-menu-item>
              <el-menu-item index="/home/tradelist">财务对账单</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="5">
              <template #title>
                <el-icon>
                  <Tools />
                </el-icon>
                <span>基础管理</span>
              </template>
              <el-menu-item index="/home/data">数据统计</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <el-main style="padding: 0">
          <el-header style="margin: 0; padding: 0; height: 80px">
            <el-container style="background: white; margin: 0; padding: 0; height: 80px">
              <div style="margin: auto; margin-left: 100px">
                <h1>欢迎登录后台管理系统，管理员用户!</h1>
              </div>
              <div style="margin: auto; margin-right: 50px; display: flex; align-items: center">
                <h4 style="margin-right: 20px; display: flex; align-items: center; gap: 10px">
                  <el-icon size="18px">
                    <User />
                  </el-icon>
                  {{ useStore.userName }}
                </h4>
                <el-button type="primary" @click="logout">退出登录</el-button>
              </div>
            </el-container>
          </el-header>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style scoped>
#Home {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
.aside-content {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.aside-header {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
