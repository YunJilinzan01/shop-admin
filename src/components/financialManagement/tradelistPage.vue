<script setup>
import Mock from '@/mock/Mock'
import { onMounted, ref } from 'vue'

const activeName = ref('dailySummary')

const dailySummaryData = ref([])
const monthlyRollupData = ref([])

const handleClick = (activeName) => {
  if (activeName === 'dailySummary') {
    dailySummaryData.value = []
    dailySummaryData.value = Mock.getTradeList(activeName)
    return
  } else {
    monthlyRollupData.value = []
    monthlyRollupData.value = Mock.getTradeList(activeName)
  }
}

onMounted(() => {
  dailySummaryData.value = Mock.getTradeList('dailySummary')
  monthlyRollupData.value = Mock.getTradeList('monthlyRollup')
})
</script>
<template>
  <div id="tradelistPage">
    <div class="content-container">
      <el-tabs v-model="activeName" @tab-click="handleClick(activeName)" type="border-card">
        <el-tab-pane label="日汇总" name="dailySummary">
          <el-table :data="dailySummaryData" style="width: 100%">
            <el-table-column prop="date" label="日期" width="380" />
            <el-table-column prop="revenue" label="收入" width="380" />
            <el-table-column prop="expenditures" label="支出" width="380" />
            <el-table-column prop="remark" label="备注" width="380" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="月汇总" name="monthlyRollup">
          <el-table :data="monthlyRollupData" style="width: 100%">
            <el-table-column prop="date" label="日期" width="380" />
            <el-table-column prop="revenue" label="收入" width="380" />
            <el-table-column prop="expenditures" label="支出" width="380" />
            <el-table-column prop="remark" label="备注" width="380" /> </el-table
        ></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
