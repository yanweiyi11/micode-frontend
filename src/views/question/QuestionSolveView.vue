<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import MarkdownViewer from "@/components/MarkdownViewer.vue";
import CodeEditor from "@/components/CodeEditor.vue";

import {
  QuestionControllerService,
  QuestionDetailVO,
  QuestionSubmitControllerService,
  QuestionSubmitDoJudgeRequest,
  QuestionSubmitVO,
} from "../../../openapi";
import { Check, Clock, Close, Loading } from "@element-plus/icons-vue";
import {
  defaultLanguage,
  formatDate,
  getSubmissionPercentage,
  languageList,
} from "@/utils/constants";

// 路由与题目数据
const route = useRoute();
const questionId = route.params.id as unknown as number; // 题目ID
const questionDetailVO = ref<QuestionDetailVO>({});

// 提交表单数据
const submitForm = ref<QuestionSubmitDoJudgeRequest>({
  questionId: questionId,
  language: defaultLanguage,
  code: "",
});

// 页面加载
onMounted(() => {
  fetchQuestion();
  fetchSubmissions();
});

// 获取题目数据
const fetchQuestion = async () => {
  const res = await QuestionControllerService.getQuestionDetailVoByIdUsingGet(
    questionId
  );
  questionDetailVO.value = res.data as QuestionDetailVO;
};

// 存储用户判题记录
const judgeRecord = ref<QuestionSubmitVO[]>();

// 控制标识，防止方法重复执行
let timeoutId: number | null = null; // 用于保存setTimeout的ID
let isFetching = false; // 控制循环是否正在执行的标志

// 获取提交数据并检查状态，直到全部成功或失败
const fetchSubmissions = async () => {
  // 如果已经有一个循环在执行，就直接返回
  if (isFetching) return;

  // 设置标志，表示开始执行循环
  isFetching = true;

  // 定义一个递归函数来处理状态检查和再次拉取数据
  const checkAndFetch = async () => {
    const res =
      await QuestionSubmitControllerService.listQuestionSubmitVoByQuestionIdUsingPost(
        questionId
      );
    if (res.code === 0) {
      judgeRecord.value = res.data as QuestionSubmitVO[];
      // 判断是否所有的提交状态都合格
      let allDone = judgeRecord.value.every(
        (submission) => submission.status === 2 || submission.status === 3
      );
      if (!allDone) {
        // 如果还有未完成的，设置延迟后再次检查
        timeoutId = setTimeout(checkAndFetch, 2000) as unknown as number;
      } else {
        // 如果全部完成，重置标志
        isFetching = false;
      }
    } else {
      // 如果请求失败，重置标志
      isFetching = false;
    }
  };

  // 开始执行检查
  await checkAndFetch();
};

// 组件销毁前清除定时器
onBeforeUnmount(() => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
});

// 事件处理
const activeTab = ref("code");
const activeCollapse = ref();

// 更新代码
const updateCode = (value: string) => {
  submitForm.value = {
    ...submitForm.value,
    code: value,
  };
};

// 控制按钮是否点击过快的状态变量
const isSpeed = ref(false);

// 提交代码
const submitCode = async () => {
  if (isSpeed.value) {
    ElMessage.warning("操作太频繁，请稍后再试");
    return;
  }

  await QuestionSubmitControllerService.doJudgeUsingPost(submitForm.value);
  ElMessage.success("提交成功");
  await fetchSubmissions();

  // 禁用按钮
  isSpeed.value = true;

  // 设置3秒后重新启用按钮
  setTimeout(() => {
    isSpeed.value = false;
  }, 3000);
};

// 状态切换
const switchStatus = (status: number) => {
  switch (status) {
    case 0:
      return "等待中";
    case 1:
      return "判题中";
    case 2:
      return "成功";
    case 3:
      return "失败";
    default:
      return "";
  }
};
</script>

<template>
  <el-row :gutter="30">
    <el-col :span="12">
      <el-card style="min-height: 70vh">
        <template #header>
          <el-row>
            <el-col :span="12">
              <el-text type="primary">
                {{ questionDetailVO.title }}
              </el-text>
            </el-col>
            <el-col :span="12">
              <div style="float: right">
                <el-tag
                  type="success"
                  v-for="(tag, index) of questionDetailVO.tags"
                  :key="index"
                  :style="{ marginLeft: index != 0 ? '10px' : '0' }"
                >
                  {{ tag }}
                </el-tag>
              </div>
            </el-col>
          </el-row>
        </template>
        <MarkdownViewer
          :value="questionDetailVO.content"
          style="min-height: 70vh"
        />
        <template #footer>
          <el-text>通过数 {{ questionDetailVO.acceptedNum }}</el-text>
          <el-divider direction="vertical" />
          <el-text>提交数 {{ questionDetailVO.submitNum }}</el-text>
          <el-divider direction="vertical" />
          <el-text>
            通过率 {{ getSubmissionPercentage(questionDetailVO) }}
          </el-text>
        </template>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card>
        <el-tabs v-model="activeTab" type="card">
          <el-tab-pane label="代码" name="code">
            <CodeEditor
              :language="submitForm.language"
              :value="submitForm.code as string"
              :handle-change="updateCode"
              style="min-height: 71vh"
              class="monaco-editor-container"
            />
          </el-tab-pane>
          <el-tab-pane label="判题" name="judge">
            <MarkdownViewer
              v-if="judgeRecord?.length === 0"
              value="你对于此题目还没有判题记录"
            />
            <el-collapse v-else v-model="activeCollapse" accordion>
              <el-collapse-item
                :name="item.id as number"
                v-for="(item, index) of judgeRecord"
                :key="index"
              >
                <template #title>
                  <el-text type="info" v-if="item.status === 0">
                    <el-icon>
                      <clock />
                    </el-icon>
                    {{ switchStatus(item.status) }} （{{
                      formatDate(item.createTime as Date)
                    }}）
                  </el-text>
                  <el-text type="warning" v-else-if="item.status === 1">
                    <el-icon>
                      <Loading />
                    </el-icon>
                    {{ switchStatus(item.status) }} （{{
                      formatDate(item.createTime as Date)
                    }}）
                  </el-text>
                  <el-text type="success" v-else-if="item.status === 2">
                    <el-icon>
                      <check />
                    </el-icon>
                    {{ switchStatus(item.status) }} （{{
                      formatDate(item.createTime as Date)
                    }}）
                  </el-text>
                  <el-text type="danger" v-else-if="item.status === 3">
                    <el-icon>
                      <close />
                    </el-icon>
                    {{ switchStatus(item.status) }}
                    （{{ formatDate(item.createTime as Date) }}）
                  </el-text>
                </template>
                <div>
                  <el-descriptions border>
                    <el-descriptions-item label="语言">
                      {{ item.language }}
                    </el-descriptions-item>
                    <el-descriptions-item label="执行用时（ms）">
                      {{ item.judgeInfo.timeUsed }}
                    </el-descriptions-item>
                    <el-descriptions-item label="消耗内存（kb）">
                      {{ item.judgeInfo.memoryUsed }}
                    </el-descriptions-item>
                    <el-descriptions-item label="结果">
                      {{ item.judgeInfo.result }}
                    </el-descriptions-item>
                    <el-descriptions-item
                      label="错误消息"
                      v-if="item.judgeInfo?.errorMessage"
                    >
                      {{ item.judgeInfo.errorMessage }}
                    </el-descriptions-item>
                  </el-descriptions>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane label="答案" name="answer">
            <MarkdownViewer
              :value="questionDetailVO.answer ?? '当前不允许查看答案'"
            />
          </el-tab-pane>
        </el-tabs>
        <template #footer v-if="activeTab == 'code'">
          <el-row>
            <el-col :span="12">
              编程语言：
              <el-select
                v-model="submitForm.language"
                placeholder="Select"
                style="width: 240px"
              >
                <el-option
                  v-for="item in languageList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                />
              </el-select>
            </el-col>
            <el-col :span="12">
              <el-button
                type="success"
                style="float: right"
                @click="submitCode"
              >
                提交代码
              </el-button>
            </el-col>
          </el-row>
        </template>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>
.monaco-editor-container {
  border: 1px solid #edebe9; /* 示例边框样式 */
}
</style>
