/**
 * 拆分数组
 * @param arr
 * @param size
 * @returns
 */
export function chunkArray<R>(arr: Array<R>, size: number) {
  const result = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

/**
 *
 * @param stake 桩号 转 米
 * @returns
 */
export function stakeToMeters(stake: string) {
  // 检查输入是否为空
  if (!stake) {
    throw new Error('桩号不能为空')
  }

  // 标准化输入：转换为小写，去除可能的空格
  const normalizedStake = stake.toLowerCase().replace(/\s/g, '')

  // 正则表达式匹配桩号格式 (如 k100+800 或 k123.456+78.9)
  const regex = /^k(\d+(?:\.\d+)?)(?:\+(\d+(?:\.\d+)?))?$/
  const match = normalizedStake.match(regex)

  if (!match) {
    throw new Error(`无效的桩号格式: ${stake}，正确格式应为 k数字+数字，如 k100+800`)
  }

  // 提取公里数和米数部分
  const kmPart = parseFloat(match[1])
  const mPart = match[2] ? parseFloat(match[2]) : 0

  // 验证米数部分是否合理（0-1000之间）
  if (mPart < 0 || mPart >= 1000) {
    throw new Error(`米数部分${mPart}无效，应在0-1000之间`)
  }

  // 计算总米数：公里数×1000 + 米数
  return kmPart * 1000 + mPart
}
