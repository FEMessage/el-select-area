<template>
  <div class="el-select-area">
    <el-select class='select-area-item' v-model="curProvinceCode" :placeholder="placeholders[0]||'请选择'" :size="size" :disabled="disabled">
      <el-option :label="val" :value="key" v-for="(val, key) in provinces" :key="key"></el-option>
    </el-select>

    <el-select class='select-area-item' v-model="curCityCode" :placeholder="placeholders[1] ||'请选择'" :size="size" v-if="level>=1" :disabled="disabled">
      <el-option :label="val" :value="key" v-for="(val, key) in citys" :key="key"></el-option>
    </el-select>

    <el-select class='select-area-item' v-model="curCountyCode" :placeholder="placeholders[2]||'请选择'" :size="size" v-if="level>=2" :disabled="disabled">
      <el-option :label="val" :value="key" v-for="(val, key) in countys" :key="key"></el-option>
    </el-select>
  </div>
</template>

<script>
import find from 'lodash.find'
import {Select, Option} from 'element-ui'
import arealist from './arealist'

const TAIWAN_CODE = '710000'

function assert(condition, msg = '') {
  if (!condition) {
    console.error(`[select-area]: ${msg}`)
  }
}

function isArray(param) {
  return Object.prototype.toString.call(param) === '[object Array]'
}

export default {
  name: 'ElAreaSelect',
  components: {
    'el-select': Select,
    'el-option': Option
  },
  props: {
    /**
     * 地区选中值，数组，必填，没有选中值，传[]
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
     * select框的placeholder，数据，默认为[]
     */
    placeholders: {
      type: Array,
      default: () => []
    },

    /**
     * 级联数，默认为二级级联，最多为三级级联，最小为一级
     */
    level: {
      type: Number,
      default: 1, // 0-->一联 1->二联 2->三联
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
     * 且将省市区进行分类，分别对应provinceList、cityList、countyList
     */
    data: {
      type: Object,
      default: () => arealist
    }
  },

  data() {
    return {
      // 区域数据
      provinces: this.data['provinceList'],
      citys: {},
      countys: {},

      curProvince: '', // text
      curProvinceCode: '', // code
      curCity: '',
      curCityCode: '',
      curCounty: '',
      curCountyCode: '',

      // 设置默认值的判断
      defaults: [],
      isCode: false,
      isSetDefault: false
    }
  },

  watch: {
    curProvinceCode(val, oldVal) {
      this.curProvince = this.provinces[val]
      this.provinceChange(val)
    },

    curCityCode(val, oldVal) {
      this.curCity = this.citys[val]
      this.cityChange(val)
    },

    curCountyCode(val, oldVal) {
      this.curCounty = this.countys[val]
      this.areaChange(val)
    },

    value(val) {
      if (isArray(val) && !val.length) {
        this.curProvinceCode = ''
        this.curCityCode = ''
        this.curCountyCode = ''
        this.$nextTick(() => {
          this.citys = {}
          this.countys = {}
        })
      }

      if (!this.isSetDefault && isArray(val) && val.length === this.level + 1) {
        this.beforeSetDefault()
        this.setDefaultValue()
      }

      if (
        !this.isSetDefault &&
        isArray(val) &&
        val.length &&
        val.length !== this.level + 1
      ) {
        assert(false, `设置的默认值和 level 值不匹配`)
      }
    }
  },

  methods: {
    provinceChange(val) {
      if (this.level === 0) {
        this.selectChange()
      } else if (this.level >= 1) {
        this.citys = this.data.cityList[val]
        if (!this.citys) {
          this.citys = {
            [this.curProvinceCode]: this.curProvince
          }
          this.curCity = this.curProvince
          this.curCityCode = this.curCityCode
          return
        }

        let curCity = Object.values(this.citys)[0]
        let curCityCode = Object.keys(this.citys)[0]

        if (this.defaults[1]) {
          if (this.isCode) {
            curCityCode = find(
              Object.keys(this.citys),
              item => item === this.defaults[1]
            )
            assert(
              curCityCode,
              `城市 ${this.defaults[1]} 不存在于省份 ${this.defaults[0]} 中`
            )
            curCity = this.citys[curCityCode]
          } else {
            curCity = find(this.citys, item => item === this.defaults[1])
            assert(
              curCity,
              `城市 ${this.defaults[1]} 不存在于省份 ${this.defaults[0]} 中`
            )
            curCityCode = find(
              Object.keys(this.citys),
              item => this.citys[item] === this.defaults[1]
            )
          }
        }

        this.curCity = curCity
        this.curCityCode = curCityCode
      }
    },

    cityChange(val) {
      if (this.level === 1) {
        this.selectChange()
      } else if (this.level === 2) {
        this.countys = this.data.countyList[val]
        if (!this.countys) {
          this.countys = {
            [this.curCityCode]: this.curCity
          }
          this.curCounty = this.curCity
          this.curCountyCode = this.curCityCode
          return
        }

        let curCounty = Object.values(this.countys)[0]
        let curCountyCode = Object.keys(this.countys)[0]

        if (this.defaults[2]) {
          if (this.isCode) {
            curCountyCode = find(
              Object.keys(this.countys),
              item => item === this.defaults[2]
            )
            assert(
              curCountyCode,
              `县区 ${this.defaults[2]} 不存在于城市 ${this.defaults[1]} 中`
            )
            curCounty = this.countys[curCountyCode]
          } else {
            curCounty = find(this.countys, item => item === this.defaults[2])
            assert(
              curCounty,
              `县区 ${this.defaults[2]} 不存在于城市 ${this.defaults[1]} 中`
            )
            curCountyCode = find(
              Object.keys(this.countys),
              item => this.countys[item] === this.defaults[2]
            )
          }
        }

        this.curCounty = curCounty
        this.curCountyCode = curCountyCode
      }
    },

    areaChange(val) {
      this.curCountyCode = val
      this.selectChange()
    },

    getAreaCode() {
      let codes = []

      switch (this.level) {
        case 0:
          codes = [this.curProvinceCode]
          break
        case 1:
          codes = [
            this.curProvinceCode,
            this.curProvinceCode === TAIWAN_CODE
              ? this.curProvinceCode
              : this.curCityCode
          ]
          break
        case 2:
          codes = [
            this.curProvinceCode,
            this.curProvinceCode === TAIWAN_CODE
              ? this.curProvinceCode
              : this.curCityCode,
            this.curCountyCode
          ]
          break
      }

      return codes
    },

    getAreaText() {
      let texts = []

      switch (this.level) {
        case 0:
          texts = [this.curProvince]
          break
        case 1:
          // fix #32 710000是台湾省
          texts = [
            this.curProvince,
            this.curProvinceCode === TAIWAN_CODE
              ? this.curProvince
              : this.curCity
          ]
          break
        case 2:
          texts = [
            this.curProvince,
            this.curProvinceCode === TAIWAN_CODE
              ? this.curProvince
              : this.curCity,
            this.curCounty
          ]
          break
      }

      return texts
    },

    getAreaCodeAndText(selected) {
      let textCodes = []

      switch (this.level) {
        case 0:
          textCodes = [{[this.curProvinceCode]: this.curProvince}]
          break
        case 1:
          textCodes = [
            {[this.curProvinceCode]: this.curProvince},
            {[this.curCityCode]: this.curCity}
          ]
          break
        case 2:
          const cityCode =
            this.curProvinceCode === TAIWAN_CODE
              ? this.curProvinceCode
              : this.curCityCode
          const cityText =
            this.curProvinceCode === TAIWAN_CODE
              ? this.curProvince
              : this.curCity
          textCodes = [
            {[this.curProvinceCode]: this.curProvince},
            {[cityCode]: cityText},
            {[this.curCountyCode]: this.curCounty}
          ]
          break
      }

      return textCodes
    },

    beforeSetDefault() {
      const chinese = /^[\u4E00-\u9FA5\uF900-\uFA2D]{2,}$/
      const num = /^\d{6,}$/
      const isCode = num.test(this.value[0])
      let isValid

      if (!isCode) {
        isValid = this.value.every(item => chinese.test(item))
      } else {
        isValid = this.value.every(item => num.test(item))
      }

      assert(isValid, '传入的默认值参数有误')
      // 映射默认值，避免直接更改props
      this.defaults = [].concat(this.value)
      this.isCode = isCode
      this.isSetDefault = true
    },

    setDefaultValue() {
      let provinceCode = ''

      if (this.isCode) {
        provinceCode = this.defaults[0]
      } else {
        const province = find(this.provinces, item => item === this.defaults[0])
        assert(province, `省份 ${this.defaults[0]} 不存在`)
        provinceCode = find(
          Object.keys(this.provinces),
          item => this.provinces[item] === this.defaults[0]
        )
      }
      this.curProvinceCode = provinceCode
      // 还原默认值，避免用户选择出错
      this.$nextTick(() => {
        this.defaults = []
        // this.isCode = false;
        // this.isSetDefault = false;
      })
    },

    selectChange() {
      this.isSetDefault = true
      let res = []

      if (this.type === 'code') {
        res = this.getAreaCode()
      } else if (this.type === 'text') {
        res = this.getAreaText()
      } else if (this.type === 'all') {
        res = this.getAreaCodeAndText()
      }
      /**
       * 选择地区之后触发
       * @return 获取改变后地区数据
       * @event input
       */
      this.$emit('input', res)

      /**
       * 选择地区之后触发
       * @return 获取改变后地区数据
       * @event change
       */
      this.$emit('change', res)
    }
  },

  created() {
    if (isArray(this.value) && this.value.length === this.level + 1) {
      this.beforeSetDefault()
      this.setDefaultValue()
    }

    if (
      isArray(this.value) &&
      this.value.length &&
      this.value.length !== this.level + 1
    ) {
      assert(false, `设置的默认值和 level 值不匹配`)
    }
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
