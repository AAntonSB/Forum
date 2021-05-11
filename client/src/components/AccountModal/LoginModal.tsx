import React, { FC, useState, MouseEvent, ChangeEvent } from 'react'
import { Input, Button, FormControl, InputLabel, InputAdornment, IconButton } from '@material-ui/core'
import {Link} from 'react-router-dom'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { makeStyles } from '@material-ui/styles'
import crumbledPaper from '../../images/crumbledPaper.jpg'

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

interface State {
  username: string;
  password: string;
  showPassword: boolean;
}

interface LoginModalProps {
  setModalMode: (mode: string) => void;
}

const LoginModal: FC<LoginModalProps> = ({setModalMode}) => {
  const classes = useStyles()
    const [values, setValues] = useState<State>({
    username: '',
    password: '',
    showPassword: false
    })
  
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
    <div className={classes.loginContainer}>
      <h1>Войти</h1>
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
      <Button>Войти</Button>
      <Button onClick={() => setModalMode("register")}>Уже есть аккаунт?</Button>
    </div>
  )
}

export default LoginModal