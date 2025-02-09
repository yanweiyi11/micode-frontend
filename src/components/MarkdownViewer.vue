<script setup lang="ts">
import { Viewer } from "@bytemd/vue-next";
import "highlight.js/styles/vs.css";
import "juejin-markdown-themes/dist/juejin.min.css";
import zhHans from "bytemd/lib/locales/zh_Hans.json";
import bytemdPlugins from "@/utils/bytemdPlugins";
import { defineProps } from "vue";

// 定义接收的 props
const props = defineProps({
  value: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <Viewer :value="props.value" :plugins="bytemdPlugins" :locale="zhHans" />
</template>

<style scoped>
:deep(.bytemd-fullscreen) {
  z-index: 999;
}
</style>
