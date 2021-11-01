import React, {FC, useState, useEffect, useCallback} from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography, List, ListItem } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import crumbledPaper from '../../images/crumbledPaper.jpg'
import chainBackground from '../../images/fence.png'
import { postRequests, subForumRequests } from '../../api'
import { useUserContext } from '../../contexts/UserContext'
import BoardHeader from './BoardHeader'
import eraser from '../../images/eraser.png'
import lock from '../../images/lock.png'
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
  },
  deleteButton: {
    height: "30px",
    width: "auto",
    cursor: "pointer",
    placeSelf: "end",
    "&hover": {
      boxShadow: "5px 5px 3px 3px rgba(0, 0, 0, 0.3)"
    },
    zIndex: 500,
  },
  testDiv: {
    display: "flex",
    justifyContent: "end",
    gap: "15px"
  },
  clicableDiv: {
    position: 'absolute',
    height: "100%",
    width: "100%",
  },
  lockedListItem: {
    width: "80%",
    display: "grid",
    backgroundImage: `url(${chainBackground})`,
    gridTemplateColumns: "50% 50%",
    backgroundSize: "20%"
  }
}))

const Board: FC = () => {
  const { name } = useParams<{ name: string }>();
  const classes = useStyles()
  const history = useHistory();
  const { token } = useUserContext()
  const [data, setData] = useState<any>()
  
  useEffect(() => {
    postRequests.getAllFrom(name).then(req => {
      setData(req.data.data)
    })
  }, [])

  const refetchPosts = useCallback(() => {
    postRequests.getAllFrom(name).then(req => {
      setData(req.data.data)
    })
  },[])
  
  const removeSubForum = (obj: any) => {
    if (token) {
      postRequests.delete({ postID: obj._id, subForumID: obj.subForum }, { token: token, tokenName: "bearer" }).then(() => refetchPosts())
    }
  }

  const lockSubForum = (obj: any) => {
    if (token) {
      postRequests.lock({subForumID: obj.subForum, postID: obj._id }, { token: token, tokenName: "bearer" }).then(() => refetchPosts())
    }
  }

  return (
    <div className={classes.listContainer}>
      <BoardHeader refetchPosts={refetchPosts} name={name} />
      <List className={classes.list}>
        {_.map(data, (obj, index) => (
          <ListItem
          key={index}
          className={obj.locked?classes.lockedListItem:classes.listItem}
          button
          >
            <div className={classes.clicableDiv}
            onClick={() => history.push(`/board/${name}/${obj._id}`)}
            ></div>
            <Typography variant="h3">{obj.title}</Typography>
            <div className={classes.testDiv}>
              <img src={eraser} onClick={() =>removeSubForum(obj._id)} alt="Delete board" className={classes.deleteButton} />
              <img src={lock} onClick={() => lockSubForum(obj)} alt="Lock board" className={classes.deleteButton} />
            </div>
          </ListItem>
        ))}
        </List>
    </div>
  )
}

export default Board