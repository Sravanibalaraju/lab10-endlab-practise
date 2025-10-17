import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PetList from "./components/PetList";
import ViewPets from "./components/ViewPets";

function App() {
  return (
    <Router>
      <nav style={{ margin: "20px" }}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/view-pets">View All Pets</Link>
      </nav>

      <Routes>
        <Route path="/" element={<PetList />} />
        <Route path="/view-pets" element={<ViewPets />} />
      </Routes>
    </Router>
  );
}

export default App;
