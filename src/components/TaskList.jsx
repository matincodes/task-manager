'use client';

import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, toggleComplete, fetchTasks } from '../features/taskSlice';
import { useState, useEffect } from 'react';


export default function TaskList() {
    const dispatch = useDispatch();
  const {tasks, pagination, loading, error} = useSelector((state) => state.tasks);
  const { current_page, last_page} = pagination;
  


  const [currentPage, setCurrentPage] = useState(1);

    // Load tasks whenever `page` changes
  useEffect(() => {
    dispatch(fetchTasks({ currentPage }))
  }, [currentPage, dispatch])

  const handleNextPage = () => {
    if (current_page < last_page) {
      setPage(current_page + 1)
    }
  }

  const handlePrevPage = () => {
    if (current_page > 1) {
      setCurrentPage(current_page - 1)
    }
  }

    // Dispatch deleteTask for a given task ID
    const handleDelete = (taskId) => {
        dispatch(deleteTask(taskId));
    };

    
  // Dispatch toggleComplete for a given task
  const handleToggleTask = (task) => {
    dispatch(toggleComplete(task.id));
  };
 
  if (loading) return <p className="text-center">Loading...</p>
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>
  return (
    <div className="bg-customDark rounded-md shadow mb-5 w-1/2 mt-5 ">
        {/* List of tasks */}
        <div>
            {tasks.map(task => (
                <div
                    key={task.id}
                    className="flex items-center justify-between px-4 py-3 border-b border-gray-700 hover:translate-y-1 transition"
                >
                {/* Check + text */}
                <div className="flex items-center">
                {/* Circle check */}
                <div
                    onClick={() => handleToggleTask(task)}
                    className={`w-6 h-6 rounded-full border-2 border-gray-500 mr-3 flex items-center justify-center cursor-pointer
                        ${task.status === 'completed' ? 'bg-gradient-to-br from-blue-400 to-purple-400' : 'hover:bg-gradient-to-br from-blue-400 to-purple-400'}
                    `}
                >
                {task.status === 'completed' && (
                    <img
                    src="/check.svg"
                    alt="check"
                    className="w-4 h-4"
                    />
                )}
                </div>
                {/* Title text */}
                <div className={`flex ${task.status === 'completed' ? 'line-through text-gray-400' : 'text-white'}`}>
                    <div>
                        <p>{task.title}</p>
                        {task.description && <p className="text-sm text-gray-400">{task.description}</p>}
                    </div>
                    {task.due_date && <p className="text-sm text-gray-400">{task.due_date}</p>}
                    <button
                    onClick={() => handleDelete(task.id)}
                    className="text-red-500 hover:text-red-700 ml-2 font-josefin self-end"
                    aria-label="Delete task"
                  >
                    Delete  
                  </button>
                </div>
            </div>
            </div>
            ))}
        </div>
        
    </div>  
  );
}
