const filename = 'i18n.json'
const sourceDir = './i18n_messages'
const targetDir = './src/locales'

module.exports = {
  middlewares: {
    summary: [
      `summary?sourcePattern=${sourceDir}/${filename}`,
    ],
    process: [
      `fetchLocal?source=${targetDir},skip`,
      'metaToResult?from=text,to=zh',
      'youdao?apiname=SelectionTranslate,apikey=61384382',
      'reduce?autoPick,autoReduce[]=local',
    ],
    emit: [
      `save?dest=${targetDir}`,
    ],
  },
}
