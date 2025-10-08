import mongoose, { Document, Model } from 'mongoose';


export interface ITask extends Document {
userId: mongoose.Types.ObjectId;
title: string;
description?: string;
priority: 'low' | 'medium' | 'high';
status: 'todo' | 'in-progress' | 'done';
dueDate?: Date;
createdAt?: Date;
updatedAt?: Date;
}


const TaskSchema = new mongoose.Schema<ITask>({
userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
title: { type: String, required: true },
description: { type: String },
priority: { type: String, enum: ['low','medium','high'], default: 'medium' },
status: { type: String, enum: ['todo','in-progress','done'], default: 'todo' },
dueDate: { type: Date },
}, { timestamps: true });


const Task: Model<ITask> = mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);
export default Task;