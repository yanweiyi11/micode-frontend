<script setup lang="ts">
import { ref } from "vue";
import { UserAddRequest, UserControllerService } from "../../../openapi";
import { genderList, userRoleList } from "@/utils/constants";
import router from "@/router";
import { ElMessage } from "element-plus";

const form = ref<UserAddRequest>({});

// 提交和取消操作
const doCancel = () => {
  router.push({ path: "/admin/user-manage" });
};
const doSubmit = async () => {
  await UserControllerService.addUserUsingPost({
    ...form.value,
  });
  ElMessage.success("添加成功");
  await router.push({ path: "/admin/question-manage" });
};
</script>

<template>
  <el-card style="width: 30vw; margin: auto">
    <template #header>
      <el-text size="large">添加用户</el-text>
    </template>
    <el-form :model="form" label-width="auto">
      <el-form-item label="用户名">
        <el-input v-model="form.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          type="password"
        />
      </el-form-item>
      <el-form-item
        label="邮箱"
        :rules="[
          {
            type: 'email',
            message: '请输入正确的电子邮件地址',
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.gender">
          <el-radio
            :value="index"
            size="default"
            v-for="(item, index) in genderList"
            :key="index"
          >
            {{ item }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="个人介绍">
        <el-input
          v-model="form.userProfile"
          style="width: 240px"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          placeholder="请输入个人介绍"
        />
      </el-form-item>
      <el-form-item label="用户角色">
        <el-select
          v-model="form.userRole"
          placeholder="请选择用户角色"
          style="width: 240px"
        >
          <el-option
            v-for="item in userRoleList"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-button @click.prevent="doCancel" type="danger"> 取消</el-button>
      <el-button @click.prevent="doSubmit" type="primary"> 确定</el-button>
    </el-form>
  </el-card>
</template>

<style scoped></style>
