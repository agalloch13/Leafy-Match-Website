import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom'; // Assuming you're using React Router for navigation

const ReboundPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in (for example, by checking a token in local storage)
    const token = localStorage.getItem('token'); // Assuming token is stored in local storage
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Redirect the user to the appropriate page after sign-in
  if (isLoggedIn) {
    return <Redirect to="/Home" />; // Redirect to the home page or any other desired page
  }

  // If not logged in, display a loading message or a component indicating that the user is being redirected
  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
};

export default ReboundPage;
