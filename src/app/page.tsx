import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
// import UpdateForm from "./components/UpdateForm";
// import useTaskStore from "./store/useTaskStore";

export default function Home() {
  // const { state } = useTaskStore.getState();
  return (
    <div className="bg-purple-600 h-screen pt-14 flex flex-col items-center gap-7 ">
      <TaskForm />
      <TaskList />
      {/* {state && <UpdateForm />} */}
    </div>
  );
}
