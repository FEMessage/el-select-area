# el-select-area

![introduce](http://thyrsi.com/t6/670/1550217570x2890174243.gif)

## Table of Contents

* [el-select-area](#el-select-area)
  * [Table of Contents](#table-of-contents)
  * [Introduction](#introduction)
  * [Feature](#feature)
  * [Demo](#demo)
  * [Install](#install)
  * [Example](#example)
    * [设置级联数](#%E8%AE%BE%E7%BD%AE%E7%BA%A7%E8%81%94%E6%95%B0)
    * [设置返回值类型](#%E8%AE%BE%E7%BD%AE%E8%BF%94%E5%9B%9E%E5%80%BC%E7%B1%BB%E5%9E%8B)
  * [Props](#props)
  * [License](#license)

## Introduction

地区选择三级联动组件，适用于需要进行地区选择的场景，组件内置了全国的区域信息，且用户可以自定义区域的数据信息。

此外，为了保持级别的一致，对于直辖市，台湾省这种只有 2 层级别的，会将省和市统一为直辖市名称，以保持 3 层级别的展示。

[⬆ Back to Top](#table-of-contents)

## Feature

* 可调整联动的级别
* 可选返回值类型
* 可自定义区域数据信息

[⬆ Back to Top](#table-of-contents)

## Demo

* [online demo](https://femessage.github.io/el-select-area/storybook/)
* [full api doc](https://femessage.github.io/el-select-area/)

[⬆ Back to Top](#table-of-contents)

## Install

```sh
# 确保提前安装了element-ui
yarn add element-ui

# 且注册了el-select el-option
```

```vue
// Step1 安装
yarn add @femessage/el-select-area 

// Step2 在需要的.vue 文件中
<template>
    <el-select-area v-model="area"></el-select-area>
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

#### 设置级联数

![level](http://thyrsi.com/t6/670/1550217603x2890174243.gif)

#### 设置返回值类型

![res](http://thyrsi.com/t6/670/1550217628x2890174243.gif)

[⬆ Back to Top](#table-of-contents)

## Props

| 参数         | 说明                                                              | 类型    | 默认值                                                                                              |
| ------------ | ----------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------- |
| value        | 范围输入框绑定的值                                                | Array   | [ ]                                                                                                 |
| type         | 返回值类型 text->文本，code-> 行政代码，all->对象类型，两者都返回 | String  | code                                                                                                |
| placeholders | 占位符数组                                                        | Array   | [ ]                                                                                                 |
| level        | 级联数，可选 0，1，2                                              | Number  | 2                                                                                                   |
| size         | select 框大小，同 el-select                                       | String  | medium                                                                                              |
| disabled     | 是否禁用                                                          | Boolean | false                                                                                               |
| data         | 省市区区域数据                                                    | Object  | <a href="https://github.com/FEMessage/el-select-area/blob/dev/src/arealist.js">查看详细区域数据</a> |

## License

[MIT](./LICENSE)

[⬆ Back to Top](#table-of-contents)
