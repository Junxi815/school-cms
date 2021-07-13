import { Fragment } from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import Manager from "./manager/manager";
import Teacher from "./teacher";
import Student from "./student";
import { getUser } from "../../utils/userInfo";

export default function Dashboard() {
  const { path } = useRouteMatch();
  const user = getUser();
  return (
    <Fragment>
      {/* Check user in localStorage ? go to page /dashboard/{role} : login page */}
      {!!user.role ? (
        <Redirect to={`/dashboard/${user.role}`} />
      ) : (
        <Redirect to="/login" />
      )}

      <Switch>
        <Route path={`${path}/manager`}>
          <Manager />
        </Route>

        <Route path={`${path}/teacher`}>
          <Teacher />
        </Route>

        <Route path={`${path}/student`}>
          <Student />
        </Route>
      </Switch>
    </Fragment>
  );
}
