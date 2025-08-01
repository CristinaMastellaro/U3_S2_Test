import "../css/HeroSection.css";

const HeroSection = () => {
  return (
    <section
      className="text-center mb-5 p-5 d-flex flex-column justify-content-center"
      id="heroSection"
    >
      <div className="py-3" id="containerTitle">
        <h1>TreCriMeteo</h1>
        <h4 className="fw-normal">
          Previsioni del meteo sempre disponibili
          <br /> per qualunque luogo, in qualunque luogo
        </h4>
      </div>
    </section>
  );
};

export default HeroSection;
