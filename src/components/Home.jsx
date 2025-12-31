import React, { useEffect, useState } from "react";
import axios from "axios";
import bgImage from "../home.png";
const API = process.env.REACT_APP_API_URL || "http://localhost:5000";
function Home() {
  const [plan, setPlan] = useState([]);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await axios.get(`${API}/home-plan`);
        setPlan(res.data);
      } catch (err) {
        console.error("Error fetching home plan:", err);
      }
    };
    fetchPlan();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center p-8"
    style={{
    backgroundImage: `url(${bgImage})`,
  }}

    >
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to LIUSPORTSTRACK</h1>
        <p className="text-lg mb-6">Track your fitness, meals, and daily wellness routines.</p>

        <h2 className="text-3xl font-bold mb-4">Weekly Wellness Plan</h2>
      </div>

      <div className="grid gap-6 max-w-4xl mx-auto">
        {plan.map((day, index) => (
          <div
            key={index}
            className="border p-4 rounded shadow hover:shadow-lg transition bg-white/80"
          >
            <h3 className="text-2xl font-semibold mb-2">{day.day}</h3>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
              
              <div className="p-4 rounded bg-white/70">
                <h4 className="font-bold mb-1">Exercises:</h4>
                <ul className="list-disc list-inside">
                  {day.exercises.split(",").map((ex, i) => (
                    <li key={i}>{ex}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded bg-white/70">
                <h4 className="font-bold mb-1">Meals:</h4>
                <ul className="list-disc list-inside">
                  {day.meals.split(",").map((meal, i) => (
                    <li key={i}>{meal}</li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
