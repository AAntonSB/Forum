import React, {FC} from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography, List, ListItem } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import crumbledPaper from '../../images/crumbledPaper.jpg'
import BoardHeader from './BoardHeader'
import clsx from 'clsx'
import _ from 'lodash'

const useStyles = makeStyles(() => ({
  listContainer: {
    display: "grid",
    placeItems: "center",
    background: `url(${crumbledPaper})`,
  },
  list: {
    width: "100%",
    display: "grid",
    placeItems: "center"
  },
  listItem: {
    width: "80%",
    display: "grid",
    gridTemplateColumns: "50% 50%"
  }
}))

const Board: FC = () => {
  const classes = useStyles()
  const history = useHistory();
  const { name } = useParams<{ name: string}>();
  let fetchedData = [1, 2, 3]

  return (
    <div className={classes.listContainer}>
      <BoardHeader name={name} />
      <List className={classes.list}>
        {_.map(fetchedData, (obj, index) => (
          <ListItem
            className={classes.listItem}
            button
            onClick={ () => history.push(`/советов/${name}/${obj}`)}
          >
            <Typography variant="h3">Topic</Typography>
            <Typography>Posts</Typography>
          </ListItem>
        ))}
        </List>
    </div>
  )
}

export default Board