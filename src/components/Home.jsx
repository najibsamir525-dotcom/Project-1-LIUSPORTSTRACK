import React from 'react'
const schedule = [
    { day: 'Monday', exercises: ['Running', 'Push-ups'], meals: ['Oatmeal', 'Salad', 'Grilled Chicken'] },
    { day: 'Tuesday', exercises: ['Yoga', 'Cycling'], meals: ['Smoothie', 'Sandwich', 'Fish'] },
    { day: 'Wednesday', exercises: ['Swimming', 'Squats'], meals: ['Pancakes', 'Soup', 'Steak'] },
    { day: 'Thursday', exercises: ['HIIT', 'Lunges'], meals: ['Eggs', 'Salad', 'Pasta'] },
    { day: 'Friday', exercises: ['Jogging', 'Plank'], meals: ['Yogurt', 'Chicken Wrap', 'Salmon'] },
    { day: 'Saturday', exercises: ['Hiking', 'Stretching'], meals: ['Cereal', 'Burger', 'Pizza'] },
    { day: 'Sunday', exercises: ['Rest'], meals: ['Brunch', 'Snack', 'Dinner'] },
  ];
function Home() {

  return (
    <>
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to LIUSPORTSTRACK</h1>
      <p className="text-lg">Track your fitness, meals, and daily wellness routines.</p>
    </div>
 <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Weekly Wellness Plan</h1>
      
      <div className="grid gap-6">
        {schedule.map((dayInfo, index) => (
          <div key={index} className="border p-4 rounded shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-2">{dayInfo.day}</h2>
            
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
              <div>
                <h3 className="font-bold mb-1">Exercises:</h3>
                <ul className="list-disc list-inside">
                  {dayInfo.exercises.map((ex, i) => (
                    <li key={i}>{ex}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Meals:</h3>
                <ul className="list-disc list-inside">
                  {dayInfo.meals.map((meal, i) => (
                    <li key={i}>{meal}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Home;
