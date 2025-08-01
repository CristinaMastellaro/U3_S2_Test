import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import "../css/MeteoCard.css";
import { useNavigate } from "react-router-dom";

const MeteoCard = ({ infoCity, saved, changeStateCities }) => {
  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${infoCity[0]},${infoCity[1]}&appid=f228e9b0d515a68c7300a9852019e205`;

  const [name, iso] = infoCity;
  const [infoMeteo, setInfoMeteo] = useState({});
  const [infoImage, setInfoImage] = useState({});

  const navigate = useNavigate();

  const getForecast = () => {
    fetch(endpoint)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Non siamo riusciti a contattare l'API");
        }
      })
      .then((data) => {
        setInfoMeteo(data.main);
        setInfoImage(data.weather[0]);
      })
      .catch((err) => console.log("Errore!", err));
  };

  useEffect(() => {
    getForecast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoCity[0]]);

  return (
    <>
      <Card className="my-4">
        <div
          onClick={() => {
            navigate("/details/" + name + "-" + iso + "-" + saved);
          }}
        >
          <Card.Img className={infoImage.main} />
          <Card.Body className="d-flex flex-column justify-content-between my-2 p-3">
            <div>
              <Card.Title className="mb-4 text-center">{name}</Card.Title>
              <Card.Text>
                <span className="fw-bold">Weather: </span>
                {infoImage.description}
              </Card.Text>
              <Card.Text>
                <span className="fw-bold">Temperature: </span>
                {(infoMeteo.temp - 273.15).toFixed(1)}°C
              </Card.Text>
              <Card.Text>
                <span className="fw-bold">Min temperature: </span>
                {(infoMeteo.temp_min - 273.15).toFixed(1)}°C <br />
                <span className="fw-bold">Max temperature: </span>
                {(infoMeteo.temp_max - 273.15).toFixed(1)}°C
              </Card.Text>
            </div>
          </Card.Body>
        </div>
        <Button
          variant="danger"
          className="align-self-center mb-2"
          onClick={() => {
            let initialCities = localStorage.getItem("cityNames").split(",");
            let index = initialCities.indexOf(name + "-" + iso);
            initialCities.splice(index, 1);
            changeStateCities(initialCities);
            localStorage.setItem("cityNames", initialCities);
          }}
        >
          Rimuovi
        </Button>
      </Card>
    </>
  );
};

export default MeteoCard;
