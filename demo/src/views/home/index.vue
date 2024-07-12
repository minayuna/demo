<template>
  <div class="nav">
    <div>
      <img src="@/assets/image/组 4@2x(3).png" style="height: 40px;">
      <div class="nav">

      </div>
    </div>
    <el-dropdown v-if="isLogin">
      <span class="el-dropdown-link">
        <img src="" alt="" srcset="">
        {{ userStore.username }}
        <el-icon style="display: inline-block;">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="changePass">修改密码</el-dropdown-item>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-button v-else type="primary" @click="loginHandler">登录</el-button>
  </div>
  <div v-if="loginFlag" class="login-wrap">
    <Login @leaveLoginBoard="leaveLoginBoard" />
  </div>

</template>

<script setup>
import { ref, watchEffect } from 'vue';
import Login from '@/views/login/index.vue'
import useUserStore from '@/stores/modules/user';

let userStore = useUserStore()
let loginFlag = ref(false)
let isLogin = ref(false)
//监听是否已经登录
watchEffect(() => {
  let a = userStore.username
  if(userStore.username) {
    isLogin.value = true
  } else {
    isLogin.value = false
  }
})

const loginHandler = () => {
  loginFlag.value = true
}

const leaveLoginBoard = () => {
  loginFlag.value = false
}

const logout = () => {
  userStore.logout()
  isLogin.value = false
}

const changePass = () => {
  
}
</script>

<style>
.nav {
  display: flex;
  margin: auto;
  width: 55rem;
  align-content: space-between;
  vertical-align: middle;
  align-items: center;
}

.login-wrap {
  background-color: rgba(192, 192, 192, 0.5);
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
}

.el-dropdown-link {
  width: 100px;
}
</style>