import { create } from "zustand";
import { tasks } from "../db/schema";
type Task = typeof tasks.$inferSelect;

interface TaskStore {
  task1: Task[];
  setTasks: (task1: Task[]) => void;
  state: boolean;
  setState: (state: boolean) => void;
  edit: Task | null;
  setEdit: (task1: Task | null) => void;
}

const useTaskStore = create<TaskStore>((set) => ({
  task1: [],
  setTasks: (task1) => set({ task1 }),  
  state: false,
  setState: (state) => set({ state }),
  edit: null,
  setEdit: (task1) => set({ edit: task1 }),
}));

export default useTaskStore;
