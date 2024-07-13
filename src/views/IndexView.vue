<script setup lang="ts">
import { useRouter } from "vue-router";

// 获取路由实例和当前路由信息
const router = useRouter();

// 在组件创建时自动跳转到题库页面
router.push({ name: "题库" });
</script>

<template>
  <template></template>
</template>

<style scoped></style>
