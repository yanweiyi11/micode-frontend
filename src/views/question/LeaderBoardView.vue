<template>
  <div class="leader-board-view">
    <LeaderBoard class="leader-board" />
  </div>
</template>

<script setup lang="ts">
import LeaderBoard from "@/components/LeaderBoard.vue";
</script>

<style scoped>
.leader-board-view {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.page-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: bold;
  color: #303133;
}

.leader-board {
  width: 100%;
}
</style>
