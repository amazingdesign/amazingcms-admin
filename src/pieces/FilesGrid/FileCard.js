import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  card: {
    width: 272,
    margin: '1rem',
  },
  media: {
    height: 140,
  },
})

const FileCard = ({ src, title, name, desc, children }) => {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={src}
          title={title}
        />
        {
          (name || desc) &&
          <CardContent>
            {
              name &&
              <Typography gutterBottom variant={'h5'} component={'h2'}>
                {name}
              </Typography>
            }
            {
              desc &&
              <Typography variant={'body2'} color={'textSecondary'} component={'div'}>
                {desc}
              </Typography>
            }
          </CardContent>
        }
      </CardActionArea>
      {
        children &&
        <CardActions>
          {children}
        </CardActions>
      }
    </Card>
  )
}

FileCard.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  name: PropTypes.node,
  desc: PropTypes.node,
  children: PropTypes.node,
}

export default FileCard