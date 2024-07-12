<template>
  <div class="login-card">
    <div class="card-top"><span style="font-weight: 600;">欢迎登录</span><el-icon @click="handleClose" class="close">
        <Close />
      </el-icon></div>
    <hr>
    <el-form class="card-middle" label-width="40%" :rules="rules" ref="loginVali"
      style="padding-right: 20%; padding-top: 10%;">
      <el-form-item label="用户名：" prop="username">
        <el-input type="text" v-model="loginData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input :type="passtype" v-model="loginData.password"></el-input>
        <img v-if="passInvis" src="@/assets/image/矢量智能对象@2x(9).png" class="pass-switch" @click="handlePass">
        <img v-else src="@/assets/image/矢量智能对象@2x(10).png" class="pass-switch" @click="handlePass">
      </el-form-item>
    </el-form>
    <div class="card-bottom">
      <el-button type="primary" style="width: 50%;" @click="handleLogin">登录</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElNotification } from 'element-plus';
import useUserStore from '@/stores/modules/user';
import { GET_TOKEN } from '@/utils/token';

let $emit = defineEmits(['leaveLoginBoard'])
let userStore = useUserStore()
let passInvis = ref(true)
let passtype = ref("password")
let loginData = ref({
  username: 'hzw_9527',
  password: '123123',
})
let loginVali = ref()
//hzw_9527 123123
//qhdx_lmm 123123

const handleClose = () => {
  $emit('leaveLoginBoard')
}

const handlePass = () => {
  passInvis.value = !passInvis.value
  if (passInvis.value) {
    passtype.value = 'password'
  } else {
    passtype.value = 'text'
  }
}

const handleLogin = async () => {
  await loginVali.value.validate()
  try {
    await userStore.userLogin(loginData.value)
    await userStore.userInfo()
    ElNotification({
      type: 'success',
      message: '欢迎回来',
    })
    $emit('leaveLoginBoard')
  } catch (error) {
    ElNotification({
      type: 'error',
      message: error.message
    })
  }

}
//校验登录信息
const validatorUsername = (rule, value, callback) => {
  if (value.length >= 3) {
    callback()
  } else {
    callback(new Error('账号长度至少为3位'))
  }
}
const validatorPassword = (rule, value, callback) => {
  if (value.length >= 6 && value.length <= 15) {
    callback()
  } else {
    callback(new Error('密码长度至少为6位'))
  }
}
const rules = {
  username: [
    { validator: validatorUsername, trigger: 'change' }
  ],
  password: [
    { validator: validatorPassword, message: '密码长度为6~15位', trigger: 'change' }
  ]
}
</script>

<style scoped>
.login-card {
  background-color: white;
  border-radius: 5px;
  width: 420px;
  height: 40%;
  margin: 10rem auto;
}

.card-top {
  padding: 20px 35px 10px 35px;
}

.close {
  float: right;
}

.pass-switch {
  width: 16px;
}

.card-middle img {
  position: relative;
  top: -22px;
  left: 90%;
}

.card-bottom {
  text-align: center;
}
</style>