import React, { FC, useState, useCallback, useMemo } from 'react'
import { TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { userRequests } from '../../api'
import crumbledPaper from '../../images/crumbledPaper.jpg'
import { useFormik } from "formik"
import * as yup from "yup"
import { useUserContext } from '../../contexts/UserContext'

const useStyles = makeStyles(() => ({
    loginContainer: {
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

interface LoginModalProps {
  setModalMode: (mode: string) => void;
  setOpen: (open: boolean) => void;
}

const LoginModal: FC<LoginModalProps> = ({setModalMode, setOpen}) => {
  const classes = useStyles()
  const [data, setData] = useState()
  const { setToken } = useUserContext()

    const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required()
      }),
    []
    )

  const initialValues = useMemo(
    () => ({
      username: "",
      password: "",
    }),
    []
  )

  const onSubmit = useCallback((values) => {
    userRequests.login({ username: values.username, password: values.password }).then((res) => {
      setToken(res.data.token)
      setData(res.data.success)
      localStorage.setItem("token", res.data.token)
    })
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  if (data) {
    setOpen(false)
  }

  return (
    <div >
      <form className={classes.loginContainer} onSubmit={formik.handleSubmit}>
      <h1>Login</h1>
        <TextField
          id="username"
          name="username"
          autoComplete="username"
          label="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          id="password"
          name="password"
          autoComplete="current-password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
      <Button type="submit">Login</Button>
      <Button onClick={() => setModalMode("register")}>Don't have an account?</Button>
      </form>
    </div>
  )
}

export default LoginModal