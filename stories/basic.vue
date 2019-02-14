<template>
  <div>
    <p>基础用法</p>
    <el-select-area type="text" v-model="area" :level="2">
    </el-select-area>
  </div>
</template>

<script>
export default {
  data() {
    return {
      area: []
    }
  }
}
</script>

<style>
</style>
