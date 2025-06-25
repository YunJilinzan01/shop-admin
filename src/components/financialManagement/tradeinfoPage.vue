<script setup>
import Mock from '@/mock/Mock'
import Tools from '@/stores/Tools'
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'
const goodsName = ref('')
const userName = ref('')
const phone = ref('')
const orderType = ref('')
const paymentTime = ref([''])
const platform = ref('')
const tradeinfoData = ref([])

const search = () => {
  ElMessage({
    type: 'success',
    message: `请求参数`,
  })
  tradeinfoData.value = Mock.getTradeinfo()
}
const clear = () => {
  goodsName.value = ''
  userName.value = ''
  phone.value = ''
  platform.value = ''
  orderType.value = ''
  paymentTime.value = ['']
  tradeinfoData.value = Mock.getTradeinfo()
}
const Export = () => {
  Tools.exporJson(`订单`)
}

onMounted(() => {
  tradeinfoData.value = Mock.getTradeinfo()
})
</script>
<template>
  <div id="tradeinfo">
    <div class="content-container">
      <div class="content-row">
        <el-container class="flex items-center">
          <div class="input-tip">商品名称：</div>
          <div class="input-field">
            <el-input v-model="goodsName" placeholder="请输入" />
          </div>
          <div class="input-tip">用户名称：</div>
          <div class="input-field">
            <el-input v-model="userName" placeholder="请输入" />
          </div>
          <div class="input-tip">手机号码：</div>
          <div class="input-field">
            <el-input v-model="phone" placeholder="请输入" />
          </div>
        </el-container>

        <el-container class="flex items-center mt-6">
          <div class="input-tip">订单类型：</div>
          <div class="input-field">
            <el-input v-model="orderType" placeholder="请输入" />
          </div>

          <div class="input-tip">平台单号：</div>
          <div class="input-field">
            <el-input v-model="platform" placeholder="请输入" />
          </div>

          <div class="input-tip">支付时间：</div>
          <div class="input-field">
            <el-date-picker
              v-model="paymentTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>
        </el-container>

        <el-container class="content-row flex items-center mt-6">
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button type="primary" @click="clear">清空搜索条件</el-button>
          <el-button type="primary" @click="Export">导出</el-button>
        </el-container>

        <el-table :data="tradeinfoData" style="width: 100%">
          <el-table-column prop="name" label="名称" width="500" />
          <el-table-column prop="orderNumber" label="单号" width="300" />
          <el-table-column prop="username" label="名称" width="200">
            <template #default="scope">
              {{ scope.row.methods ? '网络支付' : '线下支付' }}
            </template>
          </el-table-column>
          <el-table-column prop="methods" label="支付方式" width="200" />
          <el-table-column prop="paymentTime" label="时间" width="200" />
        </el-table>
      </div>
    </div>
  </div>
</template>
