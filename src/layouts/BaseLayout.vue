<script setup lang="ts">
import BaseHeader from "@/components/BaseHeader.vue";
import BaseFooter from "@/components/BaseFooter.vue";
</script>

<template>
  <el-container>
    <el-header>
      <BaseHeader />
    </el-header>
    <el-main>
      <router-view />
    </el-main>
    <el-footer>
      <BaseFooter />
    </el-footer>
  </el-container>
</template>

<style scoped>
:deep(.el-header) {
  padding: 0;
}

:deep(.el-footer) {
  padding: 0;
}

:deep(.el-main) {
  min-height: 89vh;
  background-color: #f8f9fa;
}
</style>
