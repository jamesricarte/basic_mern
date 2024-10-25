import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {

const[array, setArray] = useState([]);

const addData = async (newData) => {
  try {
    const response = await axios.post( 'http://localhost:5038/api/dbname/addData', {newData} );
    console.log(response.data);
  } catch (error) {
    console.error("Error adding data:", error);
  }
}

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:5038/api/dbname/getData');
    setArray(response.data);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data:" + error);
  }
}

const updateDate = async (id, updateData) => {
  try {
    const response = await axios.put(`http://localhost:5038/api/dbname/updateData/${id}`, {newData} );
    console.log(response.data);
  } catch (error) {
    console.error("Error updating data:", error);
  }
}

const deleteData = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:5038/api/dbnme/deleteData/${id}`);
    console.log(response.data);
  } catch (error) {
    console.error('Error deleting data:', error);
  }
}

useEffect(() => {
  fetchData();
}, [])

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center gap-5">
      <h4 className="text-3xl font-bold">Add Details:</h4>
      <div>
        <input className="border border-gray-400" type="text" />
        <button className="bg-gray-300 border border-black">Add</button>
      </div>

      <table>
        <thead>
          <tr>
            <th> No.</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {array.map((fruit, index) => (
          <tr>
            <td>{index}</td>
            <td key={index}>{fruit}</td>
            <td>
              <button className="bg-gray-300 border border-black">Edit</button>
              <button className="bg-gray-300 border border-black">Delete</button>
            </td>
          </tr>
      ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
