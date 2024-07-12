<template>
  <template v-for="(item, index) in menuList" :key="item.path">
    <el-menu-item :index="item.path" @click="goTo">
      <template #title>
        <span>{{ item.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { constantRoute } from '@/router/routes'

defineProps(['menuList'])
let $router = useRouter()
let routesList = ref(constantRoute[0].chirdren)

const goTo = (vc) => {
  $router.push(vc.index)
}
</script>