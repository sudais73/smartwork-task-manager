'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash, FaSpinner, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Task {
  _id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done';
  dueDate?: string;
}

const TaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | 'todo' | 'in-progress' | 'done'>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const router = useRouter();

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('/api/tasks');
        setTasks(res.data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Update task status
  const handleStatusChange = async (taskId: string, newStatus: string) => {
    try {
      setUpdatingId(taskId);
      await axios.put(`/api/tasks/${taskId}`, { status: newStatus });
      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? { ...t, status: newStatus as Task['status'] } : t))
      );
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  // Delete task
  const handleDelete = async (taskId: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      setUpdatingId(taskId);
      await axios.delete(`/api/tasks/${taskId}`);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredTasks =
    statusFilter === 'all' ? tasks : tasks.filter((task) => task.status === statusFilter);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-blue-600 text-3xl" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Your Tasks</h1>
           

          <Link
            href="/tasks/new"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <FaPlus /> New Task
          </Link>
        </div>
        <Link href='/dashboard' className=" flex gap-1 items-center font-bold text-green-800 mb-6 text-center">
        <FaArrowLeft/> Dashboard
        </Link>

        {/* Filter Dropdown */}
        <div className="mb-6 flex justify-end">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Tasks</option>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Completed</option>
          </select>
        </div>

        {/* Task List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div
                key={task._id}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition relative border-t-4"
                style={{
                  borderColor:
                    task.priority === 'high'
                      ? '#ef4444'
                      : task.priority === 'medium'
                      ? '#f59e0b'
                      : '#22c55e',
                }}
              >
                {/* Title */}
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {task.title}
                </h2>

                {/* Description */}
                {task.description && (
                  <p className="text-gray-600 mb-3 line-clamp-3">
                    {task.description}
                  </p>
                )}
                 {/* Description */}
                {task.priority && (
                  <p className="text-gray-600 mb-3 line-clamp-3">
                   Priority: {task.priority}
                  </p>
                )}

                {/* Due Date */}
                {task.dueDate && (
                  <p className="text-sm text-gray-400 mb-3">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                )}

                {/* Status Dropdown */}
                <div className="flex items-center justify-between mt-2">
                  <select
                    disabled={updatingId === task._id}
                    value={task.status}
                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                    className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="todo">Todo</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/tasks/edit/${task._id}`)}
                      className="p-2 rounded-md text-blue-600 hover:bg-blue-50"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      disabled={updatingId === task._id}
                      className="p-2 rounded-md text-red-600 hover:bg-red-50"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No tasks found for this filter.
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default TaskPage;
