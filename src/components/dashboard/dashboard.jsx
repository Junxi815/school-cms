import { Fragment } from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import Manager from "../../pages/dashboard/manager";
import Teacher from "../../pages/dashboard/teacher";
import Student from "../../pages/dashboard/student";
import { userInfo } from "../../utils/storage";

export default function Dashboard() {
  const { path } = useRouteMatch();
  const user = userInfo.getUser();
  return (
    <Fragment>
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
