```
<template>
  <div>
    <section>
      <p>type = all</p>
      <el-select-area type="all" v-model="area1">
      </el-select-area>
      <p>
        {{area1}}
      </p>
    </section>
    
    <section>
      <p>type = code</p>
      <el-select-area type="code" v-model="area2">
      </el-select-area>
      <p>
        {{area2}}
      </p>
    </section>

    <section>
      <p>type = text</p>
      <el-select-area type="text" v-model="area3">
      </el-select-area>
      <p>
        {{area3}}
      </p>
    </section>
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