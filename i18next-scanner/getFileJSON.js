/* eslint-env node */

const fs = require('fs')
const path = require('path')

const getFileJSON = (resPath) => {
  try {
    return JSON.parse(
      fs
        .readFileSync(fs.realpathSync(path.join('src', resPath)))
        .toString('utf-8'),
    )
  } catch (e) {
    return {}
  }
}

module.exports = getFileJSON 