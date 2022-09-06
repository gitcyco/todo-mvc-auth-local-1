const deleteBtn = document.querySelectorAll(".del");
const ticketItem = document.querySelectorAll("span.not");
const ticketComplete = document.querySelectorAll("span.completed");

Array.from(deleteBtn).forEach((el) => {
  el.addEventListener("click", deleteUser);
});

async function deleteUser() {
  const userId = this.parentNode.dataset.id;
  console.log(userId);
  return;
  try {
    const response = await fetch("admin/deleteUser", {
      method: "delete",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        userIdFromJSFile: userId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
