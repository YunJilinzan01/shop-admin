<script setup>
import GoodsEdit from './GoodsEdit.vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const content = ref('')
const submit = () => {
  ElMessage({
    type: 'success',
    message: `'设置HTML'${content.value}`,
  })
}
const cancel = () => {
  router.go(-1)
}
const contentChange = (val) => {
  content.value = val
}
</script>
<template>
  <div id="GoodsDetailSetting">
    <div style="margin-bottom: 20px">
      <GoodsEdit @contentChange="contentChange" />
    </div>
    <el-container class="content-row" style="display: flex; align-items: center">
      <el-button type="success" plain @click="submit">提交</el-button>
      <div style="margin-left: 40px"></div>
      <el-button type="warning" plain @click="cancel">取消</el-button>
    </el-container>
  </div>
</template>
