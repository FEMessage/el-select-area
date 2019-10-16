el-select的size和disabled等属性可以直接使用

```vue
<template>
  <el-select-area type="text" v-model="area1" size="mini" disabled />
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
