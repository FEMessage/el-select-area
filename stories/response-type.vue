<template>
  <div>
    <div style="margin-bottom:100px">
      <p>返回值类型：all</p>
      <el-select-area type="all" v-model="area1" :level="2">
      </el-select-area>
      <p>
        {{area1}}
      </p>
    </div>
    
    <div style="margin-bottom:100px">
      <p>返回值类型：code</p>
      <el-select-area type="code" v-model="area2" :level="2">
      </el-select-area>
      <p>
        {{area2}}
      </p>
    </div>

    <div>
      <p>返回值类型:text</p>
      <el-select-area type="text" v-model="area3" :level="2">
      </el-select-area>
      <p>
        {{area3}}
      </p>
    </div>
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
