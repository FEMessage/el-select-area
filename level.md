自定义层级

```vue
<template>
  <div>
    <el-select-area v-model="area1" :level="0" />
    <div style="height: 10px"></div>
    <el-select-area v-model="area2" :level="1" />
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
