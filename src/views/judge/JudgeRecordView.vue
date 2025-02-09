<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import router from "@/router";
import {
  QuestionSubmitControllerService,
  QuestionSubmitDetailQueryRequest,
  QuestionSubmitDetailVO,
} from "../../../openapi";
import {
  formatDate,
  judgeInfoMessageEnum,
  languageList,
  statusList,
} from "@/utils/constants";
import LeaderBoard from "@/components/LeaderBoard.vue";

// 搜索模型：用于搜索提交记录的查询参数
const searchModel = ref<QuestionSubmitDetailQueryRequest>({
  size: 15,
});

// 总记录数和表格数据
const total = ref<number>(0);
const tableData = ref<Array<QuestionSubmitDetailVO>>([]);

// 页面加载时获取数据
onMounted(() => {
  loadData();
});

// 加载数据：根据当前搜索模型获取提交记录
const loadData = async () => {
  const res =
    await QuestionSubmitControllerService.listQuestionSubmitDetailVoByPageUsingPost(
      searchModel.value
    );
  if (res?.code === 0) {
    tableData.value = res.data?.records;
    total.value = Number(res.data?.total);
  } else {
    // 加载失败时的消息提醒
    ElMessage.warning(`加载数据失败，${res.message}`);
  }
};

// 搜索功能：重置页码至1，并重新加载数据
const doSearch = () => {
  searchModel.value = { ...searchModel.value, page: 1 };
  loadData();
};

// 跳转到答题页面：根据提交记录ID跳转
const jumpSolve = (id: number) => {
  router.push({ path: `/question/solve/${id}` });
};
</script>

<template>
  <el-row :gutter="30">
    <el-col :span="18">
      <el-card style="min-width: 60vh">
        <template #header>
          <div class="card-header">
            <el-select
              v-model="searchModel.languageList"
              multiple
              placeholder="语言"
              style="width: 240px"
              class="search-criteria"
            >
              <el-option
                v-for="item in languageList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
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
                v-for="(value, key) in statusList"
                :key="key"
                :label="value"
                :value="key"
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
              placeholder="题目 / 题号 / 用户名"
              class="search-criteria"
            />
            <el-button type="primary" @click="doSearch">查询</el-button>
          </div>
        </template>
        <el-table :data="tableData" stripe table-layout="auto">
          <el-table-column label="题号">
            <template #default="scope">
              {{ scope.row.questionVO.id }}
            </template>
          </el-table-column>
          <el-table-column label="题目">
            <template #default="scope">
              <el-link @click="jumpSolve(scope.row.questionVO.id)">
                {{ scope.row.questionVO.title }}
              </el-link>
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
          <el-table-column label="用户">
            <template #default="scope">
              {{ scope.row.userVO.username }}
            </template>
          </el-table-column>
          <el-table-column label="执行时间（ms）">
            <template #default="scope">
              {{ scope.row.judgeInfo.timeUsed }}
            </template>
          </el-table-column>
          <el-table-column label="消耗内存（bt）">
            <template #default="scope">
              {{ scope.row.judgeInfo.memoryUsed }}
            </template>
          </el-table-column>
          <el-table-column prop="language" label="语言" />
          <el-table-column label="递交时间">
            <template #default="scope">
              {{ formatDate(scope.row.createTime) }}
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
            @change="loadData"
          />
        </template>
      </el-card>
    </el-col>
    <el-col :span="6">
      <LeaderBoard />
    </el-col>
  </el-row>
</template>

<style scoped>
.search-criteria {
  margin-right: 20px;
}
</style>
