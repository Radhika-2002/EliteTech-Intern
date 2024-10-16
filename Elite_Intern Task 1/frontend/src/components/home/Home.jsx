import React from 'react';
import "./home.css";

const Home = () => {
  return (
    <div className="home d-flex justify-content-center align-items-center flex-column">
        <div className="container d-flex justify-content-center align-items-center flex-column">
            <h1 className = "text-center">
                Organize your <br /> work and life, finally.
            </h1>
            <p>
                Become focused, oragnized, and calm with <br />
                TODO app. The Worlds's #1 task manager app.
            </p>
            <button class="home-btn p-2">Make Todo List</button>
        </div>
    </div>
  )
} 
export default Home