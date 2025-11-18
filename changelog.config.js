export default {
  writerOpts: {
    transform: (commit) => {
      // const skipTypes = ['chore', 'test', 'docs', 'wip']
      // if (!commit.type || skipTypes.includes(commit.type)) return false
      return commit
    },
  },
}
