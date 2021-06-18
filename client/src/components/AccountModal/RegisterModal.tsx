import React, { FC, useMemo, useCallback } from 'react'
import { TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import userRequests from '../../api'
import crumbledPaper from '../../images/crumbledPaper.jpg'
import {useFormik} from "formik"
import * as yup from "yup"

const useStyles = makeStyles(() => ({
  registerContainer: {
    background: `url(${crumbledPaper})`,
    fontFamily: "Montserrat",
    display: "grid",
    gridAutoRows: "auto",
    padding: "5px 30px 5px 30px",
    gridGap: "50px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.07), 0 8px 16px rgba(0,0,0,0.07), 0 16px 32px rgba(0,0,0,0.07), 0 32px 64px rgba(0,0,0,0.07);"
  },
  loginPage: {
    display: "grid",
    gridTemplateColumns: "50% 50%"
  },
  registerMenuButton: {
    alignSelf: "center",
    justifySelf: "start"
  },
  registerMenuLink: {
    alignSelf: "center",
    justifySelf: "end"
  }
}))

interface State {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  showPassword: boolean;
}

interface RegisterModalProps {
  setModalMode: (mode: string) => void;
}

const RegisterModal: FC<RegisterModalProps> = ({setModalMode}) => {
  const classes = useStyles()


    const validationSchema = useMemo(
    () =>
      yup.object().shape({
        email: yup.string().email().required("Please enter an email adress."),
        password: yup.string().required("Please enter a password.").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Requires at Least 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"),
        confirmPassword: yup.string()
    .required("Please confirm your password.")
    .oneOf([yup.ref("password"), null], "Passwords don't match")
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
        userRequests.register({email: values.email, password: values.password}).then((res) => console.log(res))
  }, [])

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })
  
  return (
    <div >
      <form className={classes.registerContainer} onSubmit={formik.handleSubmit}>
      <h1>Register</h1>
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
          <TextField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm password"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />
        <Button type="submit">Register</Button>
        <Button onClick={ () => setModalMode("login")} className={classes.registerMenuLink}>Already have an account?</Button>
      </form>
      </div>
  )
}

export default RegisterModal