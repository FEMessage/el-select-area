<template>
  <div>
    <p>层级</p>
    <el-select-area type="text" v-model="area1" :level="0" style="margin-bottom:50px">
    </el-select-area>

    <el-select-area type="text" v-model="area2" :level="1" style="margin-bottom:50px">
    </el-select-area>

    <el-select-area type="text" v-model="area3" :level="2">
    </el-select-area>

  </div>
</template>

<script>
export default {
  data() {
    return {
      area1: [],
      area2: [],
      area3: []
    }
  }
}
</script>

<style>
</style>
