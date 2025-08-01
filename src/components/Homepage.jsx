import { Form, Container, Row, Col } from "react-bootstrap";
import HeroSection from "./HeroSection";
import MeteoCard from "./MeteoCard";
import { useEffect, useState } from "react";
import "../css/homepage.css";
import { useNavigate, useParams } from "react-router-dom";

const Homepage = () => {
  let initialCities = localStorage.getItem("cityNames").split(",") || [
    "Kamakura-JP",
    "Torino-IT",
    "Dublino-IE",
    "Venezia-IT",
    "Cebu-PHL",
  ];

  // console.log("initialCities", initialCities);
  const [cityNames, setCityNames] = useState(initialCities);
  // let location = useLocation();
  // "Cebu-PHL"[("Kamakura", "JP")],
  // ["Torino", "IT"],
  // ["Dublino", "IE"],
  // ["Venezia", "IT"],
  // ["Cebu", "PHL"],
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [cerca, setCerca] = useState("");

  let change;

  const changeStateCities = (newCities) => {
    setCityNames(newCities);
    localStorage.setItem("cityNames", newCities);
  };
  // console.log("cityNamesFirst", cityNames);
  // let citiesAlreadyPresent = cityNames;
  // citiesAlreadyPresent.push(newCity);
  // localStorage.setItem("cityNames", citiesAlreadyPresent);
  // setCityNames(citiesAlreadyPresent);
  // console.log("citiesAlreadyPresent", citiesAlreadyPresent);

  const params = useParams();
  // console.log("params", params);
  // console.log("params", params.length);
  useEffect(() => {
    let newCityArray;
    if (params.info) {
      newCityArray = params.info;
      let newCity = cityNames;

      if (!cityNames.includes(newCityArray)) {
        newCity.push(newCityArray);
        // console.log("newCity", newCity);
        if (typeof cityNames === "string") {
          newCity = cityNames.split(",");
        }
        changeStateCities(newCity);
        // console.log("cityNames", cityNames);
      }

      // console.log(
      //   "cityNames.includes(newCityArray)",
      //   cityNames.includes(newCityArray),
      //   "newCityArray",
      //   newCityArray,
      //   "cityNames",
      //   cityNames
      // );
    }
  }, [initialCities]);

  return (
    <section className="">
      <HeroSection />
      <div className="d-flex align-items-center justify-content-center mt-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            change = input.split(", ");
            change.push("false");
            change.join(",");
            setCerca(change);
            navigate("/details/" + change);
          }}
        >
          <Form.Control
            type="text"
            placeholder="Località, PAESE"
            className="ms-3"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
        </Form>
      </div>
      <Container className="mt-5 backgroundRow" fluid>
        <h1 className="text-center">I tuoi preferiti</h1>
        {cerca && (
          <Row className="mb-5 pb-5 border-bottom">
            <Col xs={12}>
              <MeteoCard
                infoCity={cerca}
                saved={false}
                changeStateCities={changeStateCities}
                // cityNames={cityNames}
              />
            </Col>
          </Row>
        )}
        <Row>
          {cityNames.map((name) => {
            // console.log("name", name);
            let nameCity = name.split("-")[0];
            let iso = name.split("-")[1];
            // console.log("name", name);
            return (
              <Col xs={12} md={4} lg={3} key={name}>
                <MeteoCard
                  infoCity={[nameCity, iso]}
                  saved={true}
                  changeStateCities={changeStateCities}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default Homepage;
