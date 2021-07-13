import { Fragment } from "react";
import Header from "../../components/header/header";
import { getUser } from "../../utils/userInfo";
function Home() {
  return (
    <Fragment>
      <Header hasLogin={!!getUser().role} />
      <h1>Home page</h1>
      <p>Home page content</p>
    </Fragment>
  );
}

export default Home;
