## 在 TypeScript 中指定组件的类型

```html
<script lang="ts">
// 需要引入这个
// import { ElSelectAreaType } from '@femessage/el-select-area'
export default {
  mounted() {
    (this.$refs.selectArea as ElSelectAreaType).autoFill = true
  },
}
</script>
```
