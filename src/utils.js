/**
 * 校验该code是否是合法的中国大陆省市区编码
 * @param {string} code
 */
export function isCode(code = '') {
  return /^\d{6,}$/.test(code)
}

/**
 * 对传入的数组项，如果是{code: text}形式，转换回code
 * 比如{'120000': 北京}，转换成'120000'
 * 注意，虽然select-area输出的值可以是text数组，如['北京']，但接收的默认值不能是这种形式
 * @param {string|object} value
 */
export function formatValue(value) {
  return value.map(item =>
    typeof item === 'object' ? Object.keys(item)[0] : item
  )
}

export function compareStr(str1, str2, endIndex) {
  return str1.slice(0, endIndex) === str2.slice(0, endIndex)
}

export function isBelongToProvince(code1 = '', code2 = '') {
  return isCode(code1) && compareStr(code1, code2, 2)
}

export function isBelongToCity(code1 = '', code2 = '') {
  return isCode(code1) && compareStr(code1, code2, 4)
}
