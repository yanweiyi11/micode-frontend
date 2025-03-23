<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import { ElMessage } from "element-plus";
import {
  JudgeCase,
  QuestionControllerService,
  QuestionUpdateRequest,
} from "../../../openapi";
import MarkdownEditor from "@/components/MarkdownEditor.vue";
import { diffList } from "@/utils/constants";
import QuestionTagsOption from "@/components/QuestionTagsOption.vue";

// 定义响应式数据
const form = ref<QuestionUpdateRequest>({});
const judgeCaseForm = reactive<{ caseList: Array<JudgeCase> }>({
  caseList: [{ input: "", output: "" }],
});

// 使用路由获取题目ID
const route = useRoute();
const questionId = route.params.id as unknown as number; // 题目ID

// 加载题目数据
const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    questionId
  );
  form.value = res.data as QuestionUpdateRequest;
  judgeCaseForm.caseList = res.data?.judgeCase ?? [];
};
onMounted(() => {
  loadData();
});

// 操作用例的方法
const removeCase = (item: JudgeCase) => {
  const index = judgeCaseForm.caseList.indexOf(item);
  if (index !== -1) {
    judgeCaseForm.caseList.splice(index, 1);
  }
};
const addCase = () => {
  judgeCaseForm.caseList.push({ input: "", output: "" });
};

// 提交和取消操作
const doCancel = () => {
  router.push({ path: "/admin/question-manage" });
};
const doSubmit = async () => {
  await QuestionControllerService.updateQuestionUsingPost({
    ...form.value,
    judgeCase: judgeCaseForm.caseList,
    judgeConfig: { timeLimit: timeLimit.value, memoryLimit: memoryLimit.value },
  });
  ElMessage.success("更新成功");
  await router.push({ path: "/admin/question-manage" });
};

// 计算属性：memoryLimit 和 timeLimit
const memoryLimit = computed({
  get: () => form.value.judgeConfig?.memoryLimit ?? 102400,
  set: (value) => {
    if (form.value.judgeConfig) {
      form.value.judgeConfig.memoryLimit = value;
    } else {
      form.value.judgeConfig = { memoryLimit: value, timeLimit: 5000 };
    }
  },
});
const timeLimit = computed({
  get: () => form.value.judgeConfig?.timeLimit ?? 5000,
  set: (value) => {
    if (form.value.judgeConfig) {
      form.value.judgeConfig.timeLimit = value;
    } else {
      form.value.judgeConfig = {
        memoryLimit: 102400,
        timeLimit: value,
      };
    }
  },
});
</script>

<template>
  <el-card style="width: 62vw; margin: auto">
    <template #header>
      <el-text size="large">修改题目</el-text>
    </template>
    <el-form :model="form" label-width="auto">
      <el-form-item
        label="标题"
        :rules="[
          {
            required: true,
            message: '请输入标题',
            trigger: 'blur',
          },
        ]"
      >
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="内容">
        <MarkdownEditor :handle-change="(v) => (form.content = v)" />
      </el-form-item>
      <el-form-item label="标签">
        <el-select
          v-model="form.tags"
          multiple
          filterable
          placeholder="请选择标签"
        >
          <QuestionTagsOption />
        </el-select>
      </el-form-item>
      <el-form-item label="难度">
        <el-select v-model="form.difficulty" clearable placeholder="请选择难度">
          <el-option
            v-for="value in diffList"
            :key="value"
            :label="value"
            :value="value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="答案">
        <MarkdownEditor :handle-change="(v) => (form.answer = v)" />
      </el-form-item>
      <el-form-item
        label="判题用例"
        :rules="[
          {
            required: true,
            message: '至少要有一个判题用例',
            trigger: 'blur',
          },
        ]"
      >
        <el-form-item
          v-for="(item, index) in judgeCaseForm.caseList"
          :key="index"
          :label="`用例 ${index + 1}`"
        >
          <el-input
            class="case"
            v-model="item.input"
            placeholder="请填写输入用例..."
            type="textarea"
            size="small"
          />
          <el-input
            class="case"
            v-model="item.output"
            placeholder="请填写输出用例..."
            type="textarea"
            size="small"
          />
          <el-button
            @click.prevent="removeCase(item)"
            type="danger"
            size="small"
            plain
          >
            删除
          </el-button>
          <el-divider
            v-if="
              judgeCaseForm.caseList.length != 1 &&
              judgeCaseForm.caseList.length - 1 != index
            "
            :style="{ marginTop: '12px', marginBottom: '12px' }"
          />
        </el-form-item>
        <el-divider />
        <el-button @click="addCase" type="primary" size="small" plain>
          新增用例
        </el-button>
      </el-form-item>
      <el-form-item label="判题配置">
        <el-popover placement="right-start" title="示例" trigger="hover">
          <template #default>
            <div>5秒：5000ms</div>
            <div>30秒：30000ms</div>
            <div>1分钟：60000ms</div>
          </template>
          <template #reference>
            <el-text type="info">时间限制（ms）</el-text>
          </template>
        </el-popover>
        <el-input
          class="case"
          v-model="timeLimit"
          placeholder="请填写时间限制..."
        />
        <el-popover placement="right-start" title="示例" trigger="hover">
          <template #default>
            <div>50mb：51200kb</div>
            <div>100mb：102400kb</div>
            <div>200mb：204800kb</div>
          </template>
          <template #reference>
            <el-text type="info">空间限制（kb）</el-text>
          </template>
        </el-popover>
        <el-input
          class="case"
          v-model="memoryLimit"
          placeholder="请填写空间限制..."
        />
      </el-form-item>
      <el-button @click.prevent="doCancel" type="danger"> 取消</el-button>
      <el-button @click.prevent="doSubmit" type="primary"> 确定</el-button>
    </el-form>
  </el-card>
</template>

<style scoped>
.case {
  margin-bottom: 10px;
}
</style>
