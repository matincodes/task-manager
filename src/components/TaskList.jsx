'use client';

import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, toggleComplete, fetchTasks } from '../features/taskSlice';
import { useState, useEffect } from 'react';
import Check  from "@/assets/icon-check.svg";
import Cross from "@/assets/icon-cross.svg";
import Image from 'next/image';


export default function TaskList() {
    const dispatch = useDispatch();
  const {tasks, pagination, loading, error} = useSelector((state) => state.tasks);
  const { current_page, last_page} = pagination;
  


  const [currentPage, setCurrentPage] = useState(1);

    // Load tasks whenever `page` changes
  useEffect(() => {
    dispatch(fetchTasks({ page: currentPage }))
  }, [currentPage, dispatch])

  const handleNextPage = () => {
    if (current_page < last_page) {
      setCurrentPage(current_page + 1)
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
    console.log(task);
    dispatch(toggleComplete(task));
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
                    className="flex w-full h-[80px] items-center px-4 py-3 border-b border-gray-700 hover:translate-y-1 transition"
                >
                {/* Check + text */}
                <div className="flex items-center w-full">
                {/* Circle check */}
                <div
                    onClick={() => handleToggleTask(task)}
                    className={`w-8 h-8 rounded-full border-2 border-gray-500 mr-3 flex items-center justify-center cursor-pointer
                        ${task.status === 'completed' ? 'bg-gradient-to-br from-blue-400 to-purple-400' : 'hover:bg-gradient-to-br from-blue-400 to-purple-400'}
                    `}
                >
                    {task.status === 'completed' && (
                        <Image
                            src={Check}
                            alt="check"
                            className="w-3 h-3"
                        />
                    )}
                </div>
                {/* Title text */}
                <div className='flex justify-between flex-1 items-center'>
                    <div>
                        <p className={`${task.status === 'completed' ? 'line-through text-gray-400' : 'text-white'}`}>{task.title}</p>
                        {task.description && <p className={`text-sm text-gray-400 ${task.status === 'completed' ? 'line-through text-gray-400' : 'text-white'}`}>{task.description}</p>}
                    </div>
                    {task.due_date && <p className="text-sm text-gray-400 font-josefin">{task.due_date}</p>}
                    <button
                    onClick={() => handleDelete(task.id)}
                    aria-label="Delete task"
                  >
                    <Image src={Cross} alt="Delete" className="w-4 h-4" /> 
                  </button>
                </div>
            </div>
            </div>
            ))}
        </div>
        <div className="flex justify-between p-4">
        <button
          disabled={current_page === 1}
          onClick={handlePrevPage}
          className="text-white px-3 py-1 rounded disabled:opacity-50 font-josefin hover:text-indigo-500"
        >
          Prev
        </button>
        <span className="text-white">
          Page {current_page} of {last_page}
        </span>
        <button
          disabled={current_page === last_page}
          onClick={handleNextPage}
          className="text-white px-3 py-1 rounded disabled:opacity-50 font-josefin hover:text-indigo-500"
        >
          Next
        </button>
      </div>
    </div>  
  );
}
