import React, { FC, useState, useMemo, useCallback } from "react";
import { makeStyles } from '@material-ui/styles'
import { Backdrop, Button, TextField } from '@material-ui/core'
import crumbledPaper from '../../images/crumbledPaper.jpg'
import { useFormik } from "formik"
import * as yup from "yup"

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
  accountContainer: {
    zIndex: 3002
  },
  createPost: {
        background: `url(${crumbledPaper})`,
    fontFamily: "Montserrat",
    display: "grid",
    gridAutoRows: "auto",
    padding: "5px 30px 5px 30px",
    gridGap: "50px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.07), 0 8px 16px rgba(0,0,0,0.07), 0 16px 32px rgba(0,0,0,0.07), 0 32px 64px rgba(0,0,0,0.07);",
    textAlign: "center"
  }
}))

const CreatePostModal: FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false)

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
    
  }, [])

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  return <>
    <Backdrop open={open} className={classes.backdrop}>¨
      <div className={classes.dissmissable} onClick={() => setOpen(false)} />
        <form onSubmit={formik.handleSubmit}>
          <TextField
          id="email"
          name="email"
          label="Email"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        </form>
      </Backdrop>
    <Button
      variant="contained"
      color="primary"
      size="small"
      onClick={() => setOpen(true)}
    >Create post</Button>
  </>
}


export default CreatePostModal