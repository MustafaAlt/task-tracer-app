import React, { useState, useEffect } from 'react';
import { taskService } from '../services/api';

const TaskForm = ({ currentTask, onTaskSaved, user }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('TODO');
  const [assigneeUsername, setAssigneeUsername] = useState(''); // Kullanıcı adı için yeni state

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
      setStatus(currentTask.status);
      // Güncelleme yaparken atanan kullanıcının adını state'e atıyoruz
      setAssigneeUsername(currentTask.assignee ? currentTask.assignee.username : '');
    } else {
      setTitle('');
      setDescription('');
      setStatus('TODO');
      setAssigneeUsername('');
    }
  }, [currentTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Görevi API'ye gönderirken assignee alanını kullanıcı adıyla dolduruyoruz
    const task = { 
      title, 
      description, 
      status, 
      assignee: { username: assigneeUsername } 
    };

    try {
      if (currentTask) {
        await taskService.updateTask(currentTask.id, task);
      } else {
        await taskService.createTask(task);
      }
      onTaskSaved();
    } catch (err) {
      console.error('Görev kaydetme hatası:', err);
    }
  };

  return (
    <div className="task-form-container">
      <h2>{currentTask ? 'Görevi Güncelle' : 'Yeni Görev Ekle'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Başlık:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Açıklama:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Durum:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="TODO">Yapılacak</option>
            <option value="DONE">Tamamlandı</option>
          </select>
        </div>
        {user && user.role === 'ADMIN' && (
          <div>
            <label>Atanacak Kişi (Kullanıcı Adı):</label>
            <input
              type="text"
              value={assigneeUsername}
              onChange={(e) => setAssigneeUsername(e.target.value)}
              placeholder="Kullanıcı adını girin"
            />
          </div>
        )}
        <button type="submit">
          {currentTask ? 'Görevi Güncelle' : 'Görevi Ekle'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;