import { Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Manager from "./manager/manager";
import Teacher from "./teacher";
import Student from "./student";
import { getUser } from "../../lib/services/userInfo";

export default function Dashboard() {
  const user = getUser();
  return (
    <Fragment>
      {/* if user not in localStorage, redirect to login page */}
      {!user.role && <Redirect to="/login" />}

      <Switch>
        <Route path="/dashboard/manager">
          <Manager />
        </Route>

        <Route path="/dashboard/teacher">
          <Teacher />
        </Route>

        <Route path="/dashboard/student">
          <Student />
        </Route>
      </Switch>
    </Fragment>
  );
}
