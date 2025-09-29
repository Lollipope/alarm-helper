import angularPreset from 'conventional-changelog-angular'
console.log('Custom changelog config loaded!')
export default await angularPreset({
  types: [
    { type: 'feat', section: 'Features' },
    { type: 'fix', section: 'Bug Fixes' },
    { type: 'docs', section: 'Documentation' }, // 添加 docs 类型
    { type: 'chore', section: 'Chores' },
    { type: 'refactor', section: 'Refactoring' },
    { type: 'style', section: 'Styles' },
    { type: 'test', section: 'Tests' },
  ],
})
