<script setup>
import { useLoginStore } from '@/stores/Login'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
const store = useLoginStore()
const categoryList = ref([
  {
    id: 1231,
    name: '男装',
    manager: '管理员用户01',
  },
  {
    id: 1232,
    name: '男鞋',
    manager: '管理员用户01',
  },
  {
    id: 1233,
    name: '帽子',
    manager: '管理员用户01',
  },
])

const addCategory = () => {
  ElMessageBox.prompt('请输入分类名称', '新增分类', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  }).then((res) => {
    categoryList.value.push({
      id: `${Date.now()}`.slice(-4) + Math.floor(Math.random()),
      name: res.value,
      manager: store.userName,
    })
  })
}
const deleteCategory = (index) => {
  categoryList.value.splice(index, 1)
  ElMessage({
    type: 'success',
    message: '删除成功',
  })
}
</script>
<template>
  <div id="GoodsCategory">
    <div class="content-container">
      <el-container class="content-row">
        <el-button type="primary" @click="addCategory">添加规范</el-button>
      </el-container>
      <!-- table -->
      <div>
        <el-table :data="categoryList" style="width: 100%">
          <el-table-column prop="id" label="分类ID" width="100" />
          <el-table-column prop="name" label="分类名称" width="100" />
          <el-table-column prop="manager" label="分类负责人" width="500" />
          <el-table-column prop="time" label="操作" width="200">
            <template #default="scoped">
              <el-button type="danger " @click="deleteCategory(scoped.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
