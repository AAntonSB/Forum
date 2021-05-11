import React, {FC} from 'react';
import { CssBaseline } from "@material-ui/core";
import { hot } from "react-hot-loader/root";
import Header from './components/Header';

const App: FC = () => {
  return (
    <div>
      <CssBaseline />
      <Header />
      <div style={{width: "100%", height: "35vh", backgroundColor: "rgb(186,85,211)"}}/>
    </div>
  )
}

export default hot(App)