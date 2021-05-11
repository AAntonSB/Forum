import React, { FC, useState, MouseEvent, ChangeEvent } from 'react'
import { Input, FormControl, InputLabel, InputAdornment, IconButton, Button } from '@material-ui/core'
import {Link} from 'react-router-dom'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { makeStyles } from '@material-ui/styles'
import userRequests from '../../api'
import crumbledPaper from '../../images/crumbledPaper.jpg'

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
  const [values, setValues] = useState<State>({
    username: '',
    password: '',
    confirmPassword: '',
    email: "",
    showPassword: false
  })

  const register = () => {
    userRequests.register({username: values.username, password: values.password}).then((res) => console.log(res))
  }

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

    const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  
  return (
    <div className={classes.registerContainer}>
      <h1>Зарегистрироваться</h1>
      <FormControl>
        <InputLabel htmlFor="username">Имя пользователя</InputLabel>
        <Input
          required
          id="username"
          type="username"
          value={values.username}
          onChange={handleChange('username')}
          aria-describedby="username"
          inputProps={{
            'aria-label': 'username'
          }}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="email">Электронное письмо</InputLabel>
        <Input
          id="email"
          type="email"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="password">Пароль</InputLabel>
        <Input
          id="password"
                    type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
                    endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="confirm-password">Подтвердить пароль</InputLabel>
        <Input
                  id="confirm-password"
                    type={values.showPassword ? 'text' : 'password'}
            value={values.confirmPassword}
            onChange={handleChange('confirmPassword')}
                    endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }/>
      </FormControl>
      <div  className={classes.loginPage}>
        <Button onClick={() => register()} className={classes.registerMenuButton}>регистр</Button>
        <Button onClick={ () => setModalMode("login")} className={classes.registerMenuLink}>Войти</Button>
      </div>
    </div>
  )
}

export default RegisterModal