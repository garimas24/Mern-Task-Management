const mongoose = require('mongoose');


const TaskSchema = new mongoose.Schema({
title: { type: String, required: [true, 'Title is required'] },
description: { type: String, default: '' },
status: { type: String, enum: ['pending','in-progress','completed'], default: 'pending' }
}, { timestamps: true });


module.exports = mongoose.model('Task', TaskSchema);