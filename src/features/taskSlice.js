import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8000/api';

//  Fetch all tasks from backend
export const fetchTasks = createAsyncThunk('task/fetchTasks', async ({ page = 1, perPage = 5 }, { rejectWithValue }) => {
  try {
    const token = Cookies.get('auth_token'); // Get token from cookies
    const response = await axios.get(`${API_URL}/tasks?page=${page}&per_page=${perPage}`, {
      headers: { Authorization: `Bearer ${token}` }, // Send token to Laravel
    });
    return response.data; // Return the list of tasks
  } catch (error) {
    return rejectWithValue(error.response.data  || 'Error fetching tasks');
  }
});

// Add a new task (send to API)
export const addTask = createAsyncThunk('task/addTask', async (taskData, { rejectWithValue }) => {
  try {
    const token = Cookies.get('auth_token');
    const response = await axios.post(`${API_URL}/tasks`, taskData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Return the new task
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Delete a task (send to API)
export const deleteTask = createAsyncThunk('task/deleteTask', async (taskId, { rejectWithValue }) => {
  try {
    const token = Cookies.get('auth_token');
    await axios.delete(`${API_URL}/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return taskId; // Return ID of deleted task
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Toggle task completion (update in API)
export const toggleComplete = createAsyncThunk('task/toggleComplete', async (task, { rejectWithValue }) => {
  try {
    const token = Cookies.get('auth_token');
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';

    const response = await axios.put(
      `${API_URL}/tasks/${task.id}`,
      {status: newStatus},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data; // Return updated task
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    tasks: [],
    pagination: {
      current_page: 1,
      last_page: 1,
      total: 0,
      per_page: 10,
    },
    loading: false,
    error: null,
  },
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      // Handle fetching tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.data; // Set fetched tasks
        state.pagination = { // Set pagination data
          current_page: action.payload.current_page,
          last_page: action.payload.last_page,
          total: action.payload.total,
          per_page: action.payload.per_page,
        };
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handle adding a task
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      
      // Handle deleting a task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      
      // Handle toggling completion
      .addCase(toggleComplete.fulfilled, (state, action) => {
        const task = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (task !== -1) {
          state.tasks[task].status = action.payload.status; // Update status
        }
      });
  },
});

export default taskSlice.reducer;
