
export const deleteFunction = async (id: number) => {
  try {
    let confi = confirm("Are you sure you want to delete");
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (confi) {
      const response = await fetch(`/api/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json",Authorization: `Bearer ${user}`, },
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
