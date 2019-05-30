选择值类型

```vue
<template>
  <div>
    <p>type = all</p>
    <el-select-area type="all" v-model="area1" />
    <p>{{area1}}</p>
    <hr>
    <p>type = code</p>
    <el-select-area type="code" v-model="area2" />
    <p>{{area2}}</p>
    <hr>
    <p>type = text</p>
    <el-select-area type="text" v-model="area3" />
    <p>{{area3}}</p>
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
