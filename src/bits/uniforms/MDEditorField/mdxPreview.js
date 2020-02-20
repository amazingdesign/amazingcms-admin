export const saveTmpContent = (content) => (
  fetch(
    /*eslint-env node*/
    window._env_.REACT_APP_MDX_TMP_PREVIEW_SAVE,
    {
      method: 'POST',
      body: JSON.stringify({ content }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
    .then(r => r.json())
)

export const getTmpPreviewLink = (contentId) => (
  `${window._env_.REACT_APP_MDX_TMP_PREVIEW_RENDERER}/${contentId}`
)