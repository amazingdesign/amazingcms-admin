/* eslint-env node */

const _ = require('lodash')
const eol = require('eol')
const VirtualFile = require('vinyl')
const flattenObjectKeys = require('i18next-scanner/lib/flatten-object-keys').default
const omitEmptyObject = require('i18next-scanner/lib/omit-empty-object').default

const getFileJSON = require('./getFileJSON')

const flush = function (done) {
  const { parser } = this
  const { options } = parser

  // Flush to resource store
  const resStore = parser.get({ sort: options.sort })
  const { jsonIndent } = options.resource
  const lineEnding = String(options.resource.lineEnding).toLowerCase()

  Object.keys(resStore).forEach(lng => {
    const namespaces = resStore[lng]

    Object.keys(namespaces).forEach(ns => {
      let obj = namespaces[ns]

      const resPath = parser.formatResourceSavePath(lng, ns)

      // if not defaultLng then Get, Merge & removeUnusedKeys of old JSON content
      if (lng !== options.defaultLng) {
        let resContent = getFileJSON(resPath)

        if (options.removeUnusedKeys) {
          const namespaceKeys = flattenObjectKeys(obj)
          const resContentKeys = flattenObjectKeys(resContent)
          const unusedKeys = _.differenceWith(
            resContentKeys,
            namespaceKeys,
            _.isEqual,
          )

          for (let i = 0; i < unusedKeys.length; ++i) {
            _.unset(resContent, unusedKeys[i])
          }

          resContent = omitEmptyObject(resContent)
        }

        obj = { ...obj, ...resContent }
      }

      let text = `${JSON.stringify(obj, null, jsonIndent)}\n`

      if (lineEnding === 'auto') {
        text = eol.auto(text)
      } else if (lineEnding === '\r\n' || lineEnding === 'crlf') {
        text = eol.crlf(text)
      } else if (lineEnding === '\n' || lineEnding === 'lf') {
        text = eol.lf(text)
      } else if (lineEnding === '\r' || lineEnding === 'cr') {
        text = eol.cr(text)
      } else {
        // Defaults to LF
        text = eol.lf(text)
      }

      this.push(
        new VirtualFile({
          path: resPath,
          contents: Buffer.from(text),
        }),
      )
    })
  })

  done()
}

module.exports = flush 