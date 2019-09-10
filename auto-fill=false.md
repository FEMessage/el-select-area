关闭自动填充时，选择框也只会出现下一级待选择框

```vue
<template>
  <el-select-area v-model="area" :auto-fill="false" />
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
```
