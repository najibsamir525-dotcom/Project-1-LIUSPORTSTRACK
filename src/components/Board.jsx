import React, { useState } from 'react';

function Activity({ activity }) {

  return (
    <div className="border p-4 rounded shadow hover:shadow-md transition">
      <h2 className="font-bold text-xl mb-2">{activity.title}</h2>
      <p>{activity.details}</p>
    </div>
  );
};

function Board() {

var inputs={
  title: '',
  details: '' 
}
  const [activities, setActivities] = useState([]);
  const [input, setInput] = useState(inputs);

  const handleChange = (e) => setInput({ ...input, [e.target.name]: e.target.value });

  const handleAdd = (e) => {
    e.preventDefault();
    if (input.title && input.details) {
      setActivities([...activities, input]);
      setInput(inputs);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Dashboard</h1>
      <form onSubmit={handleAdd} className="flex flex-col gap-2 mb-6">
        <input type="text" name="title" placeholder="Activity Name" value={input.title} onChange={handleChange} className="p-2 border rounded"/>
        <input type="text" name="details" placeholder="Details" value={input.details} onChange={handleChange} className="p-2 border rounded"/>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Add Activity</button>
      </form>
      <div className="grid gap-4">
        {activities.map((act, index) => <Activity key={index} activity={act} />)}
      </div>
    </div>
  );
};

export default Board
