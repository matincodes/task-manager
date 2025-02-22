'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/taskSlice';

export default function TaskForm() {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskData.title.trim()) return;

    dispatch(
      addTask({
        title: taskData.title,
        description: taskData.description,
        dueDate: taskData.dueDate,
        status: "pending",
      })
    );

    setTaskData({ title: '', description: '', dueDate: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-customDark font-josefin p-4 rounded-lg shadow-md w-1/2">
      <input
        type="text"
        className="w-full p-2 mb-2 text-white bg-transparent border-b-2 border-gray-500 outline-none"
        placeholder="Create Task (required)"
        value={taskData.title}
        onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
        required
      />
       <div className='flex gap-2'>
            <textarea
                className="w-full p-2 mb-2 text-white bg-transparent border-b-2 border-gray-500 outline-none"
                placeholder="Description (optional)"
                value={taskData.description}
                onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
            />
            <input
                type="date"
                className="w-full p-2 mb-2 text-white bg-transparent border-b-2 border-gray-500 outline-none"
                value={taskData.dueDate}
                onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
            />
       </div> 
      
      <button className="w-full p-2 bg-indigo-500 hover:bg-indigo-700 rounded">Add Task</button>
    </form>
  );
}