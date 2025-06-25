import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useLoginStore = defineStore('Login', () => {
  const userName = ref('') // 用户名
  const passWord = ref('') // 密码
  // 检查用户是否已登录
  // 如果用户名和密码都不为空，则认为用户已登录
  // 这里可以根据实际需求修改登录逻辑
  const isLogin = () => {
    return userName.value.length > 0 && passWord.value.length > 0
  }

  // 清除用户信息
  const clearUserInfo = () => {
    userName.value = ''
    passWord.value = ''
  }

  // 注册用户信息
  const registUserInfo = (name, password) => {
    userName.value = name
    passWord.value = password
    console.log(`注册用户信息：用户名=${userName.value}, 密码=${passWord.value}`)
  }
  return {
    userName,
    passWord,
    isLogin,
    clearUserInfo,
    registUserInfo,
  }
})
