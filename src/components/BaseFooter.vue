<script setup lang="ts">
import { Box, ElementPlus, Link } from "@element-plus/icons-vue";
</script>

<template>
  <div id="base-footer">
    <el-text type="info" size="default">
      <el-icon>
        <Box />
      </el-icon>
      SpringBoot + Vue 3
      <el-divider direction="vertical" />
      <el-icon>
        <ElementPlus />
      </el-icon>
      <!--OJ 判题系统 + 聚合搜索平台 + 伙伴匹配系统-->
      OJ 判题系统
      <el-divider direction="vertical" />
      <el-icon>
        <Link />
      </el-icon>
      github/yanweiyi11
    </el-text>
  </div>
</template>

<style scoped>
#base-footer {
  height: var(--el-footer-height);
  line-height: var(--el-footer-height);
  text-align: center;
}
</style>
