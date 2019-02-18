<template>
  <div>
    <p>disabled</p>
    <el-select-area type="text" v-model="area1" :level="2" disabled>
    </el-select-area>
  </div>
</template>

<script>
export default {
  data() {
    return {
      area1: ['330000', '330700', '330727']
    }
  }
}
</script>

<style>
</style>
