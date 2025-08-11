"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase/client";
import { useSession } from "../lib/supabase/SessionProvider";

type Task = {
  id: string;
  title: string;
  status: "todo" | "doing" | "done";
  created_at: string;
};

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const user = session?.user ?? null;
  const [message, setMessage] = useState("");

  // Removed local user state and effect, now using useSession

  useEffect(() => {
    if (user) fetchTasks();
  }, [user]);

  const fetchTasks = async () => {
    setLoading(true);
    setMessage("");
    const { data, error } = await supabase
      .from("tasks")
      .select("id, title, status, created_at")
      .eq("owner", user.id)
      .order("created_at", { ascending: false });
    if (error) setMessage(error.message);
    setTasks(data || []);
    setLoading(false);
  };

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const { error } = await supabase.from("tasks").insert({
      title,
      status,
      owner: user.id,
    });
    if (error) setMessage(error.message);
    setTitle("");
    setStatus("todo");
    await fetchTasks();
    setLoading(false);
  };

  const updateTask = async (id: string, newStatus: string) => {
    setLoading(true);
    setMessage("");
    const { error } = await supabase.from("tasks").update({ status: newStatus }).eq("id", id);
    if (error) setMessage(error.message);
    await fetchTasks();
    setLoading(false);
  };

  const deleteTask = async (id: string) => {
    setLoading(true);
    setMessage("");
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) setMessage(error.message);
    await fetchTasks();
    setLoading(false);
  };

  if (!user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-4">Tasks Page</h1>
        <p className="text-lg">Please sign in to view and manage your tasks.</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">Tasks Page</h1>
      <form onSubmit={addTask} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          className="border px-3 py-2 rounded"
        />
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="todo">Todo</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Task
        </button>
      </form>
      {message && <p className="mb-4 text-red-600">{message}</p>}
      <ul className="w-full max-w-xl">
        {tasks.length === 0 && <li className="text-gray-500">No tasks found.</li>}
        {tasks.map(task => (
          <li key={task.id} className="flex items-center justify-between border-b py-2">
            <div>
              <span className="font-semibold mr-2">{task.title}</span>
              <span className="text-xs px-2 py-1 rounded bg-gray-200">{task.status}</span>
            </div>
            <div className="flex gap-2">
              <select
                value={task.status}
                onChange={e => updateTask(task.id, e.target.value)}
                className="border px-2 py-1 rounded"
              >
                <option value="todo">Todo</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
              </select>
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                disabled={loading}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
