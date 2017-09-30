import TYPES from './type'

/**
 * 转盘各区域对应信息
 * @key 起始角度, 0 - 359
 * @value 区域信息
 */
const areas = {
  0: {
    type: TYPES.FAIL
  },
  90: {
    type: TYPES.SUCCESS
  },
  180: {
    type: TYPES.FAIL
  },
  270: {
    type: TYPES.SUCCESS
  }
}

export default areas
