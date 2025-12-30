import React from 'react';
import bgImage from "../about.png";
function About() {
  return (
    <div
      className="min-h-screen bg-cover bg-center p-8"
      style={{
    backgroundImage: `url(${bgImage})`,
  }}
    >
      <div className="min-h-screen bg-black/40 p-8 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">About LIUSPORTSTRACK</h1>
          <p className="text-lg max-w-3xl mx-auto">
            LIUSPORTTRACK is your personal wellness tracker to log daily activities and meals.
          </p>
        </div>
        <div className="text-center mt-8">
          <h2 className="text-3xl font-bold mb-4">Features</h2>
          <ul className="list-disc list-inside text-left max-w-xl mx-auto">
            <li>Track daily workouts</li>
            <li>Log meals and water intake</li>
            <li>Monitor weekly/monthly progress</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;

