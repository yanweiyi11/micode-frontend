<script setup lang="ts">
import { QuestionControllerService, TagsVO } from "../../openapi";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

const tagsVOList = ref<TagsVO[]>();
// 加载标签数据
const loadTags = async () => {
  const res = await QuestionControllerService.getTagsUsingGet();
  tagsVOList.value = res.data as TagsVO[];
};
onMounted(() => {
  loadTags();
});
</script>

<template>
  <el-option-group
    v-for="(tagsVO, index) in tagsVOList"
    :key="index"
    :label="tagsVO.parentName"
  >
    <el-option
      v-for="childName in tagsVO.childNameList"
      :key="childName"
      :label="childName"
      :value="childName"
    />
  </el-option-group>
</template>

<style scoped></style>
