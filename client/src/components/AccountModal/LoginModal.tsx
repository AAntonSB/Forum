import React, { FC, useState, useCallback, useMemo, MouseEvent } from 'react'
import { TextField, Button, IconButton, InputAdornment } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { userRequests } from '../../api'
import crumbledPaper from '../../images/crumbledPaper.jpg'
import { useFormik } from "formik"
import * as yup from "yup"

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
  const [showPassword, setShowPassword] = useState<boolean>(false)

    const validationSchema = useMemo(
    () =>
      yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required()
      }),
    []
  )

  const initialValues = useMemo(
    () => ({
      email: "",
      password: "",
      confirmPassword: ""
    }),
    []
  )

  const onSubmit = useCallback((values) => {
    userRequests.login({email: values.email, password: values.password}).then((res) => setData(res.data))
  }, [])

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  if (data === "Succesfully authenticated") {
    setOpen(false)
  }

  return (
    <div >
      <form className={classes.loginContainer} onSubmit={formik.handleSubmit}>
      <h1>Login</h1>
        <TextField
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          id="password"
          name="password"
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