<script setup>
import { ref } from 'vue'
import GoodsBaseSetting from './GoodsBaseSetting.vue'
import GoodsPriceSetting from './GoodsPriceSetting.vue'
import GoodSDetailSetting from './GoodSDetailSetting.vue'

const activeTab = ref('1')
const handleClick = (item) => {
  console.log(item)
}
</script>
<template>
  <div id="addGoods">
    <div class="content-container">
      <el-tabs v-model="activeTab" @tab-click="handleClick" type="card">
        <el-tab-pane label="基础设置" name="1">
          <GoodsBaseSetting />
        </el-tab-pane>
        <el-tab-pane label="价格库存" name="2">
          <GoodsPriceSetting />
        </el-tab-pane>
        <el-tab-pane label="商品详情" name="3">
          <GoodSDetailSetting />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
