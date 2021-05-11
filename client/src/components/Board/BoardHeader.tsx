import React, {FC} from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography, Button } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import clsx from 'clsx'
import _ from 'lodash'

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
      <Typography variant="h3" align="left">Добро пожаловать в {name}</Typography>
      <Button variant="contained" color="primary" size="small">создать сообщение</Button>
    </div>
  )
}

export default BoardHeader