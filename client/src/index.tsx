import { BrowserRouter } from "react-router-dom";
import App from './App';
import { render } from 'react-dom';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
)
