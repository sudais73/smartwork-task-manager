'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";
import { motion } from "framer-motion";

interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  completionRate: number;
  recentTasks: {
    _id: string;
    title: string;
    status: string;
    dueDate?: string;
    priority: string;
  }[];
}

interface User {
  name?: string;
  image?: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // ✅ New: AI Recommendation State
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("/api/dashboard");
        setStats(res.data);
        setUser(res.data.user);
      } catch (err) {
        console.error("Error loading dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchAIRecommendations = async () => {
      try {
        setLoadingAI(true);
       const res = await axios.get("/api/recommend-tasks");
       setRecommendations(res.data.recommendation || []);
      } catch (err) {
        console.error("Error fetching AI recommendations:", err);
      } finally {
        setLoadingAI(false);
      }
    };

    fetchDashboard();
    fetchAIRecommendations();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-blue-600 text-3xl" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">No Data</h1>
        <p className="text-gray-600">Please add some tasks to view dashboard stats.</p>
        <Link
          href="/tasks/new"
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + Add Task
        </Link>
      </div>
    );
  }

  const { totalTasks, completedTasks, pendingTasks, completionRate, recentTasks } = stats;

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      {/* Welcome Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 mb-10"
      >
        {user?.image && (
          <Image
            src={user.image}
            alt="User Avatar"
            width={120}
            height={120}
            className="rounded-full border-4 border-blue-500"
          />
        )}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Welcome back, {user?.name || "User"} 👋
          </h2>
          <p className="text-gray-600 mt-2">
            Manage your tasks, track your progress, and stay productive every day.
          </p>
          <div className="mt-6">
            <Link
              href="/tasks"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              View Tasks
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: "Total Tasks", value: totalTasks, color: "text-gray-800" },
          { label: "Completed", value: completedTasks, color: "text-green-600" },
          { label: "Pending", value: pendingTasks, color: "text-yellow-600" },
        ].map((card, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className={`bg-white p-6 rounded-xl shadow text-center cursor-pointer`}
          >
            <h3 className={`text-3xl font-bold ${card.color}`}>{card.value}</h3>
            <p className="text-gray-500 mt-1">{card.label}</p>
          </motion.div>
        ))}
      </section>

      {/* Progress Bar */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-5xl bg-white mt-10 p-8 rounded-2xl shadow mb-10"
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Overall Progress</h3>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionRate}%` }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="bg-blue-600 h-4 rounded-full"
          />
        </div>
        <p className="text-gray-600 text-sm mt-2">{completionRate}% completed</p>
      </motion.section>

      {/* Recent Tasks */}
      <section className="w-full max-w-5xl bg-white mt-10 p-8 rounded-2xl shadow">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Tasks</h3>
        {recentTasks.length === 0 ? (
          <p className="text-gray-500">No recent tasks available.</p>
        ) : (
          <table className="w-full text-left text-gray-700">
            <thead>
              <tr className="border-b text-gray-500 text-sm">
                <th className="pb-2">Title</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Priority</th>
                <th className="pb-2">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {recentTasks.map((task) => (
                <motion.tr
                  key={task._id}
                  whileHover={{ scale: 1.02, backgroundColor: "#f0f9ff" }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="border-b cursor-pointer"
                >
                  <td className="py-2">{task.title}</td>
                  <td className="py-2 capitalize">{task.status}</td>
                  <td className="py-2 capitalize">{task.priority}</td>
                  <td className="py-2 text-sm">
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "—"}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* 🧠 AI Recommendations Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-5xl bg-gradient-to-br from-blue-50 to-indigo-100 mt-10 p-8 rounded-2xl shadow"
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          🤖 AI Task Recommendations
        </h3>
        {loadingAI ? (
          <p className="text-gray-500">Analyzing your tasks with OpenAI...</p>
        ) : recommendations.length > 0 ? (
          <ul className="list-disc pl-6 space-y-2">
            {recommendations.map((task: string, i: number) => (
              
              <li key={i} className="bg-white border rounded-lg p-3 shadow-sm">
                {task}
              </li>
           
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No recommendations yet. Keep adding tasks!</p>
        )}
      </motion.section>
    </main>
  );
}
