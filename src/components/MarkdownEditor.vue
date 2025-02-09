<script setup lang="ts">
import { Editor, Viewer } from "@bytemd/vue-next";
import "highlight.js/styles/vs.css";
import "juejin-markdown-themes/dist/juejin.min.css";
import zhHans from "bytemd/lib/locales/zh_Hans.json";
import bytemdPlugins from "@/utils/bytemdPlugins";
import { defineProps, ref } from "vue";
import axios from "axios";

// 定义接收的 props
const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  mode: {
    type: String,
    default: "split",
  },
  handleChange: {
    type: Function,
    required: true,
  },
});

const uploadImage = async (files: FileList) => {
  const {
    data: { url },
  } = await goImg(files[0]);
  return [
    {
      title: Array.from(files).map((i) => i.name),
      url,
    },
  ];
};

const goImg = async (file: File) => {
  const data = new FormData();
  data.append("file", file);
  const result = await axios.post("url", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return result.data;
};

const value = ref(props.value);
const mode = ref(props.mode);
const handlerEditorChange = (v: any) => {
  value.value = v;
  if (props.handleChange) {
    props.handleChange(v);
  }
};
</script>

<template>
  <div id="markdown-editor">
    <Editor
      :value="value"
      :mode="mode"
      :plugins="bytemdPlugins"
      :locale="zhHans"
      :uploadImages="uploadImage"
      @change="handlerEditorChange"
    />
  </div>
</template>

<style scoped>
#markdown-editor {
  width: 100%;
  height: 100%;
}

:deep(.bytemd-fullscreen) {
  z-index: 999;
}
</style>
