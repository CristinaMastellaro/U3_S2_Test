import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CNavbar from "./components/CNavbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";

function App() {
  return (
    <BrowserRouter>
      <CNavbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
