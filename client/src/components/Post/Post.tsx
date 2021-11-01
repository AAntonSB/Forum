import React, { FC } from 'react'
import { makeStyles } from '@material-ui/styles'
import { ListItem, Typography } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import chainBackground from '../../images/fence.png'
import _ from 'lodash'

const useStyles = makeStyles(() => ({
  mainContainer: {
    minHeight: "20rem",
    width: "100%",
    backgroundColor: "white",
    marginTop: "3rem",  
    display: "grid",
    gridTemplateRows: "10% auto 10%",
    gridTemplateColumns: "100%"
  },
  lockedContainer: {
    backgroundImage: `url(${chainBackground})`,
    backgroundSize: "30%",
    minHeight: "20rem",
    width: "100%",
    marginTop: "3rem",  
    display: "grid",
    gridTemplateRows: "10% auto 10%",
    gridTemplateColumns: "100%"
  }
}))

const Post: FC<{ post: any }> = ({ post }) => {
  const classes = useStyles();
  const { name, id } = useParams<{ name: string, id: string }>();

  return (
    <ListItem className={post.locked?classes.lockedContainer:classes.mainContainer}>
      <Typography variant="h5">{post.title}</Typography>
      <Typography style={{ marginTop: "1%", alignSelf: "flex-start" }}>{post.text}</Typography>
      <Typography>{post.user}</Typography>
    </ListItem>
  )
}

export default Post