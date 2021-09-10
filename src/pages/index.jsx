import { Fragment } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header/header";

function Home() {
  return (
    <Fragment>
      <Header />
      <div className="slider">
        <ul className="bxslider">
          <li>
            <div className="container">
              <div className="info">
                <h2>
                  It’s Time to <br />
                  <span>Get back to school</span>
                </h2>
                <Link href="#">Check out our new programs</Link>
              </div>
            </div>
          </li>
          <li>
            <div className="container">
              <div className="info">
                <h2>
                  It’s Time to <br />
                  <span>Get back to school</span>
                </h2>
                <Link to="#">Check out our new programs</Link>
              </div>
            </div>
            {/* / content  */}
          </li>
          <li>
            <div className="container">
              <div className="info">
                <h2>
                  It’s Time to <br />
                  <span>Get back to school</span>
                </h2>
                <Link href="#">Check out our new programs</Link>
              </div>
            </div>
            {/* / content / */}
          </li>
        </ul>
        <div className="bg-bottom"></div>
      </div>

      <section className="posts">
        <div className="container">
          <article>
            <div className="pic">
              <img width="121" src="public/images/2.png" alt="" />
            </div>
            <div className="info">
              <h3>The best learning methods</h3>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis quasi architecto beatae vitae
                dicta sunt explicabo.{" "}
              </p>
            </div>
          </article>
          <article>
            <div className="pic">
              <img width="121" src="public/images/3.png" alt="" />
            </div>
            <div className="info">
              <h3>Awesome results of our students</h3>
              <p>
                Vero eos et accusamus et iusto odio dignissimos ducimus
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa.
              </p>
            </div>
          </article>
        </div>
        {/* / container  */}
      </section>

      <section className="news">
        <div className="container">
          <h2>Latest news</h2>
          <article>
            <div className="pic">
              <img src="public/images/1.png" alt="" />
            </div>
            <div className="info">
              <h4>Omnis iste natus error sit voluptatem accusantium </h4>
              <p className="date">14 APR 2014, Jason Bang</p>
              <p>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit, sed quia consequuntur magni dolores (...)
              </p>
              <Link className="more" to="#">
                Read more
              </Link>
            </div>
          </article>
          <article>
            <div className="pic">
              <img src="public/images/1_1.png" alt="" />
            </div>
            <div className="info">
              <h4>Omnis iste natus error sit voluptatem accusantium </h4>
              <p className="date">14 APR 2014, Jason Bang</p>
              <p>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit, sed quia consequuntur magni dolores (...)
              </p>
              <Link className="more" to="#">
                Read more
              </Link>
            </div>
          </article>
          <div className="btn-holder">
            <Link className="btn" to="#">
              See archival news
            </Link>
          </div>
        </div>
        {/* container */}
      </section>

      <section className="events">
        <div className="container">
          <h2>Upcoming events</h2>
          <article>
            <div className="current-date">
              <p>April</p>
              <p className="date">15</p>
            </div>
            <div className="info">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.
              </p>
              <Link className="more" to="#">
                Read more
              </Link>
            </div>
          </article>
          <article>
            <div className="current-date">
              <p>April</p>
              <p className="date">17</p>
            </div>
            <div className="info">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.
              </p>
              <Link className="more" to="#">
                Read more
              </Link>
            </div>
          </article>
          <article>
            <div className="current-date">
              <p>April</p>
              <p className="date">25</p>
            </div>
            <div className="info">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.
              </p>
              <Link className="more" to="#">
                Read more
              </Link>
            </div>
          </article>
          <article>
            <div className="current-date">
              <p>April</p>
              <p className="date">29</p>
            </div>
            <div className="info">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad.
              </p>
              <Link className="more" to="#">
                Read more
              </Link>
            </div>
          </article>
          <div className="btn-holder">
            <Link className="btn blue" to="#">
              See all upcoming events
            </Link>
          </div>
        </div>
        {/* / container  */}
      </section>
      <div className="container">
        <a href="#fancy" className="info-request">
          <span className="holder">
            <span className="title">Request information</span>
            <span className="text">
              Do you have some questions? Fill the form and get an answer!
            </span>
          </span>
          <span className="arrow"></span>
        </a>
      </div>

      <footer id="footer">
        <div className="container">
          <section>
            <article className="col-1">
              <h3>Contact</h3>
              <ul>
                <li className="address">
                  <Link to="#">
                    151 W Adams St
                    <br />
                    Detroit, MI 48226
                  </Link>
                </li>
                <li className="mail">
                  <Link to="#">contact@harrisonuniversity.com</Link>
                </li>
                <li className="phone last">
                  <Link to="#">(971) 536 845 924</Link>
                </li>
              </ul>
            </article>
            <article className="col-2">
              <h3>Forum topics</h3>
              <ul>
                <li>
                  <Link to="#">Omnis iste natus error sit</Link>
                </li>
                <li>
                  <Link to="#">Nam libero tempore cum soluta</Link>
                </li>
                <li>
                  <Link to="#">Totam rem aperiam eaque </Link>
                </li>
                <li>
                  <Link to="#">Ipsa quae ab illo inventore veritatis </Link>
                </li>
                <li className="last">
                  <Link to="#">Architecto beatae vitae dicta sunt </Link>
                </li>
              </ul>
            </article>
            <article className="col-3">
              <h3>Social media</h3>
              <p>
                Temporibus autem quibusdam et aut debitis aut rerum
                necessitatibus saepe.
              </p>
              <ul>
                <li className="facebook">
                  <Link to="#">Facebook</Link>
                </li>
                <li className="google-plus">
                  <Link to="#">Google+</Link>
                </li>
                <li className="twitter">
                  <Link to="#">Twitter</Link>
                </li>
                <li className="pinterest">
                  <Link to="#">Pinterest</Link>
                </li>
              </ul>
            </article>
            <article className="col-4">
              <h3>Newsletter</h3>
              <p>
                Assumenda est omnis dolor repellendus temporibus autem
                quibusdam.
              </p>
              <form action="#">
                <input placeholder="Email address..." type="text" />
                <button type="submit">Subscribe</button>
              </form>
              <ul>
                <li>
                  <Link to="#"></Link>
                </li>
              </ul>
            </article>
          </section>
          <p className="copy">
            Copyright 2014 Harrison High School. Designed by{" "}
            <a
              href="http://www.vandelaydesign.com/"
              title="Designed by Vandelay Design"
              target="_blank"
              rel="noreferrer"
            >
              Vandelay Design
            </a>
            . All rights reserved.
          </p>
        </div>
      </footer>
      {/* / footer  */}

      <div id="fancy">
        <h2>Request information</h2>
        <form action="#">
          <div className="left">
            <fieldset className="mail">
              <input placeholder="Email address..." type="text" />
            </fieldset>
            <fieldset className="name">
              <input placeholder="Name..." type="text" />
            </fieldset>
            <fieldset className="subject">
              <select>
                <option>Choose subject...</option>
                <option>Choose subject...</option>
                <option>Choose subject...</option>
              </select>
            </fieldset>
          </div>
          <div className="right">
            <fieldset className="question">
              <textarea placeholder="Question..."></textarea>
            </fieldset>
          </div>
          <div className="btn-holder">
            <button className="btn blue" type="submit">
              Send request
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default Home;
