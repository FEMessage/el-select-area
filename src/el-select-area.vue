<template>
  <div class="el-select-area">
    <el-select
      class='select-area-item'
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

const AREA = {
  province: {
    index: 0,
    name: 'province'
  },
  city: {
    index: 1,
    name: 'city'
  },
  county: {
    index: 2,
    name: 'county'
  }
}

function isCode(value = '') {
  return /^\d{6,}$/.test(value)
}

function isBelongToProvince(code1 = '', code2 = '') {
  return (
    isCode(code1) && isCode(code2) && code1.slice(0, 2) === code2.slice(0, 2)
  )
}

function isBelongToCity(code1 = '', code2 = '') {
  return (
    isCode(code1) && isCode(code2) && code1.slice(0, 4) === code2.slice(0, 4)
  )
}

export default {
  name: 'ElSelectArea',
  props: {
    /**
     * 地区选中值，数组，必填，没有选中值，传[]
     * @model
     */
    value: {
      type: Array,
      required: true
    },

    /**
     * 返回行政区域代码 text-返回文本 all-返回 code 和 text，默认code
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
     * 级联数，默认为二级级联，最多为三级级联，最小为一级
     * 可选值 `0, 1, 2`
     */
    level: {
      type: Number,
      default: 2, // 0-->一联 1->二联 2->三联
      validator: val => [0, 1, 2].indexOf(val) > -1
    },

    /**
     * select框大小 可选值：'small', 'medium', 'mini'
     */
    size: {
      type: String,
      default: 'medium',
      validator: val => ['small', 'medium', 'mini'].indexOf(val) > -1
    },
    /**
     * 是否禁用
     */
    disabled: {
      type: Boolean,
      default: false
    },

    /**
     * 数据源，可不填，默认数据格式参考见：`https://github.com/dwqs/area-data`
     * 经过项目检验，将area-data中的直辖市的数据进行修改，将市辖区修改成相应的直辖市名称并修改成直辖市的code
     * 且将省市区进行分类，分别对应province_list、city_list、county_list
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
      columns: [{}, {}, {}],

      // 生成一些函数
      setProvince: this.setArea(AREA.province.name),
      setCity: this.setArea(AREA.city.name),
      setCounty: this.setArea(AREA.county.name),

      // 缓存 getList 和 getIndex 的结果
      getList: memoize(
        this.getAreaList,
        (...arg) => (arg[1] ? arg[1] : arg[0])
      ),
      getIndex: memoize(this.getAreaIndex, (...arg) => arg[1])
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
      newVal = this.formatValue(newVal)
      oldVal = this.formatValue(oldVal)
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
    formatValue(value) {
      let formated = []
      for (let i = 0; i < value.length; i++) {
        const item = value[i]
        if (item && (isCode(item) || typeof item === 'string')) {
          formated.push(item)
        } else {
          formated.push(Object.keys(item).pop())
        }
      }
      return formated
    },
    reset(type) {
      let columnNum = AREA[type].index
      this.$set(this.values, columnNum, {code: '', name: '', type: type})
      this.$set(this.indexs, columnNum, '')
    },
    // 兼容旧的输出
    emitEvent() {
      let result

      if (this.type === 'all') {
        result = this.values.map(item => {
          const obj = {}
          item.code && (obj[item.code] = item.name)
          return obj
        })
      }

      if (this.type === 'code') {
        result = this.values.map(item => item.code)
      }

      if (this.type === 'text') {
        result = this.values.map(item => item.name)
      }

      result = result.slice(0, +this.level + 1)

      /**
       * input 事件仅为了绑定v-model, 不了解v-model机制请勿随意调用
       * @event input
       * @type {array}
       * @model
       */
      this.$emit('input', result)

      /**
       * 当前选中值改变时触发的事件，返回结果根据属性 type 的定义返回相应的数组结果
       *
       * @event change
       * @type {array}
       */
      this.$emit('change', result)
    },

    /**
     * 当选中options时，设置当前选中值
     * @returns {function}
     * 返回一个设置某个级别的位置的function
     */
    setArea(type) {
      let columnNum = AREA[type].index
      return (item = {}, index = null) => {
        let {code, name = ''} = item
        if (!code) return
        // 传入默认code时补全中文
        if (!name) {
          name = this[type][code]
        }
        this.$set(this.values, columnNum, {code, name, type})
        if (index !== null) {
          this.$set(this.indexs, columnNum, index)
        }
      }
    },

    provinceChange(item, index) {
      const {code, name} = item
      this.setProvince(item)
      if (this.level >= 1) {
        let city = this.getList(AREA.city.name, code.slice(0, 2))
        this.setList(AREA.city.name, code)
        this.cityChange(city[0], 0)
      }
    },

    cityChange(item, index) {
      const {code, name} = item
      this.setCity(item, index)
      if (this.level >= 2) {
        let county = this.getList(AREA.county.name, code.slice(0, 4))
        this.setList(AREA.county.name, code)
        this.countyChange(county[0], 0)
      }
    },

    countyChange(item, index) {
      const {code, name} = item
      this.setCounty(item, index)
    },

    // event onchange 触发三个options联动
    handleOptionChange(index, type) {
      let [province, city, county] = this.displayColumns
      if (type === AREA.province.name) {
        this.provinceChange(province[index], index)
      }

      if (type === AREA.city.name) {
        this.cityChange(city[index], index)
      }

      if (type === AREA.county.name) {
        this.countyChange(county[index], index)
      }

      // 暴露事件
      this.emitEvent()
    },
    /**
     * get list by code
     * @param type {String} 区域类别
     * @param code {String | Number} 区域编码
     * @returns {Array}
     */
    getAreaList(type, code) {
      let result = []

      // 最高级行政区域可以不需要传入code
      if (type !== AREA.province.name && !code) {
        return result
      }

      const list = this[type]
      result = Object.keys(list).map(listCode => ({
        code: listCode,
        name: list[listCode]
      }))
      if (code) {
        result = result.filter(item => item.code.indexOf(code) === 0)
      }

      return result
    },

    // get index by code
    getAreaIndex(type, code) {
      let compareNum = (AREA[type].index + 1) * 2
      const list = this.getList(type, code.slice(0, compareNum - 2))

      code = code.slice(0, compareNum)
      for (let i = 0; i < list.length; i++) {
        if (list[i].code.slice(0, compareNum) === code) {
          return i
        }
      }

      return -1
    },

    // 设置对应的下级列表
    setList(type, code = '') {
      let compareNum = (AREA[type].index + 1) * 2
      const list = this.getList(type, code.slice(0, compareNum - 2))
      this.$set(this.columns, compareNum / 2 - 1, list)
    },

    // 组件初始化时，设置默认值
    setValues() {
      // 默认省级区域
      this.setList(AREA.province.name)

      // 设置传入的选中值
      const [provinceCode, cityCode, countyCode] =
        this.formatValue(this.value) || []

      const provinceIndex = provinceCode
        ? this.getIndex(AREA.province.name, provinceCode)
        : -1
      const cityIndex = cityCode ? this.getIndex(AREA.city.name, cityCode) : -1
      const countyIndex = countyCode
        ? this.getIndex(AREA.county.name, countyCode)
        : -1

      if (isCode(provinceCode) && provinceIndex > -1) {
        this.setProvince({code: provinceCode}, provinceIndex)
        this.setList(AREA.city.name, provinceCode)
      } else {
        this.reset(AREA.province.name)
      }

      if (
        isBelongToProvince(provinceCode, cityCode) &&
        this.level >= 1 &&
        cityIndex > -1
      ) {
        this.setCity({code: cityCode}, cityIndex)
        this.setList(AREA.county.name, cityCode)
      } else {
        this.reset(AREA.city.name)
      }

      if (
        isBelongToCity(countyCode, cityCode) &&
        this.level >= 2 &&
        countyIndex > -1
      ) {
        this.setCounty({code: countyCode}, countyIndex)
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
