<template>
  <div class="welcome-container">
    <h1 class="welcome-title">欢迎来到 MiCode</h1>
    <p class="welcome-description">
      一个高效、简单的在线判题平台，帮助你快速提高编程能力！
    </p>
    <el-button type="primary" size="large" @click="navigateToQuestionBank"
      >开始做题
    </el-button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const navigateToQuestionBank = () => {
  router.push({ name: "题库" });
};
</script>

<style scoped>
.welcome-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 85vh;
  text-align: center;
  position: relative;
  z-index: 1;
}

.welcome-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  margin-top: 0;
}

.welcome-description {
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
}

:deep(.el-button) {
  font-size: 18px;
  padding: 12px 24px;
  transition: background-color 0.3s, transform 0.3s;
}

:deep(.el-button:hover) {
  background-color: #409eff;
  transform: translateY(-3px);
}

/* 添加背景图片 */
.welcome-container::before,
.welcome-container::after {
  content: "";
  position: absolute;
  top: 15%;
  width: 40%;
  height: 70%;
  opacity: 0.2;
  background-size: 60% auto;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
}

.welcome-container::before {
  left: 0;
  background-image: url("@/assets/left-bg.png");
}

.welcome-container::after {
  right: 0;
  background-image: url("@/assets/right-bg.png");
}
</style>
