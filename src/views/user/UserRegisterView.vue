<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserRegisterRequest } from "../../../openapi";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const formLabelAlign = reactive<UserRegisterRequest>({});

const router = useRouter();
const submitForm = async () => {
  const res = await UserControllerService.userRegisterUsingPost(formLabelAlign);
  if (res.code === 0) {
    ElMessage.success("注册成功");
    setTimeout(() => {
      router.push({ path: "/user/login" });
    }, 500);
  } else {
    ElMessage.error(`注册失败，${res.message}`);
  }
};
const resetForm = () => {
  formLabelAlign.username = "";
  formLabelAlign.password = "";
  formLabelAlign.checkPassword = "";
};
</script>

<template>
  <el-card class="register-container" style="max-width: 480px" shadow="hover">
    <template #header>
      <div>
        <span>用户注册</span>
      </div>
    </template>
    <el-form
      label-position="top"
      label-width="auto"
      :model="formLabelAlign"
      class="register-form"
    >
      <el-form-item label="用户名">
        <el-input v-model="formLabelAlign.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="formLabelAlign.password" />
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input type="password" v-model="formLabelAlign.checkPassword" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">登录</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-link @click="router.push({ path: '/user/login' })" type="primary">
        已有帐号？立即登录
      </el-link>
    </template>
  </el-card>
</template>

<style scoped>
.register-container {
  margin: 20vh auto 0;
}

.register-form {
  max-width: 300px;
  margin: auto;
}
</style>
