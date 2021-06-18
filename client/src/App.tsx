import React, {FC,} from 'react';
import { CssBaseline } from "@material-ui/core";
import { hot } from "react-hot-loader/root";
import {Route, Switch} from 'react-router-dom'

import Header from './components/Header';
import ForumSelector from './components/ForumSelector';
import Board from './components/Board';
import Post from './components/Post'
import UserList from './components/UserList'

const App: FC = () => {


  return (
    <div>
      <CssBaseline />
      <Header />
      <Switch>
        <Route exact path="/"> <ForumSelector /> </Route>
        <Route exact path="/Board/:name"> <Board /> </Route>
        <Route path="/Post/:name/:id"><Post /></Route>
        <Route path="/UserList"><UserList /></Route>
      </Switch>
      <div style={{width: "100%", height: "35vh", backgroundColor: "rgb(186,85,211)"}}/>
    </div>
  )
}

export default hot(App)