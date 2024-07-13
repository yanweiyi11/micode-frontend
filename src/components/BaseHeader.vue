<script setup lang="ts">
import { computed, ref } from "vue";
import checkAccess from "@/utils/checkAccess";
import { UserVO } from "../../openapi";
import useUserStore from "@/stores/user";
import { routes } from "@/router/routes";
import router from "@/router";

const activeIndex = ref<string>("/");
const userStore = useUserStore();

const filterRoutes = computed(() => {
  return routes.filter((route) => {
    return (
      route.meta?.isShow &&
      checkAccess(userStore.user as UserVO, route.meta?.access as string)
    );
  });
});

const userLogout = () => {
  userStore.logout();
};

router.beforeEach((to, from, next) => {
  activeIndex.value = to.path;
  next();
});
</script>

<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    :router="true"
    :ellipsis="false"
  >
    <el-menu-item> MiOJ</el-menu-item>
    <template v-for="(item, index) in filterRoutes" :key="index">
      <!-- 检查是否有子路由 -->
      <el-sub-menu
        v-if="item.children && item.children.length > 0"
        :index="item.path"
      >
        <template #title>{{ item.name }}</template>
        <!-- 渲染子路由 -->
        <el-menu-item
          v-for="(child, childIndex) in item.children"
          :key="`child-${childIndex}`"
          :index="child.path"
          :route="child"
        >
          {{ child.name }}
        </el-menu-item>
      </el-sub-menu>

      <!-- 如果没有子路由，直接渲染菜单项 -->
      <el-menu-item v-else :index="item.path" :route="item">
        {{ item.name }}
      </el-menu-item>
    </template>
    <div class="flex-grow" />

    <el-menu-item v-if="userStore.user">
      <el-sub-menu index="user">
        <template #title>{{ userStore.user?.username }}</template>
        <el-menu-item :index="'/user/update/' + userStore.user.id">
          账户设置
        </el-menu-item>
        <el-menu-item index="logout" @click="userLogout">登出</el-menu-item>
      </el-sub-menu>
    </el-menu-item>
    <el-menu-item v-else @click="router.push({ path: '/user/login' })">
      登录
    </el-menu-item>
  </el-menu>
</template>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

.el-header {
  padding-left: 0;
  padding-right: 0;
}
</style>
