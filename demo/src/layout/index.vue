<template>
  <div class="top">
    <div class="nav">
      <div class="nav-left">
        <img src="@/assets/image/组 4@2x(3).png" style="height: 30px; margin-right: 20px;">
        <el-menu class="el-menu" mode="horizontal" :ellipsis="false" @select="handleSelect" default-active="home">
          <Menu :menuList="menuList"></Menu>
        </el-menu>
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
  </div>
  <div class="middle" style="padding-top: 15px; padding-bottom: 40px;">
    <Main class="layout-main" ></Main>
  </div>
  <div class="bottom">
    <span>copyright</span>
  </div>
  <div v-if="loginFlag" class="login-wrap">
    <Login @leaveLoginBoard="leaveLoginBoard" />
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Login from '@/views/login/index.vue'
import Menu from '@/layout/menu/index.vue'
import Main from '@/layout/main/index.vue'
import useUserStore from '@/stores/modules/user';
import { constantRoute } from '@/router/routes'
//过滤其他路由
let menuList = constantRoute.filter(item => {
  if (item.meta.nav) {
    return true
  }
})
let $route = useRoute()
let $router = useRouter()
let userStore = useUserStore()
let loginFlag = ref(false)
let isLogin = ref(false)
//监听是否已经登录
watchEffect(() => {
  let a = userStore.username
  if (userStore.username) {
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
  $router.push('/')
}

const changePass = () => {

}
</script>

<style scoped>
.nav,
.layout-main {
  display: flex;
  margin: auto;
  width: 65rem;
  flex: 1 1;
  align-content: space-between;
  vertical-align: middle;
  align-items: center;
}

.nav-left {
  display: flex;
  flex-wrap: nowrap;
  margin-right: 8%;
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

.el-menu {
  height: 40px;
  overflow: visible;
}

.top {
  width: 100%;
  box-shadow: 1px 4px 5px rgb(150, 150, 150);
}

.middle {
  text-align: center;
  background-color: rgb(248, 248, 248);
}

.bottom {
  text-align: center;
  height: 50px;
  width: 100%;
  background-color: rgb(38, 38, 39);
  color: white;
}
</style>