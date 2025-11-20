import React from 'react';
import "./TaskList.css";

export default function TaskList({ tasks = [], onEdit, onDelete }) {
  if (!tasks.length) return <div className="no-tasks">No tasks yet</div>;

  return (
    <div className="task-grid">
      {tasks.map(t => (
        <div key={t._id} className="task-card">
          <div className="task-info">
            <div className="task-title">{t.title}</div>
            <div className="task-desc">{t.description}</div>

            <div className="task-status">
              Status: <strong>{t.status}</strong>
            </div>

            <div className="task-date">
              Created: {new Date(t.createdAt).toLocaleString()}
            </div>
          </div>

          <div className="task-actions">
            <button className="edit-btn" onClick={() => onEdit(t)}>Edit</button>
            <button className="delete-btn" onClick={() => onDelete(t._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
