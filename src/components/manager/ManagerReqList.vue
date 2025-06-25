<script setup>
import Mock from '@/mock/Mock'
import { onMounted, ref } from 'vue'
const userState = ref('')
const userInfo = ref('')
const managerReqListData = ref([])
const search = () => {}
const clearSearch = () => {
  userState.value = ''
  userInfo.value = ''
}

console.log(Mock.getManagerReqList())

onMounted(() => {
  managerReqListData.value = Mock.getManagerReqList()
})
</script>
<template>
  <div id="managerReqList">
    <div class="content-container">
      <el-container class="content-row flex items-center">
        <div class="input-tip">用户状态:</div>
        <div class="input-field">
          <el-input v-model="userState" placeholder="请输入" />
        </div>

        <div class="input-tip">用户信息:</div>
        <div class="input-field">
          <el-input v-model="userInfo" placeholder="请输入" />
        </div>
      </el-container>

      <el-container class="input-row mt-6">
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button type="primary" @click="clearSearch">清空搜索条件</el-button>
      </el-container>

      <el-table :data="managerReqListData" style="width: 100%">
        <el-table-column prop="userInfo" label="用户信息" width="300" />
        <el-table-column label="状态" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.status ? 'success' : 'primary'">{{
              scope.row.status ? '通过' : '待审核'
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="200" />
        <el-table-column prop="addTime" label="添加时间" width="200" />
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-button :type="scope.row.operate ? 'success' : 'danger'">
              {{ scope.row.operate ? '通过' : '下线' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
