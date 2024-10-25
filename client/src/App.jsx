import React from "react";

const App = () => {
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
          <tr>
            <td>1.</td>
            <td>Anything</td>
            <td>
              <button className="bg-gray-300 border border-black">Edit</button>
              <button className="bg-gray-300 border border-black">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default App;
