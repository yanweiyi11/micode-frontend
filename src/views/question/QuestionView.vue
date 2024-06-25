<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import router from "@/router";
import {
  QuestionControllerService,
  QuestionDetailQueryRequest,
  QuestionDetailVO,
} from "../../../openapi";
import {
  diffList,
  getSubmissionRatioText,
  judgeInfoMessageEnum,
  statusList,
} from "@/utils/constants";
import QuestionTagsOption from "@/components/QuestionTagsOption.vue";

// 定义搜索参数的响应式引用
const searchModel = ref<QuestionDetailQueryRequest>({
  size: 15,
});

// 总条数和表格数据的响应式引用
const total = ref<number>(0);
const tableData = ref<Array<QuestionDetailVO>>([]);

// 加载数据函数
const loadFormData = async () => {
  const res =
    await QuestionControllerService.listQuestionDetailVoByPageUsingPost({
      ...searchModel.value,
      status: Number(searchModel.value.status),
    });
  if (res?.code === 0) {
    tableData.value = res.data?.records;
    total.value = Number(res.data?.total);
  } else {
    ElMessage.warning(`加载数据失败，${res.message}`);
  }
};

// 组件挂载后加载数据
onMounted(() => {
  loadFormData();
});

// 搜索功能：重置页码并加载数据
const doSearch = () => {
  searchModel.value = {
    ...searchModel.value,
    page: 1,
  };
  loadFormData();
};

// 跳转到答题的页面
const jumpSolve = (id: number) => {
  router.push({
    path: `/question/solve/${id}`,
  });
};
</script>

<template>
  <el-card style="min-width: 60vh">
    <template #header>
      <div class="card-header">
        <el-select
          v-model="searchModel.tags"
          multiple
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
        <el-select
          v-model="searchModel.status"
          placeholder="状态"
          style="width: 240px"
          clearable
          class="search-criteria"
        >
          <el-option
            v-for="(value, index) in statusList"
            :key="index"
            :label="value"
            :value="index"
          />
        </el-select>
        <el-select
          v-model="searchModel.judgeInfoResult"
          placeholder="判题结果"
          style="width: 240px"
          clearable
          class="search-criteria"
        >
          <el-option
            v-for="item in judgeInfoMessageEnum"
            :key="item.text"
            :label="item.text"
            :value="item.text"
          />
        </el-select>
        <el-input
          v-model="searchModel.searchKey"
          style="width: 240px"
          placeholder="题目 / 内容 / 编号"
          class="search-criteria"
        />
        <el-button type="primary" @click="doSearch">查询</el-button>
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
      <el-table-column label="执行结果">
        <template #default="scope">
          <el-tag type="primary" v-if="scope.row?.judgeInfo?.result">
            {{ scope.row?.judgeInfo?.result }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="判题状态">
        <template #default="scope">
          <el-tag type="warning" v-if="statusList[scope.row?.status]">
            {{ statusList[scope.row?.status] }}
          </el-tag>
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
</template>

<style scoped>
.search-criteria {
  margin-right: 20px;
}
</style>
