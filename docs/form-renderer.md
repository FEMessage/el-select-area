```
<template>
  <el-form-renderer :content="content" ref="ruleForm">
    <el-button @click="getForm('ruleForm')">获取form</el-button>
    <el-button @click="updateForm('ruleForm')">更新form</el-button>
    <el-button @click="resetForm('ruleForm')">重置form</el-button>
  </el-form-renderer>
</template>

<script>
export default {
  data() {
    return {
      area: [],
      content: [
        {
          $id: 'area',
          $type: 'select-area',
          label: '收件地址',
          $default: [],
          $el: {
            placeholders: ['请选择', '请选择', '请选择'],
            type: 'all'
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
    getForm(formName) {
      console.log(this.$refs[formName].getFormValue())
    },
    updateForm(formName) {
      this.$refs[formName].updateForm({
        area: ['110000', '110100', '110106']
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
```