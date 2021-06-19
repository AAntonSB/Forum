import React, {FC} from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography, Button } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import clsx from 'clsx'
import _ from 'lodash'
import CreatePostModal from './CreatePostModal'

const useStyles = makeStyles(() => ({
  headerContainer: {
    marginTop: "3%",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "11% 70% 10%",
    marginBottom: "2%"
  }
}))

interface BoardHeaderProps {
  name: string;
}

const BoardHeader: FC<BoardHeaderProps> = ({name}) => {
  const classes = useStyles()

  return (
    <div className={classes.headerContainer}>
      <div/>
      <Typography variant="h3" align="left">{name}</Typography>
      <CreatePostModal/>
    </div>
  )
}

export default BoardHeader