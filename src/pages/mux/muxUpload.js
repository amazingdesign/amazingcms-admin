
import * as UpChunk from '@mux/upchunk'
import axios from '../../axios'

const API_URL = window._env_.REACT_APP_API_URL

export const pauseUpload = (uploader, setPaused) => () => {
  uploader && uploader.pause()
  const intervalId = setInterval(
    () => {
      if (uploader.paused) {
        console.debug('Upload paused!')
        setPaused(true)
        clearInterval(intervalId)
      }
    },
    100
  )
}
export const resumeUpload = (uploader, setPaused) => () => {
  uploader && uploader.resume()
  const intervalId = setInterval(
    () => {
      if (!uploader.paused) {
        console.debug('Upload resumed!')
        setPaused(false)
        clearInterval(intervalId)
      }
    },
    100
  )
}

export const muxUpload = ({ setProgress, setError, setSuccess }) => (file) => {
  const getUploadUrl = () => axios.post(`${API_URL}/mux/upload-url`, { name: file.name }).then(({ data }) => data.url)

  const upload = UpChunk.createUpload({
    endpoint: getUploadUrl,
    file: file,
    chunkSize: 5120, // Uploads the file in ~5mb chunks
  })

  // subscribe to events
  upload.on('error', err => {
    console.error('💥 🙀', err.detail)
    setError && setError(true)
  })

  upload.on('progress', progress => {
    console.debug(`So far we've uploaded ${progress.detail}% of this file.`)
    setProgress && setProgress(progress.detail)
  })

  upload.on('success', () => {
    // eslint-disable-next-line quotes
    console.debug("Wrap it up, we're done here. 👋")
    setSuccess && setSuccess(true)
  })

  return upload
}

export default muxUpload