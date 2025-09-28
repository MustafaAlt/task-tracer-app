import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Kullanıcı API istekleri
export const userService = {
  register: (user) => axios.post(`${API_URL}/user/register`, user),
  login: (username, password) => axios.post(`${API_URL}/user/login`, null, { 
    params: { username, password }
  }),
};

// Görev API istekleri
export const taskService = {
  getAllTasks: () => axios.get(`${API_URL}/tasks`),
  getTaskById: (id) => axios.get(`${API_URL}/tasks/${id}`),
  createTask: (task) => axios.post(`${API_URL}/tasks`, task),
  updateTask: (id, task) => axios.put(`${API_URL}/tasks/${id}`, task),
  deleteTask: (id) => axios.delete(`${API_URL}/tasks/${id}`),
  getTasksByAssignee: (username) => axios.get(`${API_URL}/tasks/my-tasks/${username}`), // Yeni servis metodu
};