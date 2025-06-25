<script setup>
import { ElMessage } from 'element-plus'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const queryParams = reactive({
  marketPrice: 0,
  showPrice: 0,
  coin: 0,
  price: 0,
  limte: 0,
  count: 0,
  sellCount: 0,
  viewCount: 0,
})

const submit = () => {
  ElMessage({
    type: 'success',
    message: `'设置商品基本属性'${JSON.stringify(queryParams)}`,
  })
}
const cancel = () => {
  router.go(-1)
}
</script>
<template>
  <div id="GoodsPriceSetting">
    <div class="title">
      <div style="line-height: 35px; margin-left: 20px">价格设置</div>
    </div>

    <el-container class="content-row" style="display: flex; align-items: center">
      <div class="input-tip">市场价:</div>
      <div class="input-filed">
        <el-input v-model="queryParams.marketPrice" placeholder="请输入" />
      </div>
    </el-container>

    <el-container class="content-row" style="display: flex; align-items: center">
      <div class="input-tip">展示架:</div>
      <div class="input-filed">
        <el-input v-model="queryParams.showPrice" placeholder="请输入" />
      </div>
    </el-container>

    <el-container class="content-row" style="display: flex; align-items: center">
      <div class="input-tip">积分数:</div>
      <div class="input-filed">
        <el-input v-model="queryParams.coin" placeholder="请输入" />
      </div>
    </el-container>

    <el-container class="content-row" style="display: flex; align-items: center">
      <div class="input-tip">成本价:</div>
      <div class="input-filed">
        <el-input v-model="queryParams.price" placeholder="请输入" />
      </div>
    </el-container>

    <el-container class="content-row" style="display: flex; align-items: center">
      <div class="input-tip">限购数:</div>
      <div class="input-filed">
        <el-input v-model="queryParams.limte" placeholder="请输入" />
      </div>
    </el-container>

    <div class="title">
      <div style="line-height: 35px; margin-left: 20px">库存设置</div>
    </div>

    <el-container class="content-row" style="display: flex; align-items: center">
      <div class="input-tip">库存数量:</div>
      <div class="input-filed">
        <el-input v-model="queryParams.count" placeholder="请输入" />
      </div>
    </el-container>

    <el-container class="content-row" style="display: flex; align-items: center">
      <div class="input-tip">基础数量:</div>
      <div class="input-filed">
        <el-input v-model="queryParams.sellCount" placeholder="请输入" />
      </div>
    </el-container>

    <el-container class="content-row" style="display: flex; align-items: center">
      <div class="input-tip">游览数量:</div>
      <div class="input-filed">
        <el-input v-model="queryParams.viewCount" placeholder="请输入" />
      </div>
    </el-container>

    <el-container class="content-row" style="display: flex; align-items: center">
      <el-button type="success" plain @click="submit">提交</el-button>
      <div style="margin-left: 40px"></div>
      <el-button type="warning" plain @click="cancel">取消</el-button>
    </el-container>
  </div>
</template>

<style scoped>
.title {
  margin-bottom: 15px;
  height: 35px;
  background: #fff8dc;
}
</style>
