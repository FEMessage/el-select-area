import {isCode, formatValue} from '../src/utils'

describe('isCode', () => {
  test('pass', () => {
    expect(isCode('123456')).toBe(true)
    expect(isCode('1234567')).toBe(true)
  })
  test('not pass', () => {
    expect(isCode('12345')).toBe(false)
    expect(isCode('1234ab')).toBe(false)
  })
})

describe('formatValue', () => {
  test('code', () => {
    const codes = ['120000', '120100', '120101']
    expect(formatValue(codes)).toEqual(codes)
  })
  test('text', () => {
    const texts = ['辽宁省', '沈阳市', '和平区']
    expect(formatValue(texts)).toEqual(texts)
  })
  test('all', () => {
    const alls = [
      {'120000': '天津市'},
      {'120100': '天津市'},
      {'120101': '和平区'}
    ]
    const codes = ['120000', '120100', '120101']
    expect(formatValue(alls)).toEqual(codes)
  })
})
