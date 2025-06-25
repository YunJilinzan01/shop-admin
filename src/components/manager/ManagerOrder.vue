<script setup>
import Mock from '@/mock/Mock'
import Tools from '@/stores/Tools'
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'
const orderStatus = ref('')
const orderName = ref('')
const userName = ref('')
const deliveryTimm = ref([''])
const paymentTime = ref([''])

const mangaerOrder = ref([])

const search = () => {
  ElMessage({
    type: 'success',
    message: `请求参数`,
  })
  mangaerOrder.value = Mock.getManagerList()
}
const clear = () => {
  orderStatus.value = ''
  orderName.value = ''
  userName.value = ''
  deliveryTimm.value = ['']
  paymentTime.value = ['']
  mangaerOrder.value = Mock.getMangaerOrder()
}
const Export = () => {
  Tools.exporJson(`订单`)
}

onMounted(() => {
  mangaerOrder.value = Mock.getMangaerOrder()
})
</script>
<template>
  <div id="mangaerOrder">
    <div class="content-container">
      <div class="content-row">
        <el-container class="flex items-center">
          <div class="input-tip">订单状态：</div>
          <div class="input-field">
            <el-input v-model="orderStatus" placeholder="请输入" />
          </div>
          <div class="input-tip">订单名称：</div>
          <div class="input-field">
            <el-input v-model="orderName" placeholder="请输入" />
          </div>
          <div class="input-tip">用户名称：</div>
          <div class="input-field">
            <el-input v-model="userName" placeholder="请输入" />
          </div>
        </el-container>

        <el-container class="flex items-center mt-6">
          <div class="input-tip">发货时间：</div>
          <div class="input-field">
            <el-date-picker
              v-model="deliveryTimm"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
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

        <el-table :data="mangaerOrder" style="width: 100%">
          <el-table-column prop="type" label="类型" width="100"> 店长信息 </el-table-column>
          <el-table-column prop="name" label="名称" width="250" />
          <el-table-column prop="orderNumber" label="订单号" width="180" />
          <el-table-column prop="mangaerInfo" label="店长信息" width="100" />
          <el-table-column prop="numberPieces" label="件数" width="100" />
          <el-table-column prop="price" label="价格" width="150" />
          <el-table-column prop="commission" label="佣金" width="100" />
          <el-table-column prop="paymentTime" label="支付时间" width="200" />
        </el-table>
      </div>
    </div>
  </div>
</template>
