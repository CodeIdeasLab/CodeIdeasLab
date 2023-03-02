import { categoriesImg, remotePics, newestPics } from "../const";
import { Helmet } from "react-helmet";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "./Spinner";

export default function Home({ setLoadingSpinner, loadingSpinner, setShow }) {
  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();
  const { category } = useParams();

  useEffect(() => {
    setLoadingSpinner(true);
    axios
      .get("http://localhost:8080/projects/sort?createdAt=-1")
      .then((response) => {
        setProjects(response.data);
        setLoadingSpinner(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingSpinner(false);
        navigate("/404");
      });
  }, []);

  const limit = 3;

  const filteredProjectsRemote = projects.filter(function (project) {
    return project.location === "remote";
  });

  const filteredProjectsRemoteLimit = filteredProjectsRemote
    .slice(0, limit)
    .map((item) => item);

  const filteredProjectsNewestLimit = projects
    .slice(0, limit)
    .map((item) => item);

  const handleShow = () => setShow(true);

  return (
    <>
      <div className="d-flex w-100 footershadow">
        <div className="d-flex flex-column hero-container ">
          <div className="container-fluid mx-auto">
            <div className="row">
              <div className="col-lg-4 p-5 mb-2 d-flex flex-column justify-content-around fade-in-text">
                <div className="welcome">
                  WELCOME TO THE PLACE WHERE{" "}
                  <span className="orange-text">ideas</span> MEET{" "}
                  <span className="orange-text">tech</span>
                </div>
                <div className="">
                  <span className="home-call-to-action me-3">
                    Create your project now
                  </span>
                  <Link to="/signup" className="">
                    <button
                      className="btn signupbutton "
                      type="button"
                      onClick={handleShow}
                    >
                      SignUp
                    </button>
                  </Link>{" "}
                </div>
              </div>
              <div className="col-lg-8 p-5 mb-2">
                <img
                  className="rounded welcome-img responsive-img light-gray-background"
                  src="https://images.unsplash.com/photo-1455849318743-b2233052fcff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80"
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dark-blue-background light-gray-text p-3 container-fluid headershadow">
        <div className="row dark-blue-background light-gray-text">
          <div className="col-lg-8 dark-blue-background light-gray-text welcome-text">
            Co Create Lab is a platform where ideas meet tech. <br></br>
            It's a place where you get the opportunity to realize your ideas
            with other people. <br></br>
            It's a space where people find together.
          </div>
          <div className="col-lg-4 dark-blue-background light-gray-text pe-5">
            <h2 className="dark-blue-background light-gray-text text-end welcome-heading">
              What is <br></br>{" "}
              <span className="orange-text dark-blue-background">
                Co Create Lab
              </span>
              ?
            </h2>
          </div>
        </div>
      </div>

      <div className="light-gray-background dark-blue-text p-3 container-fluid headershadow">
        <div className="row light-gray-background dark-blue-text">
          <div className="col-lg-4 mb-2">
            <h2 className="text-start welcome-heading-dark ">
              What's the <span className="orange-text">idea</span>?
            </h2>
            <div className="call-to-action-container ms-2">
              <span className="home-call-to-action-projects me-3">
                Explore all the beautiful projects
              </span>
              <Link to="/projects" className="">
                <button className="btn signupbutton" type="button">
                  Explore
                </button>
              </Link>{" "}
            </div>
          </div>
          <div className="col-lg-8 mb-2 welcome-text">
            people without tech skills have awesome web- and app ideas and
            projects in mind, but do not know how to realize them. people with
            tech skills have awesome skills and want to realize projects, but do
            not have the right ideas. co create lab is a place where both come
            together and realize awesome projects. not a job seekers platform
            volunteering, no money involved made in free time community for fun
            and gathering experience free of charge for everyone
          </div>
        </div>
      </div>

      <div className="dark-blue-background light-gray-text p-3 container-fluid footershadow">
        <div className="row dark-blue-background light-gray-text">
          <div className="col-lg-8 mb-2 dark-blue-background light-gray-text welcome-text">
            We’re a community of people who want to work together on cool ideas.{" "}
            Our focus is on web and mobile apps, but we also have a lot of fun
            with games and other projects. We are all about making cool things
            with technology – no matter if you are an experienced developer or
            if you are just starting out.
          </div>
          <div className="col-lg-4 dark-blue-background light-gray-text">
            <h2 className="dark-blue-background light-gray-text text-end welcome-heading">
              Who is <br></br>{" "}
              <span className="orange-text dark-blue-background">
                Co Create Lab
              </span>
              ?
            </h2>
          </div>
        </div>
      </div>

      <div className="light-gray-background dark-blue-text p-3 container-fluid headershadow">
        <div className="row light-gray-background dark-blue-text">
          <div className="col-lg-4  mb-2">
            <h2 className="text-start welcome-heading-dark ">
              What else do we do?
            </h2>
          </div>
          <div className="col-lg-8 mb-2 welcome-text">
            In our free time we organize workshops and training sessions in
            various technical topics like frontend development, fullstack
            development, UX design, design thinking, etc. In the end of every
            workshop we discuss what worked well during the workshop and where
            new topics could be developed in the future. We love to organize
            events where people from all over the world can meet each other and
            enjoy themselves while they learn something new.
          </div>
        </div>
      </div>

      <div className="home-categories-dark card-container w-100 footershadow">
        <div className="light-gray-text dark-blue-background mx-auto width-80">
          <h2 className="light-gray-text pb-4 dark-blue-background text-center">
            Explore awesome ideas and projects
          </h2>
          <Row
            // xs={1}
            sm={2}
            md={3}
            lg={4}
            xl={5}
            className="g-5 dark-blue-background d-flex justify-content-center "
          >
            {categoriesImg?.map((category, i) => (
              <Col key={i} className="dark-blue-background">
                <Link
                  className="category-link"
                  to={`/projects/category/${category.name}`}
                >
                  <Card className="home-card-light shadow-lg">
                    <Card.Body className="home-card-light ">
                      <Card.Title className="dark-blue-text">
                        {category.name}
                      </Card.Title>
                      <div className="">
                        <Card.Img className="home-cardimg" src={category.img} />
                      </div>
                      <Card.Text></Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <div className="dark-blue-text home-categories-light light-gray-background  w-100 footershadow">
        <h2 className="dark-blue-text light-gray-background text-center pb-4">
          Remote Co Creation Lab
        </h2>
        {loadingSpinner ? (
          <Spinner />
        ) : (
          <Row
            xs={1}
            md={3}
            lg={4}
            xl={5}
            className="g-4 light-gray-background m-0 d-flex justify-content-center"
          >
            {filteredProjectsRemoteLimit.map((remote, i) => (
              <Col key={i} className="light-gray-background">
                <Link
                  to={`/projects/${remote._id}`}
                  className="text-decoration-none"
                >
                  <Card className="home-card-dark shadow-lg ">
                    <Card.Body className="home-card-dark ">
                      <Card.Title className="light-gray-text dark-blue-background home-card-title">
                        {remote.project_name}
                      </Card.Title>
                      <div className=" dark-blue-background">
                        <Card.Img
                          className="home-cardimg"
                          src={remotePics[i]}
                        />
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        )}
      </div>
      <div className="home-categories-dark card-container w-100 footershadow">
        <div className="light-gray-text dark-blue-background">
          <h2 className="light-gray-text dark-blue-background text-center pb-4">
            The latest projects
          </h2>
          {loadingSpinner ? (
            <Spinner />
          ) : (
            <Row
              xs={1}
              md={3}
              lg={4}
              xl={5}
              className="g-4 dark-blue-background m-0 d-flex justify-content-center"
            >
              {filteredProjectsNewestLimit.map((newest, i) => (
                <Col key={i} className="dark-blue-background">
                  <Link
                    to={`/projects/${newest._id}`}
                    className="text-decoration-none"
                  >
                    <Card className="home-card-light shadow-lg">
                      <Card.Body className="home-card-light ">
                        <Card.Title className="dark-blue-text light-gray-background home-card-title ">
                          {newest.project_name}
                        </Card.Title>
                        <div className="light-gray-background">
                          <Card.Img
                            className="home-cardimg"
                            src={newestPics[i]}
                          />
                        </div>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>

      <div className="light-gray-background dark-blue-text p-3 container-fluid headershadow">
        <div className="row light-gray-background dark-blue-text">
          <div className="col-lg-4 mb-2">
            <h2 className="text-start welcome-heading-dark ">
              For whom is <br></br>
              <span className="orange-text">Co Create Lab</span> the right place
              to be?
            </h2>
          </div>
          <div className="col-lg-8 mb-2 welcome-text">
            <ul className="home-target-group">
              <li>
                <strong>everyone</strong> with awesome ideas for “a good cause”,
                a business idea, a fun game or whatever
              </li>
              <li>bootcamp students in their final phase</li>
              <li>tech people who want to realize cool projects </li>
              <li>
                tech people who want to gain more experience in tech skills,
                teaching, consulting, mentoring and so on
              </li>
              <li>
                tech people who want to “volunteer” for ideas to: pimp GitHub,
                LinkedIn or just because they love the idea and want to solve
                the given problem
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="dark-blue-background light-gray-text p-3 container-fluid footershadow">
        <div className="row dark-blue-background light-gray-text">
          <div className="col-lg-8 mb-2 dark-blue-background light-gray-text welcome-text scroll-steps steps-scrollbar">
            <div>
              <div className="stepnr">01</div>
              <div className="stepheading">Create your account</div>
              <div className="step-text">
                <a href='/signup' target='blank'>Sign up</a> to Co Create Lab for free in just a few
                seconds. We just need a username, a password and then you're
                already signed in.
              </div>
            </div>
            <div>
              <div className="stepnr">02</div>
              <div className="stepheading">Add your own project or scroll through the pool</div>
              <div className="step-text">
                If you're looking for awesome ideas to realize or projects to
                join, simply click on{" "}
                <a href={"/projects"} target="blank">
                  All Projects
                </a>
                . There you can search and filter by categories, keywords,
                location, start date, whatever. Browse through the world of
                ideas and thoughts, deep dive in the project description, share,
                like, save projects for later and enjoy your time. If you fell in love with an idea,
                contact the creator! <br></br> <br></br>
                If you are looking for co-creators help you to realize your
                idea, add it! Once you're signed in, you can add your fantastic
                idea to the pool. Make sure to take some minutes to find a cool
                and catchy project name as well as a description which explains
                your whole idea, the why, the who, the where - in case you
                already know.
              </div>
            </div>{" "}
            <div>
              <div className="stepnr">03</div>
              <div className="stepheading">Get in touch</div>
              <div className="step-text">
                You found an idea which lets your heart beat faster? <br></br>
                Perfect! <br></br>
                Contact the creator! <br></br> 
                You will find the contact details at the bottom of each project description.
              </div>
            </div>{" "}
            <div>
              <div className="stepnr">04</div>
              <div className="stepheading">Co Create and convert ideas into reality </div>
              <div className="step-text">
                Once you found your co-creator or co-creator-group, enjoy the time building something you love.
              </div>
            </div>
            <div>
              <div className="stepnr">05</div>
              <div className="stepheading">Share your Co Create Lab successes</div>
              <div className="step-text">
                You created something? <br></br>
                You translated an idea into reality? <br></br>
                We're so happy to hear that. We would love to hear from you! <br></br>Please <a href="mailto:cocreate@lab.com">
share </a> your story with us. 
              </div>
            </div>
          </div>
          <div className="col-lg-4 dark-blue-background light-gray-text">
            <h2 className="dark-blue-background light-gray-text text-end welcome-heading">
              Step by Step to <br></br>{" "}
              <span className="orange-text dark-blue-background">
                your own project
              </span>
            </h2>
          </div>
        </div>
      </div>

      <Helmet>
        <meta charSet="utf-8" />
        <title>CoCreateLab - HOME</title>
        <link rel="canonical" href="/" />
      </Helmet>
    </>
  );
}
