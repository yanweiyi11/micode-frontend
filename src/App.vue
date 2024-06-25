<template>
  <BaseLayout />
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>

<script setup lang="ts">
import BaseLayout from "@/layouts/BaseLayout.vue";
import checkAccess from "@/utils/checkAccess";
import useUserStore from "@/stores/user";
import { UserVO } from "../openapi";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const userStore = useUserStore();
const router = useRouter();
router.beforeEach((to, from, next) => {
  const access = to.meta.access;
  if (!checkAccess(userStore.user as UserVO, access as string)) {
    ElMessage.info("无权限访问");
    return;
  }
  next();
});
</script>
