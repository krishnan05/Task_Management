// src/components/TaskForm.tsx
"use client";
import { useEffect, useState } from "react";
import useTaskStore from "../store/useTaskStore";
import { tasks } from "../db/schema";

type Task = typeof tasks.$inferSelect;
export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [recurrence, setRecurrence] = useState("daily");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { task1, setTasks, edit, state, setEdit } = useTaskStore();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
 
  const handleSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault();
    if (!startDate || !endDate) {
      alert("Start and end dates are required");
      return;
    }
    if (edit) {
      // console.log(edit);
      const response = await fetch(`/api/update/${edit.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json",'Authorization': `Bearer ${user}` },
        body: JSON.stringify({ title, recurrence, startDate, endDate }),
      });
      if (!response.ok) {
        alert("Failed to update task");
        return;
      }

      const updatedTask: Task = await response.json();
      alert("Task updated");
      // console.log(updatedTask);
      setTasks(
        task1.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
      setEdit(null);
      setTitle("");
      setRecurrence("daily");
      setStartDate("");
      setEndDate("");
    } else {
      console.log(endDate);
      const response = await fetch("/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json",'Authorization': `Bearer ${user}` },
        body: JSON.stringify({ title, recurrence, startDate, endDate }),
      });
      
      if (!response.ok) {
        alert("Failed to create task");
        return;
      }

      const newTask: Task = await response.json(); // Specify Task type here
      alert("Task created");
      setTasks(task1.concat(newTask));
      setTitle("");
      setRecurrence("daily");
      setStartDate("");
      setEndDate("");
    }
  };
  useEffect(() => {
   const formatDateForInput = (date: Date): string => {
  if (!date) return ""; // Return empty string if no date
  return date.toISOString().split("T")[0]; // Converts to YYYY-MM-DD format
};

if (edit) {
  setTitle(edit.title);
  setRecurrence(edit.recurrence ?? ""); // Default to an empty string if null

  // Ensure we are using the date format for input fields
  // setStartDate(formatDateForInput(edit.startdate ?? new Date())); // Default to today if null
  // setEndDate(formatDateForInput(edit.enddate ?? new Date())); // Default to today if null
}

  }, [edit]);

  return (
    <div className="flex flex-col gap-4 font-serif w-full">
      <h1 className="text-xl font-bold text-white text-center">Task Form</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 md:w-[28%]  w-[80%] m-auto "
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="px-2 py-1 rounded-lg outline-none w-full"
        />
        <div className="flex flex-col md:flex-row items-center gap-4 w-full">
          <select
            className="px-2 py-2 rounded-lg md:w-fit w-full"
            value={recurrence}
            onChange={(e) => setRecurrence(e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="yearly">15Days</option>
            <option value="yearly">5Days</option>
            <option value="yearly">10Days</option>
            <option value="yearly">20Days</option>
          </select>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-2 py-1 rounded-lg outline-none w-full"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-2 py-1 rounded-lg outline-none w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 w-fit self-center px-3 py-1 rounded-lg "
        >
          {edit ? "Save" : "Add Task"}
        </button>
      </form>
    </div>
  );
}
