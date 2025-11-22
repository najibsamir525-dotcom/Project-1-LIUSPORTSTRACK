import React from 'react'

function About() {

  return (
    <>
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">About LIUSPORTSTRACK</h1>
      <p className="text-lg">LIUSPORTTRACK is your personal wellness tracker to log daily activities and meals.</p>
    </div>
       <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Features</h1>
      <ul className="list-disc list-inside text-left max-w-xl mx-auto">
        <li>Track daily workouts</li>
        <li>Log meals and water intake</li>
        <li>Monitor weekly/monthly progress</li>
      </ul>
    </div>
    </>
  );
};

export default About;
