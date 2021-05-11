import React, { FC } from 'react'
import { makeStyles } from '@material-ui/styles'
import { ListItem, Typography } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import _ from 'lodash'

const useStyles = makeStyles(() => ({
  mainContainer: {
    minHeight: "20rem",
    width: "100%",
    backgroundColor: "white",
    marginTop: "3rem"
  }
}))

const Post: FC = () => {
  const classes = useStyles();
  const { name, id } = useParams<{ name: string, id: string }>();

  return (
    <ListItem className={classes.mainContainer}>
      
    </ListItem>
  )
}

export default Post