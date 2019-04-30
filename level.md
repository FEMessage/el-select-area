```
<template>
  <div>
    <p>层级</p>
    <el-select-area v-model="area1" :level="0">
    </el-select-area>

    <el-select-area v-model="area2" :level="1" style="margin: 10px 0;">
    </el-select-area>

    <el-select-area v-model="area3" :level="2">
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
```