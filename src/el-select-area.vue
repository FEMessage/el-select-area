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

const AREA = {
  province: {
    index: 0,
    name: 'province',
    codeLen: 2
  },
  city: {
    index: 1,
    name: 'city',
    codeLen: 4
  },
  county: {
    index: 2,
    name: 'county',
    codeLen: 6
  }
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
      // 当前选中的值
      values: [
        {code: '', name: '', type: AREA.province.name},
        {code: '', name: '', type: AREA.city.name},
        {code: '', name: '', type: AREA.county.name}
      ],

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
    province() {
      return this.data['province_list'] || {}
    },

    city() {
      return this.data['city_list'] || {}
    },

    county() {
      return this.data['county_list'] || {}
    },
    // 根据 level 的值返回展示的联级数量
    displayColumns() {
      return this.columns.slice(0, +this.level + 1)
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
      let columnNum = AREA[type].index
      this.$set(this.values, columnNum, {code: '', name: '', type: type})
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

    /**
     * 当选中options时，设置当前选中值
     */
    setArea(type, {code, name = this[type][code]} = {}, index) {
      if (!code) return
      const columnNum = AREA[type].index
      // 传入默认code时补全中文
      this.values.splice(columnNum, 1, {code, name, type})
      if (index !== undefined) {
        this.indexs.splice(columnNum, 1, index)
      }
    },

    provinceChange(item, index) {
      const {code, name} = item
      this.setArea(AREA.province.name, item)
      if (this.level >= 1) {
        let city = this.getList(AREA.city.name, code.slice(0, 2))
        this.setList(AREA.city.name, code)
        this.cityChange(city[0], 0)
      }
    },

    cityChange(item, index) {
      const {code, name} = item
      this.setArea(AREA.city.name, item, index)
      if (this.level >= 2) {
        let county = this.getList(AREA.county.name, code.slice(0, 4))
        this.setList(AREA.county.name, code)
        this.countyChange(county[0], 0)
      }
    },

    countyChange(item, index) {
      const {code, name} = item
      this.setArea(AREA.county.name, item, index)
    },

    // event onchange 触发三个options联动
    handleOptionChange(index, type) {
      let [province, city, county] = this.displayColumns
      ;({
        province: () => this.provinceChange(province[index], index),
        city: () => this.cityChange(city[index], index),
        county: () => this.countyChange(county[index], index)
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
      if (type !== AREA.province.name && !code) return []

      const list = this[type]
      return Object.keys(list)
        .filter(key => key.indexOf(code) === 0)
        .map(code => ({code, name: list[code]}))
    },

    // get index by code
    _getIndex(type, code) {
      const compareNum = AREA[type].codeLen
      const list = this.getList(type, code.slice(0, compareNum - 2))
      return list.findIndex(item => compareStr(item.code, code, compareNum))
    },

    // 设置对应的下级列表
    setList(type, code = '') {
      const compareNum = AREA[type].codeLen
      const list = this.getList(type, code.slice(0, compareNum - 2))
      this.columns.splice(AREA[type].index, 1, list)
    },

    // 组件初始化时，设置默认值
    setValues() {
      // 默认省级区域
      this.setList(AREA.province.name)

      // 设置传入的选中值
      const [provinceCode, cityCode, countyCode] = formatValue(this.value)

      // 如果 区域码 不存在时 index设为 -1
      const provinceIndex = provinceCode
        ? this.getIndex(AREA.province.name, provinceCode)
        : -1
      const cityIndex = cityCode ? this.getIndex(AREA.city.name, cityCode) : -1
      const countyIndex = countyCode
        ? this.getIndex(AREA.county.name, countyCode)
        : -1

      if (isCode(provinceCode) && provinceIndex > -1) {
        this.setArea(AREA.province.name, {code: provinceCode}, provinceIndex)
        this.setList(AREA.city.name, provinceCode)
      } else {
        this.reset(AREA.province.name)
      }

      if (
        isBelongToProvince(provinceCode, cityCode) &&
        this.level >= 1 &&
        cityIndex > -1
      ) {
        this.setArea(AREA.city.name, {code: cityCode}, cityIndex)
        this.setList(AREA.county.name, cityCode)
      } else {
        this.reset(AREA.city.name)
      }

      if (
        isBelongToCity(countyCode, cityCode) &&
        this.level >= 2 &&
        countyIndex > -1
      ) {
        this.setArea(AREA.county.name, {code: countyCode}, countyIndex)
      } else {
        this.reset(AREA.county.name)
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
