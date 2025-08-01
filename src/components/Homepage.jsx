import { Form, Container, Row, Col } from "react-bootstrap";
import HeroSection from "./HeroSection";
import MeteoCard from "./MeteoCard";
import { useState } from "react";
import "../css/homepage.css";

const Homepage = () => {
  const [cityNames, setCityNames] = useState([
    ["Kamakura", "JP"],
    ["Torino", "IT"],
    ["Dublino", "IE"],
    ["Venezia", "IT"],
    ["Cebu", "PHL"],
  ]);

  const [input, setInput] = useState("");
  const [cerca, setCerca] = useState("");

  const changeStateCities = (newCity) => {
    console.log("cityNamesFirst", cityNames);
    setCityNames(cityNames.push(newCity));
    console.log("cityNames", cityNames);
  };

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
            setCerca(input.split(", "));
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
        {cerca && (
          <Row className="mb-5 pb-5 border-bottom">
            <Col xs={12}>
              <MeteoCard
                infoCity={cerca}
                saved={false}
                changeStateCities={changeStateCities}
              />
            </Col>
          </Row>
        )}
        <Row>
          {cityNames.map((name) => (
            <Col xs={12} md={4} lg={3} key={name}>
              <MeteoCard
                infoCity={name}
                saved={true}
                changeStateCities={changeStateCities}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Homepage;
