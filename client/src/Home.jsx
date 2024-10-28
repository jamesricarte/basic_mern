import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3000/users";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", age: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const addUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, newUser);
      fetchUsers();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <>
      <div className="w-full h-[100vh] flex flex-col justify-center items-center gap-5">
        <h4 className="text-3xl font-bold">Users:</h4>
        <form className="flex flex-col items-center gap-2" onSubmit={addUser}>
          <div className="flex flex-col gap-2">
            <input
              className="border border-gray-400"
              type="text"
              name="name"
              placeholder="name"
              value={newUser.name}
              onChange={handleChange}
            />
            <input
              className="border border-gray-400"
              type="text"
              name="age"
              placeholder="age"
              value={newUser.age}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="bg-gray-300 border border-black w-full"
          >
            Add
          </button>
        </form>

        <table>
          <thead>
            <tr>
              <th> No.</th>
              <th>Name</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}. </td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td className="flex gap-2">
                  <Link to={`/edit/${user._id}`}>
                    <button className="bg-gray-300 border border-black">
                      Edit
                    </button>
                  </Link>
                  <button
                    className="bg-gray-300 border border-black"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
