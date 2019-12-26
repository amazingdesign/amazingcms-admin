import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'

import BackgroundFieldWrapper from './BackgroundFieldWrapper'
import LoadingIndicator from './LoadingIndicator'
import ErrorMessage from './ErrorMessage'

import { getTmpPreviewLink } from './mdxPreview'

const styles = (theme, props) => ({
  iframe: {
    width: '100%',
    border: 'none',
    borderRadius: 4,
  },
})

const Preview = (props) => {
  const styles = {
    border: {
      display: 'flex',
      position: 'relative',
      marginTop: 0,
      minHeight: props.isFetching ? 250 : 0,
    },
  }

  return (
    <BackgroundFieldWrapper style={styles.border}>
      {
        props.isError ?
          <ErrorMessage
            message={'Wystąpił problem z połączeniem'}
          />
          :
          props.isFetching ?
            <LoadingIndicator />
            :
            <iframe
              title={'mdx-preview'}
              className={props.classes.iframe}
              /*eslint-env node*/
              // eslint-disable-next-line max-len
              src={getTmpPreviewLink(props.tmpPreviewId)}
            />
      }
    </BackgroundFieldWrapper>
  )
}

Preview.propTypes = {
  classes: PropTypes.object,
  isError: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  tmpPreviewId: PropTypes.string.isRequired,
}

export default withStyles(styles)(Preview)