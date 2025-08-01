import { useNavigate, useParams } from "react-router-dom";
import "../css/MeteoCard.css";
import { useEffect, useState } from "react";
import { Button, Badge, Container, Row, Col, Card } from "react-bootstrap";

const Details = () => {
  const params = useParams();
  //   console.log("params", params);
  let name;
  let iso;
  let saved;
  if (params.infoCity.includes("-")) {
    name = params.infoCity.split("-")[0];
    iso = params.infoCity.split("-")[1];
    saved = params.infoCity.split("-")[2];
  } else {
    name = params.infoCity.split(",")[0];
    iso = params.infoCity.split(",")[1];
    saved = params.infoCity.split(",")[2];
  }
  const newCityInfo = name + "," + iso;

  const [infoMeteo, setInfoMeteo] = useState({});
  const [infoImage, setInfoImage] = useState({});
  const [appear, setAppear] = useState(false);
  const [alreadySaved, setAlreadySaved] = useState(saved === "true");

  const navigate = useNavigate();

  const endpointWeather = `https://api.openweathermap.org/data/2.5/weather?q=${name},${iso}&appid=f228e9b0d515a68c7300a9852019e205`;
  const getWeather = () => {
    fetch(endpointWeather)
      .then((res) => {
        if (res.ok) {
          // console.log("infoCity", infoCity);
          return res.json();
        } else {
          throw new Error("Non siamo riusciti a contattare l'API");
        }
      })
      .then((data) => {
        // console.log("data", data);
        setInfoMeteo(data.main);
        setInfoImage(data.weather[0]);
      })
      .catch((err) => console.log("Errore!", err));
  };

  const [infoForecast, setInfoForecast] = useState({});
  //   console.log("infoForecast", infoForecast);
  let dates = [];

  const endpointForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${name},${iso}&appid=f228e9b0d515a68c7300a9852019e205`;
  const getForecast = () => {
    fetch(endpointForecast)
      .then((res) => {
        if (res.ok) {
          // console.log("infoCity", infoCity);
          return res.json();
        } else {
          throw new Error("Non siamo riusciti a contattare l'API");
        }
      })
      .then((data) => {
        console.log("data", data.list[0]);
        setInfoForecast(data.list);
        console.log("infoForecast", infoForecast[0]);
        infoForecast.forEach((single) => {
          if (!dates.includes(single.dt_txt.split(" ")[0])) {
            dates.push(single.dt_txt.split(" ")[0]);
          }
        });
        console.log("dates", dates);

        // infoForecast.forEach((s) => console.log(s.dt));
      })
      .catch((err) => console.log("Errore!", err));
  };

  useEffect(() => {
    getWeather();
    getForecast();
  }, []);

  return (
    <section className="m-5 d-flex flex-column align-items-center">
      <div
        className={`${infoImage.main}`}
        style={{ height: "200px", width: "100%" }}
      ></div>
      <h1 className="my-5">{name}</h1>
      <div>
        <div>
          <p>
            <span className="fw-bold">Weather: </span>
            {infoImage.description}
          </p>
        </div>
        <div>
          <p>
            <span className="fw-bold">Temperature: </span>
            {(infoMeteo.temp - 273.15).toFixed(1)}°C
          </p>
          <span className="fw-bold">Felt temperature: </span>
          {(infoMeteo.feels_like - 273.15).toFixed(1)}°C <br />
          <span className="fw-bold">Min temperature: </span>
          {(infoMeteo.temp_min - 273.15).toFixed(1)}°C <br />
          <span className="fw-bold">Max temperature: </span>
          {(infoMeteo.temp_max - 273.15).toFixed(1)}°C
        </div>
        <div className="my-5">
          <h5 className="mb-3">Other info</h5>
          <div>
            <p>
              <span className="fw-bold">Humidity</span>: {infoMeteo.humidity}{" "}
              g/m^3
            </p>
            <p>
              <span className="fw-bold">Pressure</span>: {infoMeteo.pressure} Pa
            </p>
            <p>
              <span className="fw-bold">Sea level</span>: {infoMeteo.sea_level}{" "}
              m
            </p>
          </div>
        </div>
      </div>
      {/* {!alreadySaved && (
        <Button
          variant="primary"
          className="align-self-center"
          onClick={() => {
            setAlreadySaved(true);
            setAppear(true);
            // console.log("infoCity", infoCity);
            // changeStateCities(infoCity);
            navigate("/" + newCityInfo);
          }}
        >
          Salva città
        </Button>
      )}

      {appear && (
        <Button variant="success" className="align-self-center px-3">
          Salvato!
        </Button>
      )} */}
      <Container>
        <Row>
          <h1>Previsioni future</h1>
          {infoForecast[0] &&
            infoForecast.map((info) => {
              return (
                <Col xs={12} sm={6} md={4} lg={3} key={info.dt_txt}>
                  <Card>
                    <Card.Img className={info.weather[0].main} />
                    <Card.Body>
                      <Card.Title>{info.dt_txt.split(" ")[0]}</Card.Title>
                      <Card.Text>{info.dt_txt.split(" ")[1]}</Card.Text>
                      <Card.Text>
                        <span className="fw-bold">Weather</span>:{" "}
                        {info.weather[0].description}
                      </Card.Text>
                      <Card.Text>
                        <span className="fw-bold">Min temperature: </span>
                        {(info.main.temp_min - 273.15).toFixed(1)}°C <br />
                        <span className="fw-bold">Max temperature: </span>
                        {(info.main.temp_max - 273.15).toFixed(1)}°C
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>

        {/* {infoForecast[0] &&
          dates.map((date) => {
            console.log("Sono dentro dates!");
            return (
              <Row>
                <h3>{date}</h3>
                {infoForecast.map((info) => {
                  if (info.dt_txt.split(" ")[0] === date) {
                    return (
                      <Col xs={12} sm={6} md={4} lg={3} key={info.dt_txt}>
                        <Card>
                          <Card.Img className={info.weather[0].main} />
                          <Card.Body>
                            <Card.Title>{info.dt_txt.split(" ")[0]}</Card.Title>
                            <Card.Text>{info.dt_txt.split(" ")[1]}</Card.Text>
                            <Card.Text>
                              <span className="fw-bold">Weather</span>:{" "}
                              {info.weather[0].description}
                            </Card.Text>
                            <Card.Text>
                              <span className="fw-bold">Min temperature: </span>
                              {(info.main.temp_min - 273.15).toFixed(1)}°C{" "}
                              <br />
                              <span className="fw-bold">Max temperature: </span>
                              {(info.main.temp_max - 273.15).toFixed(1)}°C
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  } else {
                    return <h2>Ciao</h2>;
                  }
                })}
              </Row>
            );
          })} */}
      </Container>
    </section>
  );
};

export default Details;
