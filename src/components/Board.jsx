import React, { useState, useEffect } from "react";
import axios from "axios";
import bgImage from "../board.png";
const API = process.env.REACT_APP_API_URL || "http://localhost:5000";
function Board() {
  const [activities, setActivities] = useState([]);
  const [input, setInput] = useState({ title: "", details: "" });
  const [editId, setEditId] = useState(null);

  const fetchActivities = async () => {
    try {
      const res = await axios.get(`${API}/activities`);
      setActivities(res.data);
    } catch (err) {
      console.error("Error fetching activities:", err);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      try {
        const res = await axios.put(
          `${API}/activities/${editId}`,
          input
        );
        alert(res.data.message);
        setInput({ title: "", details: "" });
        setEditId(null);
        fetchActivities();
      } catch (err) {
        console.error("Error updating activity:", err);
      }
    } else {
      try {
        const res = await axios.post(`${API}/activities`, input);
        alert(res.data.message);
        setInput({ title: "", details: "" });
        fetchActivities();
      } catch (err) {
        console.error("Error adding activity:", err);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${API}/activities/${id}`);
      alert(res.data.message);
      fetchActivities();
    } catch (err) {
      console.error("Error deleting activity:", err);
    }
  };

  const handleEdit = (activity) => {
    setEditId(activity.id);
    setInput({ title: activity.title, details: activity.details });
  };

  const handleCancel = () => {
    setEditId(null);
    setInput({ title: "", details: "" });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-8"
     style={{
    backgroundImage: `url(${bgImage})`,
  }}
    >
      <div className="min-h-screen bg-black/40 p-8">
        <h1 className="text-3xl font-bold mb-4 text-center text-white">Dashboard</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6 max-w-2xl mx-auto bg-white/80 p-4 rounded shadow">
          <input
            type="text"
            name="title"
            placeholder="Activity Name"
            value={input.title}
            onChange={(e) => setInput({ ...input, title: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="details"
            placeholder="Details"
            value={input.details}
            onChange={(e) => setInput({ ...input, details: e.target.value })}
            className="p-2 border rounded"
          />
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 flex-1">
              {editId ? "Update Activity" : "Add Activity"}
            </button>
            {editId && (
              <button type="button" onClick={handleCancel} className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 flex-1">
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="grid gap-4 max-w-2xl mx-auto">
          {activities.map((act, index) => (
            <div key={act.id} className="border p-4 rounded shadow hover:shadow-md transition bg-white/80">
              <h2 className="font-bold text-xl mb-2">
                {index + 1}. {act.title} 
              </h2>
              <p>{act.details}</p>
              <div className="mt-2 flex gap-2">
                <button onClick={() => handleEdit(act)} className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600 flex-1">Edit</button>
                <button onClick={() => handleDelete(act.id)} className="bg-red-600 text-white p-1 rounded hover:bg-red-700 flex-1">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Board;

