import React, {FC} from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'
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
  refetchPosts: () => void
}

const BoardHeader: FC<BoardHeaderProps> = ({name, refetchPosts}) => {
  const classes = useStyles()

  return (
    <div className={classes.headerContainer}>
      <div/>
      <Typography variant="h3" align="left">{name}</Typography>
      <CreatePostModal refetchPosts={refetchPosts} name={name} />
    </div>
  )
}

export default BoardHeader