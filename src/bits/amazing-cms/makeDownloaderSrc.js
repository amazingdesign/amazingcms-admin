export const makeSrc = (bucketName, resize) => {
  const resizeParam = resize ? `?resize=${JSON.stringify(resize)}` : ''

  return (file) => `${window._env_.REACT_APP_API_URL}/downloader/${bucketName}/${file._id}${resizeParam}`
}

export default makeSrc