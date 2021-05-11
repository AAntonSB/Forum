import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import crumbledPaper from '../../images/crumbledPaper.jpg'
import { List, Typography } from '@material-ui/core'
import _ from 'lodash'
import Post from './Post'

const useStyles = makeStyles(() => ({
  mainContainer: {
    display: "grid",
    placeItems: "center",
    background: `url(${crumbledPaper})`,
  },
  list: {
    width: "65%"
  }
}))

const ForumPost: FC = () => {
  const classes = useStyles();
  const { name, id } = useParams<{ name: string, id: string }>();
  const posts = [1,2,3,4]

  return (
    <div className={classes.mainContainer}>
      <List className={classes.list}>
        {_.map(posts, (post) => (
          <Post/>
        ))}
      </List>
    </div>
  )
}

export default ForumPost