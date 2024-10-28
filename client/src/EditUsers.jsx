import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const API_URL = "http://localhost:3000/users";

const EditUsers = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", age: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${id}`, user);
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
      <div className="w-full h-[100vh] flex flex-col justify-center items-center gap-5">
        <h4 className="text-3xl font-bold">Edit User</h4>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <input
            className="border border-gray-400"
            type="text"
            name="name"
            placeholder="Name"
            value={user.name}
            onChange={handleChange}
          />
          <input
            className="border border-gray-400"
            type="text"
            name="age"
            placeholder="Age"
            value={user.age}
            onChange={handleChange}
          />
          <button type="submit" className="bg-gray-300 border border-black">
            Update
          </button>
        </form>

        <Link to={"/"}>Back to Home</Link>
      </div>
    </>
  );
};

export default EditUsers;
