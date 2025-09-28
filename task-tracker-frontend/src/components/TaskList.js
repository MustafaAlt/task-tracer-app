import React, { useState, useEffect } from 'react';
import { taskService } from '../services/api';
import TaskForm from './TaskForm'; // TaskForm'u içeri aktar
import './TaskList.css'; // Bu dosyayı sonra oluşturacağız


const TaskList = ({ user }) => {  
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTask, setCurrentTask] = useState(null); // Güncellenecek görev

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
        setLoading(true);
        setError(null);
        try {
            // Sadece giriş yapan kullanıcıya atanan görevleri çek
            const response = await taskService.getTasksByAssignee(user.username);
            setTasks(response.data);
            setLoading(false);
            setCurrentTask(null);
        } catch (err) {
            setError('Görevler yüklenirken bir hata oluştu.');
            setLoading(false);
            console.error('API isteği hatası:', err);
        }
    };

  const handleEdit = (task) => {
    setCurrentTask(task); // Düzenlenecek görevi state'e ata
  };

  const handleDelete = async (id) => {
    try {
      await taskService.deleteTask(id);
      fetchTasks(); // Görev silindikten sonra listeyi yeniden çek
    } catch (err) {
      setError('Görev silinirken bir hata oluştu.');
      console.error('Silme hatası:', err);
    }
  };

  if (loading) return <div>Görevler yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;
  console.log("TaskList'te gelen kullanıcı:", user);

   return (
      <div className="task-manager-container">
        <div className="task-form-section">
          <TaskForm 
            currentTask={currentTask} 
            onTaskSaved={fetchTasks} 
            user={user}
          />
        </div>
        <div className="task-list-section">
          <h2>Görev Listesi</h2>
          {tasks.length === 0 ? (
            <p>Henüz sana atanmış görev bulunmuyor.</p>
          ) : (
            <ul className="task-list">
              {tasks.map(task => (
                <li key={task.id} className="task-item">
                  <div className="task-details">
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>
                    <p>Durum: {task.status}</p>
                  </div>
                  <div className="task-actions">
                    <button className="edit-btn" onClick={() => handleEdit(task)}>
                      Düzenle
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(task.id)}>
                      Sil
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
};

export default TaskList;