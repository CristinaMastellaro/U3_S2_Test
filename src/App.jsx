import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CNavbar from "./components/CNavbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Details from "./components/Details";

function App() {
  return (
    <BrowserRouter>
      <CNavbar />
      <Routes>
        <Route path="/:info" element={<Homepage />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/details/:infoCity" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
