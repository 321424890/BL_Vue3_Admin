<script setup lang="ts">
import { VxIcon } from "@/components/VxIcon"
import { ref, Ref } from "vue"

const url = new URL("@/assets/imgs/Avatar.png", import.meta.url).href

const weathers = [
  {
    src: "meteocons:clear-day-fill",
    tips: "今天天气晴朗，18℃ - 22℃，适合外出~"
  },
  {
    src: "meteocons:drizzle-fill",
    tips: "今天天气有小雨，12℃ - 16℃，外出记得带伞，做好保暖~"
  },
  {
    src: "meteocons:thunderstorms-extreme-fill",
    tips: "今天天气雷阵雨，10℃ - 14℃，外出请注意安全，尽量不要外出~"
  }
]
const randomIndex = Math.floor(Math.random() * weathers.length)
const weather = ref({}) as unknown as Ref<{
  src: string
  tips: string
}>
weather.value = weathers[randomIndex]

const activities: {
  content: string
  timestamp: string
  type?: "success" | "danger" | "primary" | "warning" | "info"
}[] = [
  {
    content: "hytql8 pushed to hytql8/VxAdmin",
    timestamp: "2024-03-17",
    type: "success"
  },
  {
    content: "hytql8 closed pull request Dev in hytql8/VxAdmin",
    timestamp: "2024-03-15",
    type: "danger"
  },
  {
    content: "zhangsan pushed to hytql8/VxAdmin",
    timestamp: "2024-03-05",
    type: "primary"
  },
  {
    content: "zhangsan pull request Dev in hytql8/VxAdmin",
    timestamp: "2024-03-05"
  },
  {
    content: "hytql8 pull request Dev in hytql8/VxAdmin",
    timestamp: "2024-03-05"
  },
  {
    content: "hytql8 pull request Dev in hytql8/VxAdmin",
    timestamp: "2024-03-05"
  },
  {
    content: "hytql8 pull request Dev in hytql8/VxAdmin",
    timestamp: "2024-03-05"
  },
  {
    content: "hytql8 pull request Dev in hytql8/VxAdmin",
    timestamp: "2024-03-05"
  }
]

const member: {
  id: number | string
  avatar?: string
  username?: string
  sex?: number | string
  status?: number | string
  time?: string
}[] = [
  {
    id: 7,
    avatar: new URL("@/assets/imgs/Avatar.png", import.meta.url).href,
    username: "hytql8",
    sex: 1,
    status: 1,
    time: "2023-10-01"
  },
  {
    id: 8,
    avatar: new URL("@/assets/imgs/avatar2.png", import.meta.url).href,
    username: "花子丶",
    sex: 1,
    status: 2,
    time: "2023-11-01"
  },
  {
    id: 9,
    avatar: new URL("@/assets/imgs/avatar1.png", import.meta.url).href,
    username: "小埋",
    sex: 0,
    status: 1,
    time: "2023-11-01"
  },
  {
    id: 10,
    avatar: new URL("@/assets/imgs/avatar3.png", import.meta.url).href,
    username: "veliot",
    sex: 0,
    status: 0,
    time: "2023-12-07"
  },
  {
    id: 11,
    avatar: new URL("@/assets/imgs/avatar4.png", import.meta.url).href,
    username: "zhangsan",
    sex: 1,
    status: 0,
    time: "2023-12-31"
  },
  {
    id: 12,
    avatar: new URL("@/assets/imgs/avatar5.png", import.meta.url).href,
    username: "wangmazi",
    sex: 2,
    status: 1,
    time: "2024-01-01"
  }
]
</script>
<template>
  <div id="printArea" class="flex-column-page-wrap pageWrap">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">系统首页</h1>
        <p class="page-description">欢迎回来，系统管理员！</p>
      </div>
    </div>

    <!-- 用户信息和天气 -->
    <!-- <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>个人信息</h4>
          <div class="workplace-header">
            <div class="header-left">
              <el-avatar class="header-left__avatar" :size="50" :src="url"></el-avatar>
              <div class="header-left__tips">
                <div class="tips-greeting">早安, 系统管理员, 开始您一天的工作吧!</div>
                <div class="tips-weather">
                  <VxIcon :icon="weather.src" :size="20" /><span>{{ weather.tips }}</span>
                </div>
              </div>
            </div>
            <div class="header-right">
              <el-statistic class="static" :value="20">
                <template #title>
                  <div class="static-title"><VxIcon icon="octicon:project-symlink-24" :size="14" /><span>项目数</span></div>
                </template></el-statistic
              >
              <el-statistic class="static" :value="6">
                <template #title>
                  <div class="static-title"><VxIcon icon="map:travel-agency" :size="14" /><span>代办项</span></div>
                </template></el-statistic
              >
              <el-statistic class="static" :value="18">
                <template #title>
                  <div class="static-title"><VxIcon icon="eva:message-circle-outline" :size="14" /><span>消息</span></div>
                </template></el-statistic
              >
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    -->
  </div>
</template>

<style scoped>
.pageWrap {
  padding: 20px;
}

/* 页面头部样式 */
.page-header {
  padding: 20px 0;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 20px;
}

.page-title {
  color: #303133;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
}

.page-description {
  color: #606266;
  font-size: 14px;
  margin: 0;
}

/* 示例组样式 */
.input-group {
  margin-bottom: 20px;
  padding: 16px;
  background-color: white;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.input-group h4 {
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}

/* 头部信息样式 */
.workplace-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-left__avatar {
  border: 2px solid #e6f7ff;
}

.header-left__tips {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tips-greeting {
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}

.tips-weather {
  font-size: 14px;
  color: #606266;
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-right {
  display: flex;
  gap: 30px;
}

.static {
  text-align: center;
}

.static-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 14px;
  color: #606266;
}

/* 功能模块样式 */
.workplace-module {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.module-card {
  flex: 1;
  min-width: 150px;
  padding: 20px;
  background-color: white;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.module-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-color: #e6f7ff;
  transform: translateY(-2px);
}

.module-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.module-box span {
  font-size: 14px;
  color: #303133;
  font-weight: 500;
}

/* 滚动容器样式 */
.scroll-container {
  padding: 8px 0;
}

/* 成员列表样式 */
.member-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.member-list:last-child {
  border-bottom: none;
}

.member-list__left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-message {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.username {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
}

.user-message__detail {
  font-size: 12px;
  color: #909399;
  display: flex;
  align-items: center;
  gap: 8px;
}

.time {
  font-size: 12px;
  color: #909399;
}

/* 响应式样式 */
@media (max-width: 768px) {
  .workplace-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-right {
    width: 100%;
    justify-content: space-around;
  }

  .workplace-module {
    justify-content: center;
  }

  .module-card {
    flex: 1 1 120px;
  }
}
</style>
