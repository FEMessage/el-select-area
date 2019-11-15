# el-select-area

[![NPM Download](https://img.shields.io/npm/dm/@femessage/el-select-area.svg)](https://www.npmjs.com/package/@femessage/el-select-area)
[![NPM Version](https://img.shields.io/npm/v/@femessage/el-select-area.svg)](https://www.npmjs.com/package/@femessage/el-select-area)
[![NPM License](https://img.shields.io/npm/l/@femessage/el-select-area.svg)](https://github.com/FEMessage/el-select-area/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/FEMessage/el-select-area/pulls)

![introduce](https://i.loli.net/2019/11/15/zLyDEc18gFaRk5t.gif)

## Table of Contents

- [Introduction](#introduction)
- [Feature](#feature)
- [Demo](#demo)
- [Install](#install)
- [DataSource](#datasource)
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

## DataSource

为了统一移动端和 PC 端的省市区列表数据，减少维护数据的成本，该组件默认使用有赞 [vant-ui](https://youzan.github.io/vant/#/zh-CN/area) 的[省市区列表数据](https://github.com/youzan/vant/blob/dev/src/area/demo/area.js)

### 国内官方数据源
- 国家统计局：[统计用区划代码和城乡划分代码](http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2018/index.html)
- 国家民政部：[中华人民共和国行政区划代码](http://www.mca.gov.cn/article/sj/xzqh/2019/)

### 快速生成工具
- [area-puppeteer](https://github.com/dwqs/area-puppeteer)

[⬆ Back to Top](#table-of-contents)

## Example

### 设置级联数

![level](https://i.loli.net/2019/11/15/sVt67SqeMJYaKPm.gif)

### 设置返回值类型

![res](https://i.loli.net/2019/11/15/OgvHftz8YuU7N9L.gif)

[⬆ Back to Top](#table-of-contents)

## License

[MIT](./LICENSE)

[⬆ Back to Top](#table-of-contents)
