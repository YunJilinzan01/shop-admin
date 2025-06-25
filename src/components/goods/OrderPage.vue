<script setup>
// 引入模拟数据模块，用于生成假订单数据
import Mock from '@/mock/Mock'
// 引入工具方法模块，包含导出等功能
import Tools from '@/stores/Tools'
// 引入 Element Plus 的消息提示组件
import { ElMessage } from 'element-plus'
// 引入 Vue 的响应式和生命周期相关方法
import { onMounted, ref } from 'vue'
// 引入 vue-router 的路由相关方法
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

// 获取当前路由对象
const route = useRoute()

// 表格组件的引用，用于操作表格
const multipeTable = ref()
// 订单列表数据，存储所有订单
const orderList = ref([])
// 查询参数，绑定到页面上的筛选表单
const queryParams = ref({
  goods: '', // 商品名称
  consignee: '', // 收货人
  payTime: '', // 支付时间
  name: '', // 用户名称
  phone: '', // 手机号
  sendTime: '', // 发货时间
})
// 多选表格选中的订单
const multpleSelection = ref([])

// 筛选请求数据的方法
const requestData = () => {
  // 弹出消息提示，显示当前筛选参数
  ElMessage({
    type: 'success',
    message: '筛选请求参数',
    //message: `筛选请求参数${JSON.stringify(queryParams.value)}`,
  })
  // 根据当前路由类型获取订单数据
  orderList.value = Mock.getOrder(route.query.type)
}

// 清空筛选条件的方法
const clear = () => {
  // 重置查询参数
  queryParams.value = {
    goods: '',
    consignee: '',
    payTime: '',
    name: '',
    phone: '',
    sendTime: '',
  }
  // 重新获取订单数据
  orderList.value = Mock.getOrder(route.query.type)
}

// 导出订单数据的方法
const exportData = () => {
  // 调用工具方法导出订单数据为 JSON 文件
  Tools.exporJson(`订单.json${JSON.stringify(orderList.value)}`)
}

// 批量发货的方法
const dispatchGoods = () => {
  // 弹出消息提示，显示选中的订单
  ElMessage({
    type: 'success',
    message: `发货商品${JSON.stringify(multpleSelection.value)}`,
  })
  // 重新获取订单数据
  orderList.value = Mock.getOrder(route.query.type)
}

// 导出批量发货样单的方法
const exportDispatchGoods = () => {
  // 调用工具方法导出选中的订单为 JSON 文件
  Tools.exporJson(`发货单.json${JSON.stringify(multpleSelection.value)}`)
}

// tab 切换时的处理函数
const handleClick = (tab) => {
  // 弹出消息提示，显示当前 tab 标签
  ElMessage({
    type: 'success',
    message: `切换tab刷新数据${tab.props.label}`,
  })
}

// 表格多选变化时的处理函数
const handleSelectionChange = (val) => {
  // 更新多选数据
  multpleSelection.value = val
}

// 删除订单的方法
const deleteItem = (item) => {
  // 从订单列表中删除指定索引的订单
  orderList.value.splice(item, 1)
}

// 联系客户的方法
const callUser = (item) => {
  // 弹出消息提示，显示客户手机号
  ElMessage({
    type: 'success',
    message: `联系客户${item.phone}`,
  })
}

// 组件挂载时，获取订单数据
onMounted(() => {
  orderList.value = Mock.getOrder(route.query.type)
})

// 路由参数变化时，重新获取订单数据
onBeforeRouteUpdate((to) => {
  orderList.value = Mock.getOrder(to.query.type)
})
</script>

<template>
  <!-- 订单管理页面的主容器 -->
  <div id="order">
    <div class="content-container" direction="vertical">
      <!-- 筛选输入区域 -->
      <div>
        <!-- 第一行筛选条件：商品名称、收货人、支付时间 -->
        <el-container class="content-row" style="display: flex; align-items: center">
          <div class="input-tip">商品名称:</div>
          <div class="input-field">
            <!-- 商品名称输入框，双向绑定 queryParams.goods -->
            <el-input v-model="queryParams.goods" />
          </div>
          <div class="input-tip">收货人:</div>
          <div class="input-field">
            <!-- 收货人输入框，双向绑定 queryParams.consignee -->
            <el-input v-model="queryParams.consignee" />
          </div>
          <div class="input-tip">支付时间:</div>
          <div class="input-field">
            <!-- 支付时间选择器，双向绑定 queryParams.payTime -->
            <el-date-picker
              v-model="queryParams.payTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>
        </el-container>

        <!-- 第二行筛选条件：用户名称、手机号、发货时间 -->
        <el-container class="content-row" style="display: flex; align-items: center">
          <div class="input-tip">用户名称:</div>
          <div class="input-field">
            <!-- 用户名称输入框，双向绑定 queryParams.name -->
            <el-input v-model="queryParams.name" />
          </div>
          <div class="input-tip">手机号:</div>
          <div class="input-field">
            <!-- 手机号输入框，双向绑定 queryParams.phone -->
            <el-input v-model="queryParams.phone" />
          </div>
          <div class="input-tip">发货时间:</div>
          <div class="input-field">
            <!-- 发货时间选择器，双向绑定 queryParams.sendTime -->
            <el-date-picker
              v-model="queryParams.sendTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>
        </el-container>

        <!-- 操作按钮区域：筛选、清除筛选、导出、批量发货、下载发货样单 -->
        <el-container class="content-row" style="display: flex; align-items: center">
          <!-- 点击筛选按钮，调用 requestData 方法 -->
          <el-button type="primary" @click="requestData">筛选</el-button>
          <!-- 点击清除筛选按钮，调用 clear 方法 -->
          <el-button type="danger" @click="clear">清除筛选</el-button>
          <!-- 点击导出按钮，调用 exportData 方法 -->
          <el-button type="primary" @click="exportData">导出</el-button>
          <!-- 点击批量发货按钮，调用 dispatchGoods 方法 -->
          <el-button type="primary" @click="dispatchGoods">批量发货</el-button>
          <!-- 点击下载批量发货样单按钮，调用 exportDispatchGoods 方法 -->
          <el-button type="primary" @click="exportDispatchGoods">下载批量发货样单</el-button>
        </el-container>
      </div>

      <!-- 订单列表区域 -->
      <div class="list">
        <!-- tab 切换，不同订单状态 -->
        <el-tabs type="card" @tab-click="handleClick">
          <el-tab-pane label="全部"></el-tab-pane>
          <el-tab-pane label="未支付"></el-tab-pane>
          <el-tab-pane label="已支付"></el-tab-pane>
          <el-tab-pane label="待发货"></el-tab-pane>
          <el-tab-pane label="已发货"></el-tab-pane>
          <el-tab-pane label="支付超时"></el-tab-pane>
        </el-tabs>
        <!-- 订单表格，展示订单数据 -->
        <el-table
          :data="orderList"
          style="width: 100%"
          ref="multipeTable"
          tooltip-effect="dark"
          @select-change="handleSelectionChange"
        >
          <!-- data 表格数据源 -->
          <!-- multipeTable 表格引用 -->
          <!-- select-change 多选变化时调用 -->
          <!-- 多选框列 -->
          <el-table-column type="selection" width="55" />
          <!-- 商品名称列 -->
          <el-table-column prop="name" label="商品" width="100" />
          <!-- 总价/数量列 -->
          <el-table-column prop="price" label="总价/数量" width="100" />
          <!-- 买家信息列 -->
          <el-table-column prop="buyer" label="买家信息" width="100" />
          <!-- 交易时间列 -->
          <el-table-column prop="time" label="交易时间" width="200" />

          <!-- 分销信息列，显示经理或分销员 -->
          <el-table-column label="分销信息" width="100">
            <template #default="scope">
              <el-tag :type="scope.row.role ? '' : 'info'" size="default">
                {{ scope.row.role ? '经理' : '分销员' }}
              </el-tag>
            </template>
          </el-table-column>

          <!-- 状态列，显示已完成或未完成 -->
          <el-table-column label="状态" width="100">
            <template #default="scope">
              <el-tag :type="scope.row.state ? 'succeed' : 'danger'" size="default">
                {{ scope.row.role ? '已完成' : '未完成' }}
              </el-tag>
            </template>
          </el-table-column>

          <!-- 操作列，包含删除和联系客户按钮 -->
          <el-table-column label="操作" width="200">
            <template #default="scope">
              <!-- 删除按钮，点击调用 deleteItem 方法 -->
              <el-button type="danger" size="small" @click="deleteItem(scope.$index)">
                删除
              </el-button>
              <!-- 联系客户按钮，点击调用 callUser 方法 -->
              <el-button type="primary" size="small" @click="callUser(scope.row)">
                联系客户
              </el-button>
            </template>
          </el-table-column>

          <!-- 支付方式列，显示微信或支付宝 -->
          <el-table-column label="支付方式" width="100">
            <template #default="scope">
              <el-tag size="default">
                {{ scope.row.payType ? '微信' : '支付宝' }}
              </el-tag>
            </template>
          </el-table-column>

          <!-- 来源列，显示订单来源 -->
          <el-table-column label="来源" width="300" prop="source" />
        </el-table>
      </div>
    </div>
  </div>
</template>
