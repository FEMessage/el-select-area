# El-select-area

[![](https://img.shields.io/npm/dm/@femessage/el-select-area.svg#align=left&display=inline&height=20&originHeight=20&originWidth=140&status=done&width=140)](https://www.npmjs.com/package/@femessage/el-select-area)
[![](https://img.shields.io/npm/v/@femessage/el-select-area.svg#align=left&display=inline&height=20&originHeight=20&originWidth=80&status=done&width=80)](https://www.npmjs.com/package/@femessage/el-select-area)
[![](https://img.shields.io/npm/l/@femessage/el-select-area.svg#align=left&display=inline&height=20&originHeight=20&originWidth=78&status=done&width=78)](https://github.com/FEMessage/el-select-area/blob/master/LICENSE)
[![](https://img.shields.io/badge/PRs-welcome-brightgreen.svg#align=left&display=inline&height=20&originHeight=20&originWidth=90&status=done&width=90)](https://github.com/FEMessage/el-select-area/pulls)

![](https://cdn.nlark.com/yuque/0/2019/png/224563/1561951589541-6650fc0b-f15d-44ed-9092-027a67ceb740.png#align=left&display=inline&height=549&originHeight=549&originWidth=1306&size=0&status=done&width=1306)

<a name="65f5152b"></a>
## Table of Contents

- [Introduction](#introduction)
- [Feature](#feature)
- [Demo](#demo)
- [Install](#install)
- [Example](#example)
  - [Set Concatenation number](#%E8%AE%BE%E7%BD%AE%E7%BA%A7%E8%81%94%E6%95%B0)
  - [Set return value type](#%E8%AE%BE%E7%BD%AE%E8%BF%94%E5%9B%9E%E5%80%BC%E7%B1%BB%E5%9E%8B)
- [License](#license)

<a name="Introduction"></a>
## Introduction

Regional selection of three-level linkage components is suitable for scenarios that require regional selection. the components have built-in regional information across the country, and users can customize regional data information.

In addition, in order to maintain the consistency of the level, Taiwan province, which has only two levels, will unify the province and the city into the name of the municipality directly under the central government to maintain a three-level display.<br />[⬆Back to Top](#table-of-contents)

<a name="Feature"></a>
## Feature

- Level of adjustable linkage
- Optional return value type
- Customizable area data information<br />[⬆Back to Top](#table-of-contents)

<a name="Demo"></a>
## Demo

- [Doc and online demo](https://femessage.github.io/el-select-area/)<br />[⬆Back to Top](#table-of-contents)

<a name="Install"></a>
## Install

```javascript
# exsure element-ui installed
yarn add element-ui
# and registered el-select el-option
# Step1 install
yarn add @femessage/el-select-area
```

```html
// Step2 In the required .vue file
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

[⬆Back to Top](#table-of-contents)

<a name="Example"></a>
## Example

<a name="1e0e2735"></a>
### Set Concatenation number

![](https://cdn.nlark.com/yuque/0/2019/png/224563/1561951591572-f51b4a0d-b039-4fdc-97c3-597df886e716.png#align=left&display=inline&height=734&originHeight=734&originWidth=1652&size=0&status=done&width=1652)

<a name="ffde7822"></a>
### Set return value type

![](https://cdn.nlark.com/yuque/0/2019/png/224563/1561951589355-de05bdd0-be9a-45ee-ba16-2037d3a5b96e.png#align=left&display=inline&height=779&originHeight=779&originWidth=1677&size=0&status=done&width=1677)<br />[⬆Back to Top](#table-of-contents)

<a name="License"></a>
## License

[MIT](https://www.yuque.com/deepexi-serverless/onx52o/LICENSE)<br />[⬆Back to Top](#table-of-contents)
