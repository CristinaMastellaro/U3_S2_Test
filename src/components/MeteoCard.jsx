import { useEffect, useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import "../css/MeteoCard.css";
import { useNavigate } from "react-router-dom";

const MeteoCard = ({ infoCity, saved, changeStateCities }) => {
  // const MeteoCard = (props) => {
  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${infoCity[0]},${infoCity[1]}&appid=f228e9b0d515a68c7300a9852019e205`;

  const [infoMeteo, setInfoMeteo] = useState({});
  const [infoImage, setInfoImage] = useState({});
  const [appear, setAppear] = useState(false);
  const [alreadySaved, setAlreadySaved] = useState(saved);

  const navigate = useNavigate();

  const getForecast = () => {
    fetch(endpoint)
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
        console.log("infoMeteo", infoMeteo);
        console.log("infoImage", infoImage);
      })
      .catch((err) => console.log("Errore!", err));
  };

  useEffect(() => {
    getForecast();
  }, [infoCity[0]]);

  return (
    <>
      <Card
        className="my-4"
        onClick={() => {
          navigate("/details/" + infoCity.join("-") + "-" + infoImage.main);
        }}
      >
        {/* <Card className={backgroundImage}> */}
        <Card.Img className={infoImage.main} />
        <Card.Body className="d-flex flex-column justify-content-between my-2 p-3">
          <div>
            <Card.Title className="mb-5 text-center">{infoCity[0]}</Card.Title>
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
          {!alreadySaved && (
            <Button
              variant="primary"
              className="align-self-center"
              onClick={() => {
                setAlreadySaved(true);
                setAppear(true);
                console.log("infoCity", infoCity);
                // changeStateCities(infoCity);
                navigate("/");
              }}
            >
              Salva città
            </Button>
          )}

          {appear && (
            <Button variant="success" className="align-self-center px-3">
              Salvato!
            </Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default MeteoCard;

// Clear, Rain, Clouds
