<script setup>
import { onMounted, ref } from 'vue'
import Mock from '@/mock/Mock'
import { ElMessage } from 'element-plus'

onMounted(() => {
  managerList.value = Mock.getManagerList()
})

const queryparams = ref({
  phone: '',
  name: '',
  state: '',
})
const managerList = ref([])

const search = () => {
  ElMessage({
    type: 'success',
    message: `"请求参数"${JSON.stringify(queryparams.value)}`,
  })
  managerList.value = Mock.getManagerList()
}
const clear = () => {
  queryparams.value = {
    phone: '',
    name: '',
    state: '',
  }
  managerList.value = Mock.getManagerList()
}
</script>
<template>
  <div id="ManagerList">
    <div class="content-container">
      <div>
        <el-container class="content-row" style="display: flex; align-items: center; gap: 10px">
          <div class="input-row">店长手机:</div>
          <div class="input-field">
            <el-input v-model="queryparams.phone" placeholder="请输入" />
          </div>

          <div class="input-row">店长昵称:</div>
          <div class="input-field">
            <el-input v-model="queryparams.name" placeholder="请输入" />
          </div>

          <div class="input-row">店长状态:</div>
          <div class="input-field">
            <el-select v-model="queryparams.state" placeholder="请选择" style="width: 200px">
              <el-option label="后台开通 " value="1" key="1" />
              <el-option label="站外申请" value="2" key="2" />
            </el-select>
          </div>
        </el-container>

        <el-container class="content-row" style="display: flex; align-items: center; gap: 10px">
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button type="primary" @click="clear">清空搜索条件</el-button>
        </el-container>

        <el-container class="content-row" style="display: flex; align-items: center; gap: 10px">
          <el-table :data="managerList" style="width: 100%" tooltip-effect="dark">
            <el-table-column prop="people" label="分销人信息" width="300" />
            <el-table-column prop="weixin" label="微信信息" width="150" />
            <el-table-column label="状态" width="100">
              <template #default="scope">
                <el-tag :type="scope.row.state ? 'success' : ''">{{
                  scope.row.state ? '激活' : '审核中'
                }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="income" label="收入总额" width="100" />
            <el-table-column prop="back" label="退款" width="180" />
            <el-table-column label="来源" width="100">
              <template #default="scope">
                <el-tag>{{ scope.row.source }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="customer" label="客户数" width="100" />
            <el-table-column prop="time" label="更新时间" width="200" />
          </el-table>
        </el-container>
      </div>
    </div>
  </div>
</template>
