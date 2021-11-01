import React, {FC, useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography, List, ListItem, CircularProgress } from '@material-ui/core'
import crumbledPaper from '../../images/crumbledPaper.jpg'
import { useHistory } from "react-router-dom"
import { SubForum, FetchPayload } from '../../types/Mongo/types'
import { subForumRequests } from '../../api'
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
    display: "grid",
    gridTemplateColumns: "33% 34% 33%",
    boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px"
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
  },
}))

const ForumSelector: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [data, setData] = useState<{ success: boolean, data: any }>();
  const [get, setGet] = useState<FetchPayload>({ error: false, loading: true })

    useEffect(() => {
      subForumRequests.getAll().then(response => {
      setGet({ error: false, loading: false })
      setData(response.data)
    }).catch(err => {
        setGet({error: true, loading: false})
    })
  }, [])

  if (get.loading || !data) {
    return <CircularProgress />
  }

  if (get.error) {
    return <div> an error has occured</div>
  }

  const subForums = data.data;

  return (
    <div className={classes.selectorContainer}>
      <Typography variant="h2">Sub-forums</Typography>
      <List>
      {_.map(subForums, (subForum, index) => (
        <ListItem className={clsx(classes.listItem)}
          button
          onClick={() => history.push(`/board/${subForum.title}`)}
          key={index}
        >
          <Typography variant="h4" align="left" style={{ "minWidth": "200px"}}>{subForum.title}</Typography>
          <Typography variant="h6" align="center">{subForum.description}</Typography>
        </ListItem>
      ))}
      </List>
    </div>
  )
}

export default ForumSelector