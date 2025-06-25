<script setup>
// 引入模拟数据模块，用于生成假订单数据
import Mock from '@/mock/Mock'
// 引入工具方法模块，包含导出等功能
// 引入 Element Plus 的消息提示组件
import { ElMessage } from 'element-plus'
// 引入 Vue 的响应式和生命周期相关方法
import { computed, onMounted, ref } from 'vue'
// 引入 vue-router 的路由相关方法
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
// 组件挂载时，获取订单数据
onMounted(() => {
  goodsData.value = Mock.getGoods(route.query.type)
})

// 路由参数变化时，重新获取订单数据
onBeforeRouteUpdate((to) => {
  goodsData.value = Mock.getGoods(to.query.type)
})

const goodsData = ref([])
const categories = ref(['全部', '男装', '女装'])

const queryParams = ref({
  name: '',
  id: '',
  category: '',
  sellMode: 2,
  expMode: 2,
})

const sellModeString = computed({
  get() {
    if (queryParams.value.sellMode === 2) {
      return '全部'
    }
    return queryParams.value.sellMode === 0 ? '否' : '是'
  },
  set(val) {
    queryParams.value.sellMode = val
  },
})
const expModeString = computed({
  get() {
    if (queryParams.value.expMode === 2) {
      return '全部'
    }
    return queryParams.value.expMode === 0 ? '否' : '是'
  },
  set(val) {
    queryParams.value.expMode = val
  },
})

const requestData = () => {
  ElMessage({
    type: 'success',
    message: '筛选请求参数',
  })
  goodsData.value = Mock.getGoods(route.query.type)
}
const operate = (item) => {
  item.state = !item.state
}

const clear = () => {
  queryParams.value = {
    name: '',
    id: '',
    category: '',
    sellMode: 2,
    expMode: 2,
  }
  goodsData.value = Mock.getGoods(route.query.type)
}
const addGoods = () => [
  router.push({
    name: 'AddGoods',
    query: {
      type: route.query.type,
    },
  }),
]
</script>
<template>
  <div class="content-container" direction="vertical">
    <!-- input -->
    <div>
      <el-container class="content-row" style="display: flex; align-items: center">
        <div class="input-tip">商品名称:</div>
        <div class="input-field">
          <el-input v-model="queryParams.name" />
        </div>
        <div class="input-tip">商品编号:</div>
        <div class="input-field">
          <el-input v-model="queryParams.id" />
        </div>
        <div class="input-tip">商品分类:</div>
        <div class="input-field">
          <el-select v-model="queryParams.category" placeholder="请选择分类" style="width: 240px">
            <el-option v-for="item in categories" :key="item.id" :label="item" :value="item" />
          </el-select>
        </div>
      </el-container>
      <el-container class="content-row" style="display: flex; align-items: center">
        <div class="input-tip">是否上架</div>
        <div class="input-field">
          <el-select style="width: 240px" v-model="sellModeString">
            <el-option label="否" :value="0" key="0" />
            <el-option label="是" :value="1" key="1" />
            <el-option label="全部" :value="2" key="2" />
          </el-select>
        </div>
        <div class="input-tip">是否过期：</div>
        <div class="input-field">
          <el-select style="width: 240px" v-model="expModeString">
            <el-option label="否" :value="0" key="0" />
            <el-option label="是" :value="1" key="1" />
            <el-option label="全部" :value="2" key="2" />
          </el-select>
        </div>
      </el-container>
    </div>
    <!-- button -->
    <div class="contet-row">
      <el-container>
        <el-button type="primary" @click="requestData">检索</el-button>
        <el-button type="primary" @click="clear">显示全部</el-button>
        <el-button type="success" @click="addGoods">新增商品</el-button>
      </el-container>
    </div>
    <!-- list -->
    <div>
      <el-table :data="goodsData" style="width: 100%" tooltip-effect="dark">
        <el-table-column label="商品" width="100">
          <template #default="scope">
            <div style="text-align: center">
              <el-image style="width: 60px; height: 100px" :src="scope.row.img" />
              <div style="text-align: center">{{ scope.row.name }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="价格" width="180" prop="price" />
        <el-table-column label="销量" prop="sellCount" width="100" />
        <el-table-column label="库存" width="180" prop="count" />
        <el-table-column label="退款数量" width="180" prop="back" />
        <el-table-column label="退款金额" prop="backPirce" />
        <el-table-column label="操作" width="100" prop="name">
          <template #default="scope">
            <el-button @click="operate(scope.row)" :type="scope.row.state ? 'danger' : 'success'">{{
              scope.row.state ? '下架' : '上架'
            }}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="管理员" width="100" prop="owner" />
        <el-table-column label="更新时间" width="200" prop="time" />
      </el-table>
    </div>
  </div>
</template>
