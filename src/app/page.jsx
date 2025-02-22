'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../features/authSlice';
import { fetchTasks } from '../features/taskSlice';
import { useRouter } from 'next/navigation';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function Home() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchTasks()); // Fetch tasks after login
    } else if (!loading && !isAuthenticated
      && router.pathname !== '/login'
      && router.pathname !== '/register') {
      router.push('/login');
    }
  }, [isAuthenticated, loading, dispatch, router]);

  if (loading) return <p className="text-white text-center">Loading...</p>;

  return (
    <div className="flex flex-col justify-center items-center z-10">
      <TaskForm/>
      <TaskList/>
    </div>
  );
}
