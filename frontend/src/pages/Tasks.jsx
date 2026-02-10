import { useEffect, useState } from "react";
import api from "../api/axios";
import { motion } from "framer-motion";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    const res = await api.get("tasks/");
    setTasks(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;

    await api.post("tasks/", {
      title,
      description: "Created from dashboard",
      status: "pending"
    });

    setTitle("");
    loadTasks();
  };

  const toggleStatus = async (task) => {
    await api.patch(`tasks/${task.id}/`, {
      status: task.status === "pending" ? "completed" : "pending"
    });

    loadTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`tasks/${id}/`);
    loadTasks();
  };

  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl shadow p-6"
    >
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>

      {/* Add Task */}
      <div className="flex gap-3 mb-4">
        <input
          className="border p-2 rounded flex-1"
          placeholder="New task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={addTask}
          className="bg-indigo-600 text-white px-4 rounded hover:bg-indigo-700 transition"
        >
          Add
        </button>
      </div>

      {/* Search */}
      <input
        className="border p-2 rounded w-full mb-4"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Tasks */}
      <div className="space-y-3">

        {loading && (
          <p className="text-gray-500 text-center">Loading tasks...</p>
        )}

        {!loading && filteredTasks.map(task => (
          <motion.div
            key={task.id}
            whileHover={{ scale: 1.01 }}
            className="border rounded-xl p-4 flex justify-between items-center shadow-sm hover:shadow transition"
          >
            <div className="flex items-center gap-3">

              <input
                type="checkbox"
                checked={task.status === "completed"}
                onChange={() => toggleStatus(task)}
              />

              <div>
                <p className={`font-medium ${task.status === "completed" ? "line-through text-gray-400" : ""}`}>
                  {task.title}
                </p>

                <span className={`text-xs ${
                  task.status === "completed"
                    ? "text-green-600"
                    : "text-orange-500"
                }`}>
                  {task.status}
                </span>
              </div>

            </div>

            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </motion.div>
        ))}

        {!loading && !filteredTasks.length && (
          <p className="text-gray-500 text-center">No tasks found</p>
        )}

      </div>
    </motion.div>
  );
}
