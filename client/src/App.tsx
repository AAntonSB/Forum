import React, {FC, useState, useEffect, useCallback} from 'react';
import { CssBaseline } from "@material-ui/core";
import { hot } from "react-hot-loader/root";
import { Route, Switch } from 'react-router-dom'
import { MyUserContext, useUserContext } from './contexts/UserContext';
import { userRequests } from './api';

import Header from './components/Header';
import ForumSelector from './components/ForumSelector';
import Board from './components/Board';
import Post from './components/Post'
import UserList from './components/UserList';

const App: FC = () => {
  const [token, setToken] = useState<string | null>(null)
  const [bool, setBool] = useState<boolean>()

    const verifyUser = useCallback(() => {
    userRequests.refreshToken().then((doc) => {
      if(doc.data.success){
        setToken(doc.data.token)
        localStorage.setItem("token", doc.data.token)
        setTimeout(verifyUser, 5 * 60 * 1000)
        setBool(!bool)
      } else {
        setToken(null)
        localStorage.removeItem("token")
      }
  })
}, [bool])

 useEffect(() => {
    verifyUser()
 }, [])
  
  useEffect(() => {
    const tempToken = localStorage.getItem("token")
    if (!tempToken) localStorage.removeItem("token")
    else setToken(tempToken?tempToken:null)
  }, [])

  return (
    <MyUserContext.Provider value={{token, setToken}}>
      <CssBaseline />
      <Header />
      <Switch>
        <Route exact path="/"><ForumSelector/></Route>
        <Route exact path="/board/:name"> <Board/></Route>
        <Route exact path="/board/:name/:id"><Post/></Route>
        <Route exact path="/user-list"><UserList/></Route>
      </Switch>
      <div style={{width: "100%", height: "35vh", backgroundColor: "rgb(186,85,211)"}}/>
    </MyUserContext.Provider>
  )
}

export default hot(App)