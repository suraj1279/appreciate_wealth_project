import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function DotNavigation() {
  const navigate = useNavigate();
  const location = useLocation(); // To get the current route
  const [activeTab, setActiveTab] = useState(location.pathname); // Set initial active tab based on route

  const handleNavigate = (path) => {
    setActiveTab(path); // Set the active tab when clicked
    navigate(path);     // Navigate to the path
  };

  return (
    <div className='fixed bottom-0 w-full max-w-[1000px] justify-center items-center flex gap-2 py-11'>
      <button
        className={`w-2 h-2 rounded-full ${activeTab === '/' ? 'bg-blue-500' : 'bg-gray-800'}`}
        onClick={() => handleNavigate('/')}
      ></button>
      <button
        className={`w-2 h-2 rounded-full ${activeTab === '/About' ? 'bg-blue-500' : 'bg-gray-800'}`}
        onClick={() => handleNavigate('/About')}
      ></button>
      <button
        className={`w-2 h-2 rounded-full ${activeTab === '/TodoApp' ? 'bg-blue-500' : 'bg-gray-800'}`}
        onClick={() => handleNavigate('/TodoApp')}
      ></button>
    </div>
  );
}

export default DotNavigation;
