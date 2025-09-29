export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 自定义规则示例
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'wip',
      ],
    ],
    'subject-case': [0], // 允许任意大小写
  },
  defaultIgnores: false,
}
