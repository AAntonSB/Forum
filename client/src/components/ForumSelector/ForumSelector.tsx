import React, {FC} from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography, List, ListItem } from '@material-ui/core'
import crumbledPaper from '../../images/crumbledPaper.jpg'
import { useHistory } from "react-router-dom"
import clsx from 'clsx'
import _ from 'lodash'

const useStyles = makeStyles(() => ({
  selectorContainer: {
    display: "grid",
    placeItems: "center",
    background: `url(${crumbledPaper})`
  },
  listItem: {
    width: "60vw",
  },
  evenItem: {
    backgroundColor: "#9980FA",
    "&:hover": {
    backgroundColor: "#9079ea !important",
    }
  },
  oddItem: {
    backgroundColor: "#5758BB",
    "&:hover": {
    backgroundColor: "#5153ad !important",
    }
  }
}))

const testList = [
  { name: "Skidor", comment: "Vilka skidor, budget skidor, utrustning vs skill" },
  { name: "Tjurar", comment: "Tjenixen" },
  { name: "Skidor", comment: "Tjenixen" },
]

const ForumSelector: FC = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.selectorContainer}>
      <Typography variant="h2">Sub-forums</Typography>
      <List>
      {_.map(testList, (testItem, index) => (
        <ListItem className={clsx(classes.listItem)}
          button
          onClick={() => history.push(`/советов/${testItem.name}`)}
        >
          <Typography variant="h4" align="left" style={{ "minWidth": "200px"}}>{testItem.name}</Typography>
          <Typography variant="h6" align="center">{testItem.comment}</Typography>
        </ListItem>
      ))}
      </List>
    </div>
  )
}

export default ForumSelector