<script setup lang="ts">
import { reactive } from "vue";
import { UserLoginRequest } from "../../../openapi";
import useUserStore from "@/stores/user";
import router from "@/router";

const formLabelAlign = reactive<UserLoginRequest>({});

const userStore = useUserStore();
const submitForm = () => {
  userStore.login(formLabelAlign);
};
const resetForm = () => {
  formLabelAlign.username = "";
  formLabelAlign.password = "";
};
</script>

<template>
  <el-card class="login-container" style="max-width: 480px" shadow="hover">
    <template #header>
      <div>
        <span>用户登录</span>
      </div>
    </template>
    <el-form
      label-position="top"
      label-width="auto"
      :model="formLabelAlign"
      class="login-form"
    >
      <el-form-item label="用户名">
        <el-input v-model="formLabelAlign.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="formLabelAlign.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">登录</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-link @click="router.push({ path: '/user/register' })" type="primary">
        立即注册
      </el-link>
    </template>
  </el-card>
</template>

<style scoped>
.login-container {
  margin: 20vh auto 0;
}

.login-form {
  max-width: 300px;
  margin: auto;
}
</style>
