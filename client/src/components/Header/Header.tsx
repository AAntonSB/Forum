import React, { FC, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {Grid, Typography} from '@material-ui/core'
import {Link} from 'react-router-dom'
import headerImage from "../../images/headerImage.jpg"
import fadedHeaderImage from "../../images/fadedHeaderImage.jpg"
import AccountModal from '../AccountModal'

const useStyles = makeStyles(() => ({
  blurImage: {
    position: "relative",
    width: "100%",
    height: "440px",
    zIndex: -1,
    top: "0",
    left: "0",
    "& div": {
      position: "absolute",
      width: "100%",
      height: "440px",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center center"
    }
  },
  header: {
  zIndex: 1,
  position: "absolute",
  top: "0",
  width: "100%",
  padding: "0px 20px",
  },

  "@keyframes glitch": {
  "0%": {
    transform: "translate(0)"
  },
  "20%": {
    transform: "translate(-3px, 3px)"
  },
  "40%": {
    transform: "translate(-3px, -3px)"
  },
  "60%": {
    transform: "translate(3px, 3px)"
  },
  "80%": {
    transform: "translate(3px, -3px)"
  },
  "$:to": {
    transform: "translate(0)"
  }
  },
  bgHeader: {
    backgroundImage: `url(${headerImage})`
  },
  bgFadedHeader: {
    backgroundImage: `url(${fadedHeaderImage})`,
  },
  subMenu: {
    position: "absolute",
    fontSize: "1rem",
    top: "240px",
    left: "34%",
    margin: "0",
    backgroundColor: "yellow"
  },
  navigationMenu: {
    maxWidth: "600px",
    margin: "0 auto",
    height: "60px",
    borderTop: "1px rgba(255,166,201,.8) solid",
    "& ul": {
      textAlign: "center",
      margin: "0",
      "& li": {
        display: "inline-block",
        marginRight: "20px",
        "& a": {
          fontWeight: "800",
          fontSize: "1rem",
          textTransform: "uppercase",
          letterSpacing: ".2rem",
          color: "#FFD300",
          transition: "color 0.3 linnear",
          lineHeight: "60px",
          display: "block",
          "&:active": {
            boxShadow: "0px -1px 0px #FFD300"
          },
          "&::hover:": {
            boxShadow: "0px -1px 0px #FFD300"
          }
        }
      }
    }
  },
  fixes: {
    maxWidth: "600px",
    margin: "0 auto",
    paddingTop: "100px",
    height: "380px",
    textAlign: "center",
    color: "White",
    "& h1": {
      fontFamily: "Montserrat, regular",
      fontSize: "3rem",
      backgroundColor: "black",
      fontWeight: "900",
      lineHeight: 1,
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      margin: "0",
      textDecoration: "none",
      letterSpacing: "0.04em",
      "&::before, &::after": {
        display: "block",
        content: "attr(data-text)",
        position: "absolute",
        top: "0",
        left: "0",
        height: "auto",
        width: "100%",
        opacity: ".8"
      },
      "&::before": {
        color: "red",
        zIndex: -2,
        animation: "$glitch .2s cubic-bezier(.25, .46, .45, .94) both infinite"
      },
      "&::after": {
        color: "#fff",
        zIndex: -1,
        animation: "$glitch .2s cubic-bezier(.25, .46, .45, .94) both reverse infinite"
      }
    }
  }
}))


const Header: FC = () => {
  const classes = useStyles()
  const [scroll, setScroll] = useState<number>(0)


  useEffect(() => {
    window.onscroll = () => {
      let oVal: number = window.pageYOffset / 240
      setScroll(oVal)
    }
  })

  return (<>
    <div className={classes.blurImage}>
      <div className={classes.bgHeader} />
      <div className={classes.bgFadedHeader} style={{ "opacity": scroll}} />
    </div>
    <header className={classes.header}>
      <div className={classes.fixes}>
        {/* <div className={classes.logoImage} >
          <div className={classes.fadedLogo} style={{ "opacity": scroll }} />
        </div> */}
        <h1 data-text="лыжный форум">
            лыжный форум
        </h1>
      </div>
      <nav role='navigation' className={classes.navigationMenu}>
        <ul>
          <li>
            <Link to="/">To boards</Link>
          </li>
          <li>
            <AccountModal title="Login/Register"/>
          </li>
          <li>
            <Link to="/HoF">HoF</Link>
          </li>
        </ul>
      </nav>
    </header>
    </>
  )
}

export default Header;