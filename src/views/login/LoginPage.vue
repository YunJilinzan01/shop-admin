<script setup>
// 引入 Pinia 的登录状态管理 store
import { useLoginStore } from '@/stores/Login'
// 引入 Element Plus 的消息提示组件
import { ElMessage } from 'element-plus'
// 引入 Vue 的响应式 API
import { computed, ref } from 'vue'
// 引入 vue-router 的路由跳转功能
import { useRouter } from 'vue-router'

// 获取登录 store 实例
const useStore = useLoginStore()
// 获取路由实例，用于页面跳转
const router = useRouter()
// 用户名输入框的响应式数据
const name = ref('')
// 密码输入框的响应式数据
const password = ref('')

// 计算属性：当用户名和密码都为空时，登录按钮禁用
const disabled = computed(() => name.value.length === 0 && password.value.length === 0)

// 登录方法，表单提交时触发
const login = async () => {
  // 判断用户名和密码是否为固定的 admin/000000
  if (name.value === 'admin' && password.value === '000000') {
    // 调用 store 方法注册用户信息
    useStore.registUserInfo(name.value, password.value)
    // 弹出登录成功提示
    ElMessage.success('登录成功')
    // 3 秒后跳转到首页，并清空输入框
    setTimeout(() => {
      router.push('/home')
      name.value = ''
      password.value = ''
    }, 3000)
  } else {
    // 登录失败，弹出错误提示并清空输入框
    ElMessage.error('登录失败')
    name.value = ''
    password.value = ''
  }
}
</script>

<template>
  <!-- 外层容器，设置渐变背景和居中布局 -->
  <div
    class="relative min-h-screen w-full overflow-hidden flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#6b8dd6]"
  >
    <!-- 粒子背景层，使用径向渐变和动画实现动态粒子效果 -->
    <div class="absolute inset-0 z-0 pointer-events-none">
      <div
        class="animate-particle-bg w-full h-full opacity-10 bg-[radial-gradient(circle,_#ffffff30_1px,_transparent_1px)] bg-[length:20px_20px]"
      ></div>
    </div>

    <!-- 主体内容区域，响应式排列，左右分栏 -->
    <div
      class="relative z-10 w-full max-w-screen-lg px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-12"
    >
      <!-- 左侧：宣传文案 -->
      <div class="md:w-1/2 w-full text-center md:text-left">
        <div class="text-3xl md:text-4xl font-bold text-white mb-4 text-wipe animate-text-wipe">
          高效管理，数据驱动决策——您的电商运营智慧之选
        </div>
        <div class="text-lg md:text-xl text-white/80 text-wipe animate-text-wipe delay-[0.6s]">
          赋能每一次决策，让运营更简单
        </div>
      </div>

      <!-- 右侧：登录表单 -->
      <div
        class="md:w-1/2 w-full bg-white/20 backdrop-blur-2xl rounded-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/30 p-8"
      >
        <!-- el-form 组件，阻止默认提交，绑定 login 方法 -->
        <el-form @submit.prevent="login">
          <h1 class="text-2xl font-bold text-white text-center mb-6">电商后台管理系统</h1>
          <!-- 用户名输入框，双向绑定 name -->
          <el-input v-model="name" placeholder="请输入用户名" prefix-icon="User" class="mb-5" />
          <!-- 密码输入框，双向绑定 password -->
          <el-input
            v-model="password"
            placeholder="请输入密码"
            prefix-icon="lock"
            class="mb-5"
            show-password
          />

          <!-- 登录按钮，禁用状态由 disabled 控制，渐变背景和涟漪效果 -->
          <el-button
            :disabled="disabled"
            class="relative overflow-hidden w-full py-2 text-white rounded bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 transition-all hover:text-black disabled:opacity-50 border-none"
            native-type="submit"
          >
            登录
            <!-- 涟漪动画装饰（可配合 JS 实现点击动画） -->
            <span
              class="ripple absolute rounded-full bg-white opacity-40 transform scale-0 pointer-events-none"
            ></span>
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* 粒子背景动画关键帧 */
@keyframes particle-move {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100px 100px;
  }
}
/* 粒子背景动画类 */
.animate-particle-bg {
  animation: particle-move 30s linear infinite;
}

/* 按钮涟漪动画关键帧 */
@keyframes ripple-effect {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
/* 涟漪动画类 */
.animate-ripple {
  animation: ripple-effect 0.6s linear;
}

/* 文字擦除动画关键帧 */
@keyframes text-wipe {
  0% {
    mask-position: 100% 0;
    -webkit-mask-position: 100% 0;
  }
  100% {
    mask-position: 0% 0;
    -webkit-mask-position: 0% 0;
  }
}
/* 文字渐变遮罩样式 */
.text-wipe {
  display: inline-block;
  background: linear-gradient(to right, #fff 0%, #fff 100%);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  mask-image: linear-gradient(to right, white 50%, transparent 50%);
  -webkit-mask-image: linear-gradient(to right, white 50%, transparent 50%);
  mask-size: 200% 100%;
  -webkit-mask-size: 200% 100%;
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
}
/* 文字擦除动画类 */
.animate-text-wipe {
  animation: text-wipe 1.8s ease-out forwards;
}
</style>
