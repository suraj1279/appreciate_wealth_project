import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { RiEditLine } from 'react-icons/ri';
import { AiOutlineDelete } from 'react-icons/ai';
import DotNavigation from './Dotnavigation';

// Skeleton component
const TodoSkeleton = () => (
  <li className='flex bg-gray-200 animate-pulse flex-col md:flex-row items-center gap-4 md:gap-6 mb-4 px-2 sm:p-6 py-5 sm:px-10 border rounded-lg'>
    <div className='flex gap-2 sm:gap-9 md:gap-12 md:px-5 justify-center items-center'>
      <div className='w-24 h-24 md:w-32 md:h-32 bg-gray-300 rounded-lg'></div>
      <span className='flex-1 font-sans text-xs sm:text-sm md:text-xl bg-gray-300 h-6 rounded-md'></span>
    </div>
    <div className='flex self-end mt-2 bg-lime-400 bg-opacity-45 filter backdrop-blur-lg px-6 rounded-3xl py-1 gap-2'>
      <div className='w-8 h-8 bg-white rounded-full'></div>
      <div className='w-8 h-8 bg-white rounded-full'></div>
    </div>
  </li>
);

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [upload, setUpload] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);  // Added loading state
  const userEmail = localStorage.getItem('userEmail');
  const navigate = useNavigate();

  useEffect(() => {

    const fetchTodos = async () => {
      try {
        const response = await axios.get("https://appreciate-wealth-backend-1.onrender.com/todos");
        setTodos(response.data);
        setLoading(false); // Set loading to false once todos are fetched
      } catch (error) {
        console.error("Error fetching todos", error);
        setLoading(false);  // Handle error, set loading to false
      }
    };
    fetchTodos();

  }, [userEmail, navigate]);

  const handleAddTodo = async () => {
    if (!task) {
      window.alert('Task cannot be empty.');
      return;
    }

    const formData = new FormData();
    formData.append('task', task);
    formData.append('email', userEmail);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post("https://appreciate-wealth-backend-1.onrender.com/todos", formData);
      setTodos([...todos, response.data]);
      setTask('');
      setImage(null);
      setUpload(false); // Close the upload tab  
      window.alert('Task added successfully!');
    } catch (error) {
      console.error("Failed to add task", error);
      window.alert('Failed to add task.');
    }
  };

  const handleDeleteTodo = async (id) => {
    if (!id) {
      console.error("Todo ID is undefined");
      return;
    }

    try {
      await axios.delete(`https://appreciate-wealth-backend-1.onrender.com/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
      window.alert('Task deleted successfully!');
    } catch (error) {
      console.error("There was an error deleting the todo!", error);
      window.alert('Failed to delete task.');
    }
  };

  const handleUpdateTodo = async (todo) => {
    const updatedTask = prompt('Enter the new task:', todo.task);
    if (updatedTask) {
      try {
        await axios.put(`https://appreciate-wealth-backend-1.onrender.com/todos/${todo._id}`, {
          task: updatedTask,
          email: userEmail,
        });
        setTodos(todos.map(t => (t._id === todo._id ? { ...t, task: updatedTask } : t)));
        window.alert('Task updated successfully!');
      } catch (error) {
        console.error("Failed to update task", error);
        window.alert('Failed to update task.');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    window.alert('Logged out successfully!');
    navigate('/login');
  };

  return (
    <div>
      <div className='p-4 md:p-8'>
        <h1 className='text-center text-2xl mt-6 font-semibold mb-4'>FAQ Section</h1>

        {userEmail ? (
          <div className='absolute top-4 right-1 flex sm:right-4 gap-2'>
            <button onClick={() => setUpload(!upload)} className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold rounded-full w-10 h-10 flex justify-center items-center'>
              <MdAdd className='text-xl' />
            </button>
            <button onClick={handleLogout} className='bg-gray-600 text-sm text-gray-100 bg-opacity-90 font-semibold p-2 rounded-md px-4'>
              Logout
            </button>
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className='absolute top-4 right-4 text-gray-200 p-2 bg-gray-600 rounded-md px-4'>
            Login
          </button>
        )}

        {upload && (
          <div className='fixed top-0 px-1 z-50 left-0 w-full h-full bg-black/50 flex justify-center items-center'>
            <div className='relative p-4 w-full max-w-sm bg-white rounded-lg shadow'>
              <button
                type="button"
                onClick={() => setUpload(false)}
                className='absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center'>
                <svg aria-hidden="true" className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <span className="sr-only">Close upload tab</span>
              </button>
              <textarea
                value={task}
                onChange={e => setTask(e.target.value)}
                rows={5}
                placeholder="Add new task"
                className='block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1'
              />
              <input
                type="file"
                onChange={e => setImage(e.target.files[0])}
                className='mt-2 block w-full'
              />
              <button onClick={handleAddTodo} className='mt-4 inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1'>
                Add
              </button>
            </div>
          </div>
        )}

        <ul className='mt-10 flex flex-col gap-5'>
          {loading
            ? Array.from({ length: 5 }).map((_, index) => <TodoSkeleton key={index} />) // Render skeletons while loading
            : todos.map((todo) => {
              // Split the task into the first word and the rest
              const [firstWord, ...restOfTask] = todo.task.split(' ');

              return (
                <li
                  key={todo._id}
                  className="flex bg-white  flex-col md:flex-row items-center gap-4 md:gap-6 mb-4 px-2 sm:p-6 py-5 sm:px-10 border rounded-lg"
                >
                  <div className="flex gap-2 sm:gap-9 md:gap-12 md:px-5 justify-center items-center">
                    {todo.image && (
                      <img
                        src={`https://appreciate-wealth-backend-1.onrender.com/uploads/${todo.image
                          .split("/")
                          .pop()}`}
                        alt="todo"
                        className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex flex-col gap-3">
                      {/* First word in <p>, rest in <span> */}
                      <p className="text-yellow-900 text-xl">{firstWord}</p>
                      <span className="flex-1 font-sans text-xs sm:text-sm md:text-xl text-left">
                        {restOfTask.join(" ")}
                      </span>
                    </div>
                  </div>
                  <div className="flex self-end mt-2 z-10 bg-lime-400 bg-opacity-45 filter backdrop-blur-lg px-6 rounded-3xl py-1 gap-2">
                    {userEmail === todo.user_id && (
                      <>
                        <button
                          onClick={() => handleUpdateTodo(todo)}
                          className="w-8 h-8 rounded-full flex justify-center items-center bg-white"
                        >
                          <RiEditLine className="text-xl" />
                        </button>
                        <button
                          onClick={() => handleDeleteTodo(todo._id)}
                          className="w-8 h-8 rounded-full flex justify-center items-center bg-white"
                        >
                          <AiOutlineDelete className="text-xl" />
                        </button>
                      </>
                    )}
                  </div>
                </li>
              );
            })}
        </ul>

      </div>
      <DotNavigation />
    </div>
  );
};

export default TodoApp;
