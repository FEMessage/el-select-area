```
<template>
  <div>
    <p>默认值：</p>
    <el-select-area v-model="area">
    </el-select-area>
  </div>
</template>

<script>
export default {
  data() {
    return {
      area: ['110000', '110100', '110106']
    }
  }
}
</script>
```