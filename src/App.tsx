import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import DashboardChild from "./pages/dashboardchild";
import Signup from "./pages/signup";
import "./App.css";
import { getUser } from "./lib/services/userInfo";
import { MessageProvider } from "./components/provider";

function App() {
  const user = getUser();
  return (
    <MessageProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/signup">
            <Signup />
          </Route>

          <Route exact path="/dashboard">
            <Redirect to={`/dashboard/${user.role}`} />
          </Route>

          <Route path="/dashboard/:role">
            <DashboardChild />
          </Route>
        </Switch>
      </Router>
    </MessageProvider>
  );
}

export default App;
