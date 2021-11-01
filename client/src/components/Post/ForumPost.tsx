import React, { FC, useEffect, useState, useCallback, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import crumbledPaper from '../../images/crumbledPaper.jpg'
import { List, Typography, TextField, Button, Switch, ListItem, CircularProgress } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { useUserContext } from '../../contexts/UserContext'
import { useFormik } from "formik"
import { replyRequests, postRequests } from '../../api'
import * as yup from "yup"
import Post from './Post'
import chainBackground from '../../images/fence.png'
import _ from 'lodash'

const useStyles = makeStyles(() => ({
  mainContainer: {
    display: "grid",
    placeItems: "center",
    background: `url(${crumbledPaper})`,
  },
  list: {
    width: "65%"
  },
  confirmWarningDiv: {
    display: "grid",
    width: "20%",
    gridTemplateColumns: "60% 40%"
  },
  replyContainer: {
    minHeight: "20rem",
    width: "100%",
    backgroundColor: "white",
    marginTop: "3rem",
    display: "grid",
    gridTemplateRows: "auto 10%",
    gridTemplateColumns: "100%"
  },
  replyWarningContainer: {
    minHeight: "20rem",
    width: "100%",
    backgroundColor: "yellow",
    marginTop: "3rem",
    display: "grid",
    gridTemplateRows: "auto 10%",
    gridTemplateColumns: "100%"
  }
}))

const ForumPost: FC = () => {
  const classes = useStyles();
  const [data, setData] = useState<any>()
  const d = useParams<{ name: string, id: string }>();
  const [replies, setReplies] = useState<any>();
  const { token } = useUserContext()
  const [warning, setWarning] = useState<boolean>(false);

  useEffect(() => {
    postRequests.getById(d.id).then(req => {
      setData(req.data.data)
    })
    replyRequests.getAllFrom(d.id).then(req => {
      setReplies(req.data.data)
    })
  }, [])
  

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        text: yup.string().required()
      }),
    []
  )

  const initialValues = useMemo(
    () => ({
      text: ""
    }),
    []
  )

  const fetchReplies = useCallback(() => {
    replyRequests.getAllFrom(d.id).then(req => {
      setReplies(req.data.data)
    })
  }, [])

  const removeReply = useCallback((replyID: string) => {
    if (token) {
      replyRequests.delete({ replyID: replyID, subForumID: data.subForum }, { token: token, tokenName: "bearer" }).then(()=> fetchReplies())
    }
  },[data])
  
  const onSubmit = useCallback((values) => {
    if (token) {
      if (warning) {
      replyRequests.createWarning(
      { text: values.text, postID: d.id },
        { token: token, tokenName: "bearer" }).then(() => { fetchReplies() })
      } else {
    replyRequests.create(
      { text: values.text, postID: d.id },
      { token: token, tokenName: "bearer" }).then(() => {
      fetchReplies()
      })
      }
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [warning])

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  if (!data) {
    return <CircularProgress/>
  }

  return (
    <div className={classes.mainContainer}>
      <List className={classes.list}>
        {data?<Post post={data}/>:<></>}
        {_.map(replies, (reply) => (
          <ListItem
            className={reply.warning ? classes.replyWarningContainer : classes.replyContainer}>
            <Typography
            style={{ marginTop: "1%", alignSelf: "flex-start" }}
            >{reply.text}</Typography>
            <Typography>{reply.user}</Typography>
            <Button onClick={() => removeReply(reply._id)}>DELTE!?</Button>
          </ListItem>
        ))}
        {token && !data.locked ?
          <>
          <form onSubmit={formik.handleSubmit}>
          <Typography variant="h3"> Reply to post</Typography>
          <TextField
            fullWidth
            multiline
            id="text"
            name="text"
            variant="outlined"
            rows={10}
            value={formik.values.text}
            onChange={formik.handleChange}
            error={formik.touched.text && Boolean(formik.errors.text)}
            helperText={formik.touched.text && formik.errors.text}
            />
            <div className={classes.confirmWarningDiv}>
              <Typography>Warning post</Typography>
                <Switch checked={warning} onClick={() => setWarning(!warning)}/>
            </div>
            <Button
            variant="contained"
            color="primary"
            size="small"
            type="submit"
            >Post reply</Button>
          </form>
          </>
          :
          <div></div>
        }
      </List>
    </div>
  )
}

export default ForumPost