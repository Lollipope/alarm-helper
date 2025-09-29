module.exports = {
  transform: (commit, context) => {
    // 添加所有类型为 "custom" 的提交
    if (commit.type === 'wip') {
      commit.section = 'Custom Section' // 自定义显示区块
      return commit // 返回修改后的提交
    }
  },
}
