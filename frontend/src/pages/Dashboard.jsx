import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("tasks/")
      .then(res => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === "completed").length;
  const pendingTasks = tasks.filter(t => t.status === "pending").length;

  const progress = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  if (loading) {
    return <p className="text-gray-500">Loading dashboard...</p>;
  }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Welcome Back 👋
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-400 text-sm">Total Tasks</p>
          <h2 className="text-4xl font-bold text-indigo-600 mt-2">
            {totalTasks}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-400 text-sm">Completed</p>
          <h2 className="text-4xl font-bold text-green-600 mt-2">
            {completedTasks}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-400 text-sm">Pending</p>
          <h2 className="text-4xl font-bold text-red-500 mt-2">
            {pendingTasks}
          </h2>
        </div>

      </div>

      {/* Progress */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h3 className="text-xl font-semibold mb-2">Progress</h3>

        <div className="w-full bg-gray-200 rounded h-3">
          <div
            className="bg-indigo-600 h-3 rounded"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-gray-600 mt-2">{progress}% completed</p>
      </div>

      {/* Overview */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-2">
          Dashboard Overview
        </h3>
        <p className="text-gray-600">
          You have {pendingTasks} pending tasks. Keep going 💪
        </p>
      </div>

    </div>
  );
}
