<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import router from "@/router";
import {
  QuestionControllerService,
  QuestionQueryRequest,
  QuestionVO,
} from "../../../openapi";
import {
  diffList,
  formatDate,
  getSubmissionRatioText,
} from "@/utils/constants";
import QuestionTagsOption from "@/components/QuestionTagsOption.vue";

// 定义查询模型
const searchModel = ref<QuestionQueryRequest>({
  size: 15,
});

// 定义数据存储
const total = ref<number>(0);
const tableData = ref<Array<QuestionVO>>([]);

// 页面加载时获取数据
onMounted(() => {
  loadFormData();
});

// 加载数据的函数
const loadFormData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost({
    ...searchModel.value,
    status: Number(searchModel.value.status),
  });
  tableData.value = res.data?.records;
  total.value = Number(res.data?.total);
};

const doSearch = () => {
  searchModel.value.page = 1; // 重置为第一页
  loadFormData();
};

const jumpSolve = (id: number) => {
  router.push({ path: `/question/solve/${id}` });
};

const handleUpdate = (id: number) => {
  router.push({ path: `/question/update/${id}` });
};

const handleAdd = () => {
  router.push({ path: "/question/add" });
};

// 删除操作相关
const delDialogVisible = ref(false);
const deleteQuestionId = ref<number | undefined>();

const handleDelete = (id: number) => {
  deleteQuestionId.value = id;
  delDialogVisible.value = true;
};

const doDelete = async () => {
  await QuestionControllerService.deleteQuestionUsingPost({
    id: deleteQuestionId.value,
  });
  ElMessage.success("删除成功");
  delDialogVisible.value = false;
  await loadFormData(); // 重新加载数据
};
</script>

<template>
  <el-card style="min-width: 60vh">
    <template #header>
      <div class="card-header">
        <el-select
          v-model="searchModel.tags"
          multiple
          filterable
          placeholder="标签"
          style="width: 240px"
          class="search-criteria"
        >
          <QuestionTagsOption />
        </el-select>
        <el-select
          v-model="searchModel.difficulty"
          placeholder="难度"
          style="width: 240px"
          clearable
          class="search-criteria"
        >
          <el-option
            v-for="value in diffList"
            :key="value"
            :label="value"
            :value="value"
          />
        </el-select>
        <el-input
          v-model="searchModel.searchKey"
          style="width: 240px"
          placeholder="题目 / 内容 / 编号"
          class="search-criteria"
        />
        <el-button type="primary" @click="doSearch">查询</el-button>
        <el-button type="success" @click="handleAdd">新增</el-button>
      </div>
    </template>
    <el-table :data="tableData" stripe table-layout="auto">
      <el-table-column prop="id" label="编号" />
      <el-table-column prop="title" label="题目">
        <template #default="scope">
          <el-link @click="jumpSolve(scope.row.id)">
            {{ scope.row.title }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="tags" label="标签">
        <template #default="scope">
          <template v-for="(tag, index) of scope.row.tags" :key="index">
            <el-tag
              type="success"
              disable-transitions
              :style="{ marginLeft: index !== 0 ? '8px' : '0' }"
            >
              {{ tag }}
            </el-tag>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="通过率">
        <template #default="scope">
          {{ getSubmissionRatioText(scope.row) }}
        </template>
      </el-table-column>
      <el-table-column label="难度">
        <template #default="scope">
          <el-tag type="info" v-if="scope.row?.difficulty">
            {{ scope.row?.difficulty }}
          </el-tag>
        </template>
      </el-table-column>
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
</style>
