import { Helmet } from "react-helmet";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import axiosClient from "../axiosClient";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Texteditor from "./Texteditor";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";

export default function CreateAProject({
  project,
  isClickedEdit,
  setIsClickedEdit,
}) {
  const [project_name, setName] = useState(`${project.project_name}`);
  const [description, setDescription] = useState(`${project.description}`);
  const [locationHelper, setLocationHelper] = useState("remote");
  const [location, setLocation] = useState("remote");
  const [startDateHelper, setStartDateHelper] = useState("open");
  const [start_date, setStartDate] = useState("open");
  const [tech_stack, setTechStack] = useState([]);
  const [categories, setCategory] = useState([]);
  const [newProjectId, setNewProjectId] = useState("");
  const [autocompleteCities, setAutocompleteCities] = useState([]);
  const [autocompleteErr, setAutocompleteErr] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
    setDescription(convertedContent);
  }, [editorState]);

  const fetchPlace = async (text) => {
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${process.env.REACT_APP_API_KEY}&cachebuster=1625641871908&autocomplete=true&types=place`
      );
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    } catch (err) {
      return { error: "Unable to retrieve places" };
    }
  };

  const handleCityChange = async (e) => {
    setLocation(e.target.value);
    if (!location) return;

    const res = await fetchPlace(location);
    !autocompleteCities.includes(e.target.value) &&
      res.features &&
      setAutocompleteCities(res.features.map((place) => place.place_name));
    res.error ? setAutocompleteErr(res.error) : setAutocompleteErr("");
  };

  const handleOnChangeName = (e) => {
    setName(e.target.value);
  };

  const handleOnChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleOnChangeLocationHelper = (e) => {
    setLocationHelper(e.target.value);
    setLocation(e.target.value);
  };

  const handleOnChangeStartDate = (e) => {
    setStartDateHelper(e.target.value);
    if (start_date.length > 1 && startDateHelper === "specific date") {
      setStartDate("open");
    } else {
    }
  };

  const handleOnChangeSpecificDate = (e) => {
    setStartDate(`${e.target.value}T00:42:15.714Z`);
  };

  const tech_stack_options = [
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "Databases", label: "Databases" },
    { value: "NodeJS", label: "NodeJS" },
    { value: "ExpressJS", label: "ExpressJS" },
    { value: "ReactJS", label: "ReactJS" },
  ];
  const handleOnChangeTechStack = (tech_stack_options) => {
    setTechStack(
      [].slice
        .call(tech_stack_options)
        .map((tech_stack_option) => tech_stack_option.value)
    );
  };

  const options = [
    { value: "Games", label: "Games" },
    { value: "Sports", label: "Sports" },
    { value: "Business", label: "Business" },
    { value: "Community", label: "Community" },
    { value: "Social", label: "Social" },
    { value: "Education", label: "Education" },
    { value: "Culture", label: "Culture" },
    { value: "Media", label: "Media" },
    { value: "Nature", label: "Nature" },
    { value: "Technology", label: "Technology" },
  ];

  const onSelectedOptionsChange = (options) => {
    setCategory([].slice.call(options).map((option) => option.value));
  };

  const customStyles = {
    option: (base, state) => ({
      ...base,
      backgroundColor: "#ffffff",
      cursor: "pointer",
    }),
    menuList: (base, state) => ({
      ...base,
      backgroundColor: "#ffffff",
      cursor: "pointer",
      zIndex: "auto",
      position: "relative",
    }),
    valueContainer: (base, state) => ({
      ...base,
      backgroundColor: "#ffffff",
    }),
    menu: (base, state) => ({
      ...base,
      backgroundColor: "#ffffff",
      zIndex: "auto",
      position: "relative",
    }),
    input: (base, state) => ({
      ...base,
      backgroundColor: "#ffffff",
    }),
    clearIndicator: (base, state) => ({
      ...base,
      backgroundColor: "#ffffff",
      cursor: "pointer",
    }),

    indicatorsContainer: (base, state) => ({
      ...base,
      backgroundColor: "#ffffff",
      cursor: "pointer",
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      backgroundColor: "#ffffff",
      cursor: "pointer",
    }),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosClient
      .post("/projects", {
        project_name,
        description,
        categories,
        location,
        start_date,
        tech_stack,
      })
      .then((response) => {
        setNewProjectId(response.data._id);
        setIsClickedEdit(false);
      })
      .catch((err) => {
        console.log(err);
        navigate("/404");
      })
      .finally(() => {
        document.getElementById("createAProject").reset();
      });
  };

  const handlereset = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="container border border-secondary ">
        <div className="mt-2 orangeText">
          <h3 className="pe-3 mb-4">Edit this project </h3>
        </div>
        <div className="create_project">
          <Form onSubmit={handleSubmit} id="createAProject" className="">
            <Row className="mb-3">
              <Form.Group controlId="projectname">
                <Form.Label className="">
                  Project Name
                  <OverlayTrigger
                    placement="right"
                    className="bg-light"
                    overlay={
                      <Tooltip id="create_tooltip" className="tooltip">
                        Add a short but interesting name for your projects which
                        summarizes your idea for other users
                      </Tooltip>
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="bi bi-question-circle questionmarkicon "
                      viewBox="0 0 16 16"
                      id="tooltip_questionmarkicon"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                    </svg>
                  </OverlayTrigger>
                </Form.Label>
                <Form.Control
                  onChange={handleOnChangeName}
                  value={project_name}
                  required
                  placeholder="Add a catchy project name"
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>
                Description
                <OverlayTrigger
                  placement="right"
                  className="bg-light"
                  value={description}
                  overlay={
                    <Tooltip id="create_tooltip" className="tooltip">
                      Describe your idea in detail. What do you want to build?
                      Why? What's the goal and the purpose?
                    </Tooltip>
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="bi bi-question-circle questionmarkicon "
                    viewBox="0 0 16 16"
                    id="tooltip_questionmarkicon"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                  </svg>
                </OverlayTrigger>
              </Form.Label>
              <Texteditor
                editorState={editorState}
                setEditorState={setEditorState}
              />
              {/* <Form.Control
              placeholder="Describe your awesome idea"
              as="textarea"
              rows={5}
              required
              onChange={handleOnChangeDescription}
            /> */}
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="location">
                <Form.Label>
                  Location
                  <OverlayTrigger
                    placement="right"
                    className="bg-light"
                    overlay={
                      <Tooltip id="create_tooltip" className="tooltip">
                        If it's important for you to find co-creators in your
                        city to meet in person as well, you can enter your
                        location here. Or leave it to remote.
                      </Tooltip>
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="bi bi-question-circle questionmarkicon "
                      viewBox="0 0 16 16"
                      id="tooltip_questionmarkicon"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                    </svg>
                  </OverlayTrigger>
                </Form.Label>
                <Form.Select
                  aria-label="location"
                  onChange={handleOnChangeLocationHelper}
                >
                  <option value="remote">Remote</option>
                  <option value="onsite">Onsite</option>
                </Form.Select>
              </Form.Group>
              {locationHelper === "onsite" && (
                <Form.Group as={Col} controlId="city">
                  <Form.Label>
                    City
                    {autocompleteErr && (
                      <span className="inputError">{autocompleteErr}</span>
                    )}
                  </Form.Label>

                  <Form.Control
                    list="places"
                    type="text"
                    name="city"
                    onChange={handleCityChange}
                    required
                    pattern={autocompleteCities.join("|")}
                    autoComplete="off"
                    placeholder="Choose a city"
                  ></Form.Control>

                  <datalist id="places">
                    {autocompleteCities.map((city, i) => (
                      <option key={i}>{city}</option>
                    ))}
                  </datalist>
                </Form.Group>
              )}
            </Row>

            <Row className="mb-3">
              <Form.Group className="mb-3" as={Col} controlId="start_date">
                <Form.Label>
                  Project Start
                  <OverlayTrigger
                    placement="right"
                    className="bg-light"
                    overlay={
                      <Tooltip id="create_tooltip" className="tooltip">
                        Do you have a specific date when to start the project or
                        it doesn't matter?
                      </Tooltip>
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="bi bi-question-circle questionmarkicon "
                      viewBox="0 0 16 16"
                      id="tooltip_questionmarkicon"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                    </svg>
                  </OverlayTrigger>
                </Form.Label>
                <Form.Select
                  aria-label="Location"
                  onChange={handleOnChangeStartDate}
                >
                  <option value="open">Open</option>
                  <option value="specific date">Specific Date</option>
                </Form.Select>
              </Form.Group>

              {startDateHelper === "specific date" && (
                <Form.Group as={Col} controlId="specific_start_date">
                  <Form.Label>Choose a date</Form.Label>
                  <Form.Control
                    type="date"
                    onChange={handleOnChangeSpecificDate}
                    required
                  ></Form.Control>
                </Form.Group>
              )}
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="tech_stack" className="">
                <Form.Label>
                  Tech Stack
                  <OverlayTrigger
                    placement="right"
                    className="bg-light"
                    overlay={
                      <Tooltip id="create_tooltip" className="tooltip">
                        If you already know which technical skills your
                        co-creators should have, you can enter it here. If you
                        do not know anything about tech, don't worry, just leave
                        it blank.
                      </Tooltip>
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="bi bi-question-circle questionmarkicon "
                      viewBox="0 0 16 16"
                      id="tooltip_questionmarkicon"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                    </svg>
                  </OverlayTrigger>
                </Form.Label>
                <Select
                  options={tech_stack_options}
                  isMulti
                  name="tech_stack"
                  className="tech_stack"
                  classNamePrefix="tech_stack.select"
                  onChange={handleOnChangeTechStack}
                  styles={customStyles}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="categories" className="">
                <Form.Label>
                  Category
                  <OverlayTrigger
                    placement="right"
                    className="bg-light"
                    overlay={
                      <Tooltip id="create_tooltip" className="tooltip">
                        In which categories does your idea fit? You can select
                        as many categories as you like. If one important
                        category is missing, let us know!
                      </Tooltip>
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="bi bi-question-circle questionmarkicon "
                      viewBox="0 0 16 16"
                      id="tooltip_questionmarkicon"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                    </svg>
                  </OverlayTrigger>
                </Form.Label>
                <Select
                  options={options}
                  isMulti
                  name="categories"
                  className="categories"
                  classNamePrefix="select"
                  onChange={onSelectedOptionsChange}
                  styles={customStyles}
                />
              </Form.Group>
            </Row>
            <div className="d-flex justify-content-between pt-2">
              <Button
                type="reset"
                value="Reset"
                className="btn resetbutton bg-light"
                onClick={handlereset}
              >
                Reset
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="btn submitbutton"
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Create A Project|CoCreateLab</title>
        <link rel="canonical" href="/createproject" />
      </Helmet>
    </>
  );
}