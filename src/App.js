import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/header/header'
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Header></Header>
        <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Home />
            </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
