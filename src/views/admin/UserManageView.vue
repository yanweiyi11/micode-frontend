<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import router from "@/router";
import {
  UserControllerService,
  UserQueryRequest,
  UserVO,
} from "../../../openapi";
import { formatDate, genderList } from "@/utils/constants";

// 定义查询模型
const searchModel = ref<UserQueryRequest>({
  size: 15,
});

// 定义数据存储
const total = ref<number>(0);
const tableData = ref<Array<UserVO>>([]);

// 页面加载时获取数据
onMounted(() => {
  loadFormData();
});

// 加载数据的函数
const loadFormData = async () => {
  const res = await UserControllerService.listUserVoByPageUsingPost({
    ...searchModel.value,
  });
  if (res?.code === 0) {
    tableData.value = res.data?.records;
    total.value = Number(res.data?.total);
  } else {
    ElMessage.warning(`加载数据失败，${res.message}`);
  }
};

const doSearch = () => {
  searchModel.value.page = 1; // 重置为第一页
  loadFormData();
};

const handleUpdate = (id: number) => {
  router.push({ path: `/user/update/${id}` });
};

const handleAdd = () => {
  router.push({ path: "/user/add" });
};

// 删除操作相关
const delDialogVisible = ref(false);
const deleteUserId = ref<number | undefined>();

const handleDelete = (id: number) => {
  deleteUserId.value = id;
  delDialogVisible.value = true;
};

const doDelete = async () => {
  const res = await UserControllerService.deleteUserUsingPost({
    id: deleteUserId.value,
  });
  if (res.code === 0) {
    ElMessage.success("删除成功");
    delDialogVisible.value = false;
    await loadFormData(); // 重新加载数据
  } else {
    ElMessage.error(`删除失败，${res.message}`);
  }
};
</script>

<template>
  <el-card style="min-width: 60vh">
    <template #header>
      <div class="card-header">
        <el-select
          v-model="searchModel.gender"
          placeholder="性别"
          style="width: 240px"
          clearable
          class="search-criteria"
        >
          <el-option
            v-for="(item, index) in genderList"
            :key="index"
            :label="item"
            :value="index"
          />
        </el-select>
        <el-input
          v-model="searchModel.searchKey"
          style="width: 240px"
          placeholder="用户名 / 编号 / 个人介绍"
          class="search-criteria"
        />
        <el-button type="primary" @click="doSearch">查询</el-button>
        <el-button type="success" @click="handleAdd">新增</el-button>
      </div>
    </template>
    <el-table :data="tableData" stripe table-layout="auto">
      <el-table-column prop="id" label="编号" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column label="性别">
        <template #default="scope">
          {{ genderList[scope.row.gender] }}
        </template>
      </el-table-column>
      <el-table-column label="个人介绍" :width="310">
        <template #default="scope">
          <el-popover
            placement="top-start"
            :title="scope.row.username + ' 的个人介绍'"
            :width="210"
            trigger="hover"
            :content="scope.row?.userProfile"
          >
            <template #reference>
              <el-text size="small" class="user-profile-text">
                {{ scope.row?.userProfile }}
              </el-text>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="userRole" label="角色" />
      <el-table-column label="创建时间">
        <template #default="scope">
          {{ formatDate(scope.row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleUpdate(scope.row.id)">
            更新
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="searchModel.size"
        v-model:current-page="searchModel.page"
        @change="loadFormData"
      />
    </template>
  </el-card>
  <el-dialog v-model="delDialogVisible" title="确认删除" width="500">
    <span>确定要删除这条记录吗？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="delDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="doDelete">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.search-criteria {
  margin-right: 20px;
}

.user-profile-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>
