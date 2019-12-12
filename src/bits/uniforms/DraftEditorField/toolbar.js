export default (uploadCallback) => ({
  options: [
    'blockType',
    'fontSize',
    'fontFamily',
    'inline',
    'textAlign',
    'list',
    'link',
    'image',
    'embedded',
    'emoji',
    'history',
  ],
  image: {
    urlEnabled: true,
    uploadEnabled: true,
    alignmentEnabled: true,
    uploadCallback: uploadCallback,
    previewImage: true,
    inputAccept: 'image/jpeg,image/jpg,image/png',
    alt: { present: false, mandatory: false },
    defaultSize: {
      height: 'auto',
      width: '100%',
    },
  },
})