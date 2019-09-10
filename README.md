# el-select-area

[![NPM Download](https://img.shields.io/npm/dm/@femessage/el-select-area.svg)](https://www.npmjs.com/package/@femessage/el-select-area)
[![NPM Version](https://img.shields.io/npm/v/@femessage/el-select-area.svg)](https://www.npmjs.com/package/@femessage/el-select-area)
[![NPM License](https://img.shields.io/npm/l/@femessage/el-select-area.svg)](https://github.com/FEMessage/el-select-area/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/FEMessage/el-select-area/pulls)

![introduce](https://i.screenshot.net/8dv1lto)

## Table of Contents

- [Introduction](#introduction)
- [Feature](#feature)
- [Demo](#demo)
- [Install](#install)
- [Example](#example)
  - [设置级联数](#设置级联数)
  - [设置返回值类型](#设置返回值类型)
- [License](#license)

## Introduction

地区选择三级联动组件，适用于需要进行地区选择的场景，组件内置了全国的区域信息，且用户可以自定义区域的数据信息。

此外，为了保持级别的一致，对于直辖市，台湾省这种只有 2 层级别的，会将省和市统一为直辖市名称，以保持 3 层级别的展示。

[⬆ Back to Top](#table-of-contents)

## Feature

- 可调整联动的级别
- 可选返回值类型
- 可自定义区域数据信息

[⬆ Back to Top](#table-of-contents)

## Demo

- [doc and online demo](https://femessage.github.io/el-select-area/)

[⬆ Back to Top](#table-of-contents)

## Install

```sh
# 确保提前安装了element-ui
yarn add element-ui

# 且注册了el-select el-option

# Step1 安装
yarn add @femessage/el-select-area
```

```vue
// Step2 在需要的.vue 文件中
<template>
  <el-select-area v-model="area" />
</template>
<script>
import ElSelectArea from '@femessage/el-select-area'

export default {
  components: {
    ElSelectArea
  },
  data() {
    return {
      area: []
    }
  }
}
</script>
```

[⬆ Back to Top](#table-of-contents)

## Example

### 设置级联数

![level](https://i.screenshot.net/py2nra3)

### 设置返回值类型

![res](https://i.screenshot.net/pdy12uz)

[⬆ Back to Top](#table-of-contents)

## License

[MIT](./LICENSE)

[⬆ Back to Top](#table-of-contents)
