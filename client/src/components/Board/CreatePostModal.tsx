import React, { FC, useState, useMemo, useCallback } from "react";
import { makeStyles } from '@material-ui/styles'
import { Backdrop, Button, TextField, Typography } from '@material-ui/core'
import crumbledPaper from '../../images/crumbledPaper.jpg'
import { useHistory } from 'react-router-dom'
// import { UserPayload, FetchPayload } from '../../types/Mongo/types'
import { useUserContext } from '../../contexts/UserContext'
import { useFormik } from "formik"
import * as yup from "yup"
import { postRequests } from '../../api'


const useStyles = makeStyles(() => ({
  backdrop: {
    zIndex: 3000
  },
  dissmissable: {
    zIndex: 3001,
    position: "absolute",
    top: "0",
    left: "0",
    height: "100vh",
    width: "100vw"
  },
  button: {
    fontWeight: 800,
    fontSize: "1rem",
    textTransform: "uppercase",
          letterSpacing: ".2rem",
          color: "#FFD300",
          transition: "color 0.3 linnear",
          lineHeight: "60px",
          display: "block",
          textDecoration: "underline"
  },
  createPost: {
    background: `url(${crumbledPaper})`,
    fontFamily: "Montserrat",
    display: "grid",
    gridAutoRows: "auto",
    padding: "5px 30px 5px 30px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.07), 0 8px 16px rgba(0,0,0,0.07), 0 16px 32px rgba(0,0,0,0.07), 0 32px 64px rgba(0,0,0,0.07);",
    textAlign: "center",
    width: "40rem",
    zIndex: 3002
  }
}))

interface CreatePostModalProps {
  name: string;
  refetchPosts: ()=>void
}

const CreatePostModal: FC<CreatePostModalProps> = ({name, refetchPosts}) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false)
  const { token } = useUserContext()

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        title: yup.string().required(),
        text: yup.string().required()
      }),
    []
  )

  const initialValues = useMemo(
    () => ({
      title: "",
      text: ""
    }),
    []
  )

  const onSubmit = useCallback((values) => {
    if (token) {
      postRequests.create(
        { title: values.title, text: values.text, subForumID: name },
        { token: token, tokenName: "bearer" }).then(res => {
          refetchPosts()
          setOpen(false)
        })
    } else {
      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setOpen])

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  return (
    <>
      <Backdrop open={open} className={classes.backdrop}>¨
        <div className={classes.dissmissable} onClick={() => setOpen(false)} />
        <form onSubmit={formik.handleSubmit} className={classes.createPost}>
          <Typography variant="h3">Create post</Typography>
        <TextField
          fullWidth
          id="title"
          name="title"
          label="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
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
        <Button
          variant="contained"
          color="primary"
          size="large"
          style={{ justifySelf: "flex-end", marginTop: "  .5rem" }}
          type="submit"
        >Submit</Button>
        </form>
      </Backdrop>
    <Button
      variant="contained"
      color="primary"
      size="small"
      onClick={() => setOpen(true)}
      disabled={token?false:true}
    >Create post</Button>
    </>
  )
}


export default CreatePostModal