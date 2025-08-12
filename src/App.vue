<script setup lang="ts">
import { ref } from 'vue'
import AlarmRobot from '../lib/index.ts'
const inputVal = ref()
const token = ref()
function setToken() {
  token.value = inputVal.value
  location.reload()
}
</script>

<template>
  <div class="app">
    <div class="oper">
      <el-input v-model="inputVal" placeholder="请输入token..." />
      <el-button type="primary" @click="setToken">重置token</el-button>
    </div>
    <AlarmRobot :tokenId="token" :userInfo="{ userId: '0000000000000000000000000001' }" />
  </div>
</template>
<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
.app {
  width: 100%;
  height: 100%;
  .oper {
    display: flex;
  }
}
</style>
