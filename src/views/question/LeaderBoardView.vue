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

.leader-board {
  width: 100%;
}
</style>
