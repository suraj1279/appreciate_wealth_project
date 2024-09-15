import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";

// Lazy load the components
const TodoApp = lazy(() => import("./TodoApp"));
const Login = lazy(() => import("./Login"));
const Signup = lazy(() => import("./Signup"));
const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));
const Chat = lazy(() => import("./Chat"));
const Chatbot = lazy(() => import("./Chatbot"));
const Translate = lazy(() => import("./Translate"));
const AuthenticatedRoute = lazy(() => import("./AuthenticatedRoute"));

// Loader component (can be a spinner or any other loader)
const Loader = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="loader"></div> {/* Customize this as your loader */}
    <p className="bg-white text-gray-700 font-semibold animate-ping font-serif px-10 py-2 rounded-lg">Fruit.ai</p>
  </div>
);

const AppContent = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    window.alert('Logged out successfully!');
    navigate('/login');
  };

  return (
    <div className="bg-custom-gradient min-h-screen w-full">
      {userEmail ? (
        <div className='absolute top-4 right-1 flex sm:right-4 gap-2'>
          <button onClick={handleLogout} className='bg-gray-600 text-sm text-gray-100 bg-opacity-90 font-semibold p-2 rounded-md px-4'>
            Logout
          </button>
        </div>
      ) : (
        <button onClick={() => navigate('/login')} className='absolute top-4 right-4 text-gray-200 p-2 bg-gray-600 rounded-md px-4'>
          Login
        </button>
      )}

      <div className="max-w-[1000px] mx-auto overflow-x-hidden">
        {/* Suspense to show loader while loading the routes */}
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/todoapp" element={<TodoApp />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/Translate" element={<Translate />} />
            {/* Add AuthenticatedRoute if necessary */}
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
