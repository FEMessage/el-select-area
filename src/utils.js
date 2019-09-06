export function isCode(value = '') {
  return /^\d{6,}$/.test(value)
}

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
