<script setup>
import { ElMessage } from 'element-plus'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const queryParames = reactive({
  name: '',
  desc: '',
  timeRange: '',
  category: 0,
})

const submit = () => {
  ElMessage({
    type: 'success',
    message: `'设置商品基本属性'${JSON.stringify(queryParames)}`,
  })
}
const cancel = () => {
  router.go(-1)
}
</script>
<template>
  <div id="GoodsBaseSetting">
    <el-container class="content-row" style="display: flex; align-items: center">
      <div class="input-tip">商品名称:</div>
      <div class="input-field">
        <el-input v-model="queryParames.name" />
      </div>
    </el-container>

    <el-container class="content-row" style="display: flex; align-items: center">
      <div class="input-tip">商品价格:</div>
      <div class="input-field">
        <el-input v-model="queryParames.desc" type="textarea" :rows="3" />
      </div>
    </el-container>

    <el-container class="content-row" style="display: flex; align-items: center">
      <div class="input-tip">商品封面:</div>
      <div class="input-field">
        <el-upload :auto-upload="false" :limit="1" list-type="picture-card">
          <el-icon size="20px" color="#00f">
            <Plus />
          </el-icon>
        </el-upload>
      </div>
    </el-container>

    <el-container class="content-row" style="display: flex; align-items: center">
      <div class="input-tip">列表图片:</div>
      <div class="input-field">
        <el-upload :auto-upload="false" :limit="5" list-type="picture-card">
          <el-icon size="20px" color="#00f">
            <Plus />
          </el-icon>
        </el-upload>
      </div>
    </el-container>

    <el-container class="content-row" style="display: flex; align-items: center">
      <div class="input-tip">上架日期:</div>
      <div class="input-field">
        <el-date-picker
          v-model="queryParames.timeRange"
          type="daterange"
          placeholder="请选择日期"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          range-separator="至"
        />
      </div>
    </el-container>

    <el-container class="content-row" style="display: flex; align-items: center">
      <div class="input-tip">商品分类:</div>
      <div class="input-field">
        <el-select v-model="queryParames.category" placeholder="请选择" style="width: 200px">
          <el-option label="男装" :value="0" key="0" />
          <el-option label="女装" :value="1" key="1" />
          <el-option label="围巾" :value="2" key="2" />
        </el-select>
      </div>
      <div>
        <el-button type="primary" size="small" round>添加分类</el-button>
      </div>
    </el-container>

    <el-container class="content-row" style="display: flex; align-items: center">
      <el-button type="success" plain @click="submit">提交</el-button>
      <div style="margin-left: 40px"></div>
      <el-button type="warning" plain @click="cancel">取消</el-button>
    </el-container>
  </div>
</template>
