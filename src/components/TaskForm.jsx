import React, { useEffect, useState } from 'react';
import "./TaskForm.css";

export default function TaskForm({ onSubmit, initial = null, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || '');
      setDescription(initial.description || '');
      setStatus(initial.status || 'pending');
    } else {
      setTitle('');
      setDescription('');
      setStatus('pending');
    }
  }, [initial]);

  const submit = (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) return setError('Title cannot be empty');

    onSubmit({ title: title.trim(), description: description.trim(), status });

    if (!initial) {
      setTitle('');
      setDescription('');
      setStatus('pending');
    }
  };

  return (
    <form className="task-form" onSubmit={submit}>
      <input 
        className="form-input"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <textarea 
        className="form-textarea"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows={3}
      />

      <select 
        className="form-select"
        value={status}
        onChange={e => setStatus(e.target.value)}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In-Progress</option>
        <option value="completed">Completed</option>
      </select>

      {error && <div className="form-error">{error}</div>}

      <div className="form-actions">
        <button className="btn-primary" type="submit">
          {initial ? 'Save' : 'Add Task'}
        </button>

        {initial && (
          <button className="btn-secondary" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
