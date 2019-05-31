配合el-form-renderer使用

```vue
<template>
  <el-form-renderer :content="content" ref="ruleForm">
    <el-button @click="getForm">获取form</el-button>
    <el-button @click="updateForm">更新form</el-button>
    <el-button @click="resetForm">重置form</el-button>
  </el-form-renderer>
</template>
<script>
export default {
  data() {
    return {
      content: [
        {
          $id: 'area',
          $type: 'select-area',
          label: '收件地址',
          $default: [],
          $el: {
            placeholders: ['请选择', '请选择', '请选择'],
            type: 'text'
          },
          rules: [
            {
              required: true,
              type: 'array',
              message: '请选择收件地址区域',
              trigger: 'blur'
            }
          ]
        }
      ]
    }
  },
  methods: {
    getForm() {
      console.log(this.$refs.ruleForm.getFormValue())
    },
    updateForm() {
      this.$refs.ruleForm.updateForm({
        area: ['110000', '110100', '110106']
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  }
}
</script>
```
