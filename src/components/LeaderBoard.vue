<template>
  <div class="leaderboard-container">
    <h2 class="leaderboard-title">排行榜</h2>
    <el-table :data="rankings" style="width: 100%" v-if="rankings.length">
      <!-- 排名列，只显示数字 -->
      <el-table-column prop="rank" label="排名" width="80" align="center">
        <template #default="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <!-- 用户名列，头像在用户名左侧 -->
      <el-table-column prop="username" label="用户" min-width="150">
        <template #default="scope">
          <div class="user-info">
            <el-avatar
              :src="scope.row.avatarUrl"
              :alt="`Avatar of ${scope.row.username}`"
              size="small"
              class="user-avatar"
            />
            <span class="user-name">{{ scope.row.username }}</span>
          </div>
        </template>
      </el-table-column>

      <!-- 通过率列 -->
      <el-table-column prop="acceptanceRate" label="通过率" width="150">
        <template #default="scope">
          <el-progress
            :percentage="scope.row.acceptanceRate"
            stroke-width="12"
            :text-inside="true"
            :show-text="true"
          />
        </template>
      </el-table-column>
    </el-table>
    <div v-else class="no-data">暂无数据</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { QuestionSubmitControllerService } from "../../openapi";

const rankings = ref([]);

// 在组件挂载时获取排行榜数据
onMounted(async () => {
  const res =
    await QuestionSubmitControllerService.getTopRankedUsersUsingPost();
  rankings.value = res.data.map((user, index) => ({
    ...user,
    rank: index + 1,
    acceptanceRate: Math.round(
      (user.acceptedSubmissions / user.totalSubmissions) * 100
    ), // 将通过率转换为整数百分比
  }));
});
</script>

<style scoped>
.leaderboard-container {
  padding: 6px 20px 20px 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.leaderboard-title {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-avatar {
  margin-right: 10px;
}

.user-name {
  cursor: pointer;
  color: #409eff;
  transition: color 0.3s;
}

.user-name:hover {
  color: #66b1ff;
}

.no-data {
  text-align: center;
  color: #999;
  margin-top: 20px;
}
</style>
