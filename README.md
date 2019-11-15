# el-select-area

[![NPM Download](https://img.shields.io/npm/dm/@femessage/el-select-area.svg)](https://www.npmjs.com/package/@femessage/el-select-area)
[![NPM Version](https://img.shields.io/npm/v/@femessage/el-select-area.svg)](https://www.npmjs.com/package/@femessage/el-select-area)
[![NPM License](https://img.shields.io/npm/l/@femessage/el-select-area.svg)](https://github.com/FEMessage/el-select-area/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/FEMessage/el-select-area/pulls)

![introduce](https://i.loli.net/2019/11/15/zLyDEc18gFaRk5t.gif)

[中文文档](./README-zh.md)

## Table of Contents

- [Introduction](#introduction)
- [Demo](#demo)
- [Install](#install)
- [DataSource](#datasource)
- [Example](#example)
- [License](#license)

## Introduction

This component contains Chinese area data, including Taiwan、Hongkong、Macao.

[⬆ Back to Top](#table-of-contents)


## Demo

- [doc and online demo](https://femessage.github.io/el-select-area/)

[⬆ Back to Top](#table-of-contents)

## Install

```sh
# make sure has installed element-ui
yarn add element-ui

# and has globally registered el-select el-option 

# install
yarn add @femessage/el-select-area
```

```vue
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

The area data comes from [vant-ui](https://github.com/youzan/vant/blob/dev/src/area/demo/area.js)

[⬆ Back to Top](#table-of-contents)

## Example

![level](https://i.loli.net/2019/11/15/sVt67SqeMJYaKPm.gif)

![res](https://i.loli.net/2019/11/15/OgvHftz8YuU7N9L.gif)

[⬆ Back to Top](#table-of-contents)

## License

[MIT](./LICENSE)

[⬆ Back to Top](#table-of-contents)
