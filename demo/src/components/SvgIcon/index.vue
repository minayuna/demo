<template>
  <svg :style="{ width, height }">
    <use :xlink:href="prefix + name" fill="red"></use>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  prefix: {
    type: String,
    default: '#icon-'
  },
  name: String,
  color: String,
  width: {
    type: String,
    default: '16px'
  },
  height: {
    type: String,
    default: '16px'
  }
})
</script>

<style scoped></style>