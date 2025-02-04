// src/components/TaskList.tsx
"use client";
import useTaskStore from "../store/useTaskStore";
import { useEffect, useState } from "react";
import { tasks } from "../db/schema";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteFunction } from "./operations";
type Task = typeof tasks.$inferSelect;
export default function TaskList() {
  const { task1, setTasks, setEdit, setState } = useTaskStore();
  const handleUpdate = async (task: Task) => {
    setEdit(task);
    setState(true);
  };
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("api/create", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data: Task[] = await response.json();
      setTasks(data);
      // console.log(data);
    };
    fetchTasks();
  }, [setTasks]);

  return (
    <div className="bg-white md:w-[28%] rounded-lg px-5 py-3 mx-9 md:mx-0 font-serif">
      <h2 className="text-center text-xl font-bold underline">To-Do List</h2>
      <ul>
        {Array.isArray(task1) && task1.length > 0 ? (
          task1.map((task, index) => (
            <li
              key={task.id}
              className="flex items-center justify-between border-b"
            >
              {index + 1}. {task.title} - {task.recurrence}
              <div className="flex flex-row gap-4">
                <DeleteIcon
                  className="text-red-600"
                  onClick={() => deleteFunction(task.id)}
                />
                <EditIcon
                  className="text-green-500"
                  onClick={() => handleUpdate(task)}
                />
              </div>
            </li>
          ))
        ) : (
          <p className="text-center">No Tasks Available</p>
        )}
      </ul>
    </div>
  );
}
