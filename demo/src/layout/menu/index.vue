<template>
  <el-menu class="el-menu" mode="horizontal" :ellipsis="false" @select="handleSelect" default-active="home">
    <el-menu-item v-for="route in routesList" :key="route.name" :index="route.name" @click="goTo(route.path)">{{route.meta.title}}</el-menu-item>
  </el-menu>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { constantRoute } from '@/router/routes'

let $router = useRouter()
let routesList = ref(constantRoute[0].chirdren)

const goTo = (path) => {
  console.log(path)
  $router.push(path)
}
</script>

<style scoped>
.el-menu {
  height: 40px;
  overflow: visible;
}
</style>