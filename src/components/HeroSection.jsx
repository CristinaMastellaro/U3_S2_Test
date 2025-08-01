const HeroSection = () => {
  return (
    <section
      className="text-center mb-5 p-5 d-flex flex-column justify-content-center"
      style={{
        backgroundImage:
          'url("https://wallpapers.com/images/hd/weather-scenarios-collage-dbk9c5n23l7e5fgb.jpg")',
        backgroundSize: "cover",
        // backgroundPositionY: "-2.5em",
        backgroundPositionY: "center",
        color: "white",
        height: "400px",
      }}
    >
      <div style={{ backgroundColor: "#07081A" }} className="py-3">
        <h1>CriMeteo</h1>
        <h4 className="fw-normal">
          Previsioni del meteo sempre disponibili, per qualunque luogo
        </h4>
      </div>
    </section>
  );
};

export default HeroSection;
