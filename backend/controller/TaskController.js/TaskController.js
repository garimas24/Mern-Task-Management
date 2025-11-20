const Task = require('../models/Task');


exports.createTask = async (req, res, next) => {
try {
const { title, description, status } = req.body;
if (!title) return res.status(400).json({ message: 'Title is required' });
const task = new Task({ title, description, status });
await task.save();
res.status(201).json(task);
} catch (err) {
next(err);
}
};


exports.getAllTasks = async (req, res, next) => {
try {
const filter = {};
if (req.query.status) filter.status = req.query.status;
const tasks = await Task.find(filter).sort({ createdAt: -1 });
res.json(tasks);
} catch (err) {
next(err);
}
};


exports.getTaskById = async (req, res, next) => {
try {
const task = await Task.findById(req.params.id);
if (!task) return res.status(404).json({ message: 'Task not found' });
res.json(task);
} catch (err) {
next(err);
}
};


exports.updateTask = async (req, res, next) => {
try {
const { title, description, status } = req.body;
const updates = { title, description, status };
Object.keys(updates).forEach(k => updates[k] === undefined && delete updates[k]);


const task = await Task.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
if (!task) return res.status(404).json({ message: 'Task not found' });
res.json(task);
} catch (err) {
next(err);
}
};


exports.deleteTask = async (req, res, next) => {
try {
const task = await Task.findByIdAndDelete(req.params.id);
if (!task) return res.status(404).json({ message: 'Task not found' });
res.json({ message: 'Task deleted' });
} catch (err) {
next(err);
}
};