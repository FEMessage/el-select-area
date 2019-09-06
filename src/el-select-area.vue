<template>
  <div class="el-select-area">
    <el-select
      class="select-area-item"
      v-model="indexs[index]"
      :placeholder="placeholders[index]"
      :size="size"
      :disabled="disabled"
      v-for="(item, index) in displayColumns"
      :key="index"
      @change="handleOptionChange($event, values[index].type)"
    >
      <el-option
        :label="val.name"
        :value="key"
        v-for="(val, key) in item"
        :key="key"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import arealist from './arealist.js'
import memoize from 'lodash.memoize'
import {
  isCode,
  formatValue,
  isBelongToProvince,
  compareStr,
  isBelongToCity
} from './utils'

const PROVINCE = 'province'
const CITY = 'city'
const COUNTY = 'county'
const INDEX = {
  [PROVINCE]: 0,
  [CITY]: 1,
  [COUNTY]: 2
}
const CODE_LEN = {
  [PROVINCE]: 2,
  [CITY]: 4,
  [COUNTY]: 6
}

const TYPE = {
  all: 'all',
  code: 'code',
  text: 'text'
}

export default {
  name: 'ElSelectArea',
  props: {
    /**
     * 地区选中值。若没有选中值，传[]
     * @model
     */
    value: {
      type: Array,
      required: true
    },

    /**
     * code返回行政区域代码;
     * text返回文本;
     * all返回{code: text}
     */
    type: {
      type: String,
      default: 'code', //  code-返回行政区域代码 text-返回文本 all-返回 code 和 text
      validator: val => ['all', 'code', 'text'].indexOf(val) > -1
    },

    /**
     * select框的placeholder
     */
    placeholders: {
      type: Array,
      default: () => ['请选择', '请选择', '请选择']
    },

    /**
     * 级联数，可选值0-->一联；1->二联；2->三联
     */
    level: {
      type: Number,
      default: 2,
      validator: val => [0, 1, 2].includes(val)
    },

    /**
     * select框大小，同el-select；
     * 可选值：small, medium, mini
     */
    size: {
      type: String,
      default: 'medium',
      validator: val => ['small', 'medium', 'mini'].includes(val)
    },
    /**
     * 是否禁用
     */
    disabled: {
      type: Boolean,
      default: false
    },

    /**
     * 数据源，可不填。[默认数据格式](https://github.com/FEMessage/el-select-area/blob/dev/src/arealist.js)；
     * 经过项目检验，将area-data中的直辖市的数据进行修改，将市辖区修改成相应的直辖市名称并修改成直辖市的code，
     * 且将省市区进行分类，分别对应province_list、city_list、county_list。
     */
    data: {
      type: Object,
      default: () => arealist
    }
  },

  data() {
    return {
      // 当前选中的索引
      indexs: ['', '', ''],

      // 当前展示的列表
      columns: [[], [], []],

      // 缓存 getList 和 getIndex 的结果
      getList: memoize(this._getList, (type, code) => (code ? code : type)),
      getIndex: memoize(this._getIndex, (type, code) => code)
    }
  },

  computed: {
    // 区域数据
    areaData() {
      return {
        [PROVINCE]: this.data['province_list'] || {},
        [CITY]: this.data['city_list'] || {},
        [COUNTY]: this.data['county_list'] || {}
      }
    },
    // 根据 level 的值返回展示的联级数量
    displayColumns() {
      return this.columns.slice(0, +this.level + 1)
    },
    values() {
      return this.indexs.map((index, i) => {
        return this.columns[i] ? {...this.columns[i][index]} : {}
      })
    }
  },

  watch: {
    /**
     * 由于v-model输出的数据和输入的格式不一致，监听时需要过滤一些无用的输入
     * 同时确保value改变了才重置列表选项
     */
    value(newVal, oldVal) {
      newVal = formatValue(newVal)
      oldVal = formatValue(oldVal)
      if (
        newVal.toString() !== oldVal.toString() &&
        newVal.every(item => isCode(item))
      ) {
        this.setValues()
        this.emitEvent()
      }
    }
  },

  methods: {
    reset(type) {
      let columnNum = INDEX[type]
      this.$set(this.indexs, columnNum, '')
      columnNum > 0 && this.$set(this.columns, columnNum, [])
    },
    // 兼容旧的输出
    emitEvent() {
      let result = {
        [TYPE.all]: this.values
          .map(({code, name}) => (code ? {[code]: name} : {}))
          .filter(v => Object.keys(v).length),
        [TYPE.code]: this.values.map(({code}) => code).filter(v => v),
        [TYPE.text]: this.values.map(({name}) => name).filter(v => v)
      }[this.type]

      result = result.slice(0, +this.level + 1)

      /**
       * input事件仅为了绑定v-model, 不了解v-model机制请勿随意调用
       * @property {array} result
       */
      this.$emit('input', result)

      /**
       * 当前选中值改变时触发的事件，返回结果根据属性 type 的定义返回相应的数组结果
       * @property {array} result
       */
      this.$emit('change', result)
    },

    provinceChange({code}) {
      if (this.level >= 1) {
        this.setList(CITY, code)
        const i = INDEX[CITY]
        this.indexs.splice(i, 1, 0)
        this.cityChange(this.values[i])
      }
    },

    cityChange({code}) {
      if (this.level >= 2) {
        this.setList(COUNTY, code)
        const i = INDEX[COUNTY]
        this.indexs.splice(i, 1, 0)
      }
    },

    // event onchange 触发三个options联动
    handleOptionChange(index, type) {
      const [province, city, county] = this.columns
      ;({
        [PROVINCE]: () => this.provinceChange(province[index]),
        [CITY]: () => this.cityChange(city[index]),
        [COUNTY]: () => {}
      }[type]())
      // 暴露事件
      this.emitEvent()
    },
    /**
     * get list by code
     * @param type {String} 区域类别
     * @param code {String | Number} 区域编码
     * @returns {Array}
     */
    _getList(type, code) {
      // 最高级行政区域可以不需要传入code
      if (type !== PROVINCE && !code) return []

      const list = this.areaData[type]
      return Object.keys(list)
        .filter(key => key.indexOf(code) === 0)
        .map(code => ({code, name: list[code], type}))
    },

    // get index by code
    _getIndex(type, code) {
      const compareNum = CODE_LEN[type]
      const list = this.getList(type, code.slice(0, compareNum - 2))
      return list.findIndex(item => compareStr(item.code, code, compareNum))
    },

    // 设置对应的下级列表
    setList(type, code = '') {
      const compareNum = CODE_LEN[type]
      const list = this.getList(type, code.slice(0, compareNum - 2))
      this.columns.splice(INDEX[type], 1, list)
    },

    // 组件初始化时，设置默认值
    setValues() {
      // 默认省级区域
      this.setList(PROVINCE)

      // 设置传入的选中值
      const [provinceCode, cityCode, countyCode] = formatValue(this.value)

      // 如果 区域码 不存在时 index设为 -1
      const provinceIndex = provinceCode
        ? this.getIndex(PROVINCE, provinceCode)
        : -1
      const cityIndex = cityCode ? this.getIndex(CITY, cityCode) : -1
      const countyIndex = countyCode ? this.getIndex(COUNTY, countyCode) : -1

      if (isCode(provinceCode) && provinceIndex > -1) {
        this.indexs.splice(INDEX[PROVINCE], 1, provinceIndex)
        this.setList(CITY, provinceCode)
      } else {
        this.reset(PROVINCE)
      }

      if (
        isBelongToProvince(provinceCode, cityCode) &&
        this.level >= 1 &&
        cityIndex > -1
      ) {
        this.indexs.splice(INDEX[CITY], 1, cityIndex)
        this.setList(COUNTY, cityCode)
      } else {
        this.reset(CITY)
      }

      if (
        isBelongToCity(countyCode, cityCode) &&
        this.level >= 2 &&
        countyIndex > -1
      ) {
        this.indexs.splice(INDEX[COUNTY], 1, countyIndex)
      } else {
        this.reset(COUNTY)
      }
    }
  },

  created() {
    this.setValues()
  }
}
</script>

<style>
.el-select-area {
  font-size: 0;
}

.el-select-area .select-area-item {
  margin-right: 10px;
  vertical-align: middle;
}
</style>
