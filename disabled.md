禁用

```vue
<template>
  <el-select-area type="text" v-model="area1" :level="2" disabled />
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
```
