import React, { FC, useState } from 'react'
import {makeStyles} from '@material-ui/styles'
import { Backdrop, Button } from '@material-ui/core'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
import classes from '*.module.css'

interface AccountProps {
  mode?: string;
}

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
  }
}))

const AccountModal: FC<AccountProps> = () => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false)
  const [modalMode, setModalMode] = useState<string>("login")
  return (
    <>
      <Backdrop open={open} className={classes.backdrop}>
        <div className={classes.dissmissable} onClick={() => setOpen(false)} />
        <div className={classes.accountContainer}>
          {modalMode === "login" ?
            <LoginModal setOpen={setOpen} setModalMode={setModalMode} /> :
            <RegisterModal setModalMode={setModalMode}/> }
        </div>
      </Backdrop>
      <Button className={classes.button} onClick={() => setOpen(true)}>регистр</Button>
    </>
  )
}

export default AccountModal