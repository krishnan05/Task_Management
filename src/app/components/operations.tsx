import useTaskStore from "../store/useTaskStore";
import { tasks } from "../db/schema";

export const deleteFunction = async (id: number) => {
  try {
    let confi = confirm("Are you sure you want to delete");
    if (confi) {
      const response = await fetch(`/api/update?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.message) {
          alert(data.message);
          window.location.reload();
        } else {
          alert(data.error);
        }
      }
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
