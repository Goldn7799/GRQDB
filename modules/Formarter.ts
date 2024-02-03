const formatPath = (text: any): string => {
  return `${text}`.replaceAll('%cwd%', process.cwd())
}

export default {
  formatPath
}
