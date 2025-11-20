import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from './services/api';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import "./App.css";


function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const load = async () => {
    try {
      const status = filterStatus === 'all' ? undefined : filterStatus;
      const data = await fetchTasks(status);
      setTasks(data);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load tasks');
    }
  };

  useEffect(() => { load(); }, [filterStatus]);

  const onAdd = async (payload) => {
    try {
      await createTask(payload);
      await load();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to create task');
    }
  };

  const onUpdate = async (id, payload) => {
    try {
      await updateTask(id, payload);
      setEditing(null);
      await load();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to update task');
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await deleteTask(id);
      await load();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to delete task');
    }
  };

  return (
    // <div style={{ maxWidth: 900, margin: '2rem auto', padding: '1rem' }}>
      <div className="app-container">
      <h1 className="app-title">Task Manager</h1>
      {error && <div className='error-box'>{error}</div>}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
        <TaskForm onSubmit={onAdd} />
        <div>
          <label className='filter-box'>Filter: </label>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In-Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <TaskList
        tasks={tasks}
        onEdit={task => setEditing(task)}
        onDelete={onDelete}
      />

      {editing && (
        <div className='edit-box'>
          <h3>Edit Task</h3>
          <TaskForm initial={editing} onSubmit={(payload) => onUpdate(editing._id, payload)} onCancel={() => setEditing(null)} />
        </div>
      )}
    </div>
  );
}

export default App;
