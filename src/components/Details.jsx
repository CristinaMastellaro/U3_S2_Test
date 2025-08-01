import { useParams, Link } from "react-router-dom";
import "../css/MeteoCard.css";
import { useEffect, useState } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";

const Details = () => {
  const params = useParams();
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
  const newCityInfo = name + "-" + iso;

  const [infoMeteo, setInfoMeteo] = useState({});
  const [infoImage, setInfoImage] = useState({});
  const [appear, setAppear] = useState(false);
  const [alreadySaved, setAlreadySaved] = useState(saved === "true");
  const [isRemoved, setIsRemoved] = useState(false);

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
  const [dates, setDates] = useState([]);

  const endpointForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${name},${iso}&appid=f228e9b0d515a68c7300a9852019e205`;

  const getForecast = () => {
    fetch(endpointForecast)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Non siamo riusciti a contattare l'API");
        }
      })
      .then((data) => {
        setInfoForecast(data.list);
        let singleDates = dates;

        data.list.map((single) => {
          if (!singleDates.includes(single.dt_txt.split(" ")[0])) {
            singleDates.push(single.dt_txt.split(" ")[0]);
          }
        });
        setDates(singleDates);
      })
      .catch((err) => console.log("Errore!", err));
  };

  useEffect(() => {
    getWeather();
    getForecast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <p className="mb-0">
              <span className="fw-bold">Humidity</span>: {infoMeteo.humidity}{" "}
              g/m^3
            </p>
            <p className="mb-0">
              <span className="fw-bold">Pressure</span>: {infoMeteo.pressure} Pa
            </p>
            <p>
              <span className="fw-bold">Sea level</span>: {infoMeteo.sea_level}{" "}
              m
            </p>
          </div>
        </div>
      </div>
      {!alreadySaved && (
        <Button
          variant="primary"
          className="align-self-center mb-2"
          onClick={() => {
            setAlreadySaved(true);
            setAppear(true);
            let cities = localStorage.getItem("cityNames").split(",");
            console.log("newCityInfo", newCityInfo);
            cities.push(newCityInfo);
            console.log("cities", cities);
            localStorage.setItem("cityNames", cities);
            setIsRemoved(false);
          }}
        >
          Salva città
        </Button>
      )}
      {alreadySaved && !isRemoved && (
        <Button
          variant="danger"
          className="align-self-center mb-2"
          onClick={() => {
            let initialCities = localStorage.getItem("cityNames").split(",");
            let index = initialCities.indexOf(name + "-" + iso);
            initialCities.splice(index, 1);
            localStorage.setItem("cityNames", initialCities);
            setIsRemoved(true);
            setAlreadySaved(false);
            setAppear(false);
          }}
        >
          Rimuovi
        </Button>
      )}

      {isRemoved && (
        <Button variant="success" className="align-self-center px-3">
          Rimosso
        </Button>
      )}
      {appear && (
        <Link
          to="/"
          className="align-self-center px-3 bg-success text-decoration-none text-white text-center rounded-2 py-2"
        >
          Salvato! <br /> Torna in Homepage
        </Link>
      )}
      <Container>
        <h1>Previsioni future</h1>

        {infoForecast[0] &&
          dates.map((date) => {
            return (
              <Row key={date} className="my-4">
                <h3>{date}</h3>
                {infoForecast.map((info) => {
                  if (info.dt_txt.split(" ")[0] == date) {
                    return (
                      <Col
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        key={info.dt_txt}
                        className="my-2"
                      >
                        <Card>
                          <Card.Img className={info.weather[0].main} />
                          <Card.Body>
                            <Card.Title>{info.dt_txt.split(" ")[1]}</Card.Title>
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
                  }
                })}
              </Row>
            );
          })}
      </Container>
    </section>
  );
};

export default Details;
