const formatPath = (text: string): string => {
  return `${text}`.replaceAll('%cwd%', process.cwd())
}

export default {
  formatPath
}
