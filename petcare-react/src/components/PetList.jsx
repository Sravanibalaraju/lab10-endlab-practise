import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PetList.css"; // Keep your old CSS for this page

function PetList() {
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    age: "",
    healthStatus: "",
  });

  const API_URL = "http://localhost:2026/api/pets";
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      setFormData({ name: "", species: "", age: "", healthStatus: "" });
      alert("Pet added successfully!");
    } catch (error) {
      console.error("Error adding pet:", error);
    }
  };

  const handleViewAll = () => {
    navigate("/view-pets"); // Redirect to ViewPets page
  };

  return (
    <div className="container">
      <header className="header">
        <h1>🐾 Add a Pet This is Our PETAPP</h1>
        <p>Fill in the details to add a new pet</p>
      </header>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Pet Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <select
          name="species"
          value={formData.species}
          onChange={handleChange}
          required
        >
          <option value="">Select Species</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Bird">Bird</option>
        </select>
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="healthStatus"
          placeholder="Health Status"
          value={formData.healthStatus}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Pet</button>
      </form>

      <button className="view-all-btn" onClick={handleViewAll}>
        View All Pets
      </button>
    </div>
  );
}

export default PetList;
