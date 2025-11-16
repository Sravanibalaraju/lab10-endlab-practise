import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewPets.css";

function ViewPets() {
  const [pets, setPets] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    species: "",
    age: "",
    healthStatus: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const API_URL = "http://localhost:2026/api/pets";

  // Fetch all pets from backend
  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const res = await axios.get(API_URL);
      setPets(res.data);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (pet) => {
    setFormData(pet);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchPets();
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${formData.id}`, formData);
      setFormData({ id: "", name: "", species: "", age: "", healthStatus: "" });
      setIsEditing(false);
      fetchPets();
    } catch (error) {
      console.error("Error updating pet:", error);
    }
  };

  return (
    <div className="viewpets-container">
      <h1>All Pets 🐾</h1>

      {isEditing && (
        <form onSubmit={handleUpdate} className="edit-form">
          <h2>Edit Pet</h2>
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
          <button type="submit">Update Pet</button>
        </form>
      )}

      <div className="viewpets-list">
        {pets.map((pet) => (
          <div className="viewpet-card" key={pet.id}>
            <h3>{pet.name}</h3>
            <p>Species: {pet.species}</p>
            <p>Age: {pet.age}</p>
            <p>Health: {pet.healthStatus}</p>
            <div className="card-buttons">
              <button className="edit-btn" onClick={() => handleEdit(pet)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(pet.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewPets;
