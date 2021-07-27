import React from "react";
import { Switch, Redirect, Route, useLocation } from "react-router-dom";
import MainLayout from "../../../components/layout/layout";
import ManagerHome from "./home";
import Students from "./students";
import StudentDetail from "./students/detail";

export default function Manager() {
  const { pathname } = useLocation();
  console.log("1");
  return (
    <MainLayout>
      <Switch>
        <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
        <Route exact path="/dashboard/manager">
          <ManagerHome />
        </Route>
        <Route exact path="/dashboard/manager/">
          <Redirect to="/dashboard/manager" />
        </Route>
        <Route exact path="/dashboard/manager/students">
          <Students />
        </Route>
        <Route path="/dashboard/manager/students/:id">
          <StudentDetail />
        </Route>
        <Route path="/dashboard/manager/teachers">
          <div>teachers</div>
        </Route>
        <Route path="/dashboard/manager/courses">
          <div>courses</div>
        </Route>
        <Route path="/dashboard/manager/add-course">
          <div>add course</div>
        </Route>
        <Route path="/dashboard/manager/edit-course">
          <div>edit course</div>
        </Route>
        <Route path="/dashboard/manager/message">
          <div>message</div>
        </Route>
        <Redirect to="/dashboard/manager" />
      </Switch>
    </MainLayout>
  );
}
