export const makeSrc = (bucketName) => (
  (file) => `${window._env_.REACT_APP_API_URL}/downloader/${bucketName}/${file._id}`
)

export default makeSrc