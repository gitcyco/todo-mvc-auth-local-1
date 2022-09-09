const deleteBtn = document.querySelectorAll(".del");
const ticketItem = document.querySelectorAll("span.not");
const ticketComplete = document.querySelectorAll("span.completed");
const completedCheck = document.querySelectorAll(".completedCheckBox");
const editButtons = document.querySelectorAll(".edit-btn");
const saveButtons = document.querySelectorAll(".save-btn");
const cancelButtons = document.querySelectorAll(".cancel-btn");

Array.from(deleteBtn).forEach((el) => {
  el.addEventListener("click", deleteUser);
});

Array.from(completedCheck).forEach((el) => {
  el.addEventListener("click", toggleComplete);
});

Array.from(editButtons).forEach((el) => {
  el.addEventListener("click", editRow);
});

Array.from(saveButtons).forEach((el) => {
  el.addEventListener("click", saveRowEdit);
});

Array.from(cancelButtons).forEach((el) => {
  el.addEventListener("click", cancelRowEdit);
});

async function deleteUser() {
  const userId = this.parentNode.dataset.id;
  console.log(userId);
  //   return;
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

async function toggleComplete() {
  const ticketId = this.parentNode.dataset.id;
  console.log("CHECK:", this.checked);
  //   return;
  try {
    const response = await fetch("tickets/toggleComplete", {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        ticketIdFromJSFile: ticketId,
        completedCheckBox: this.checked,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function editRow(event) {
  const ticketId = this.parentNode.dataset.id;
  console.log("EDIT!", ticketId);
  const editButton = this.parentNode.querySelectorAll(".edit-btn")[0];
  const saveButton = this.parentNode.querySelectorAll(".save-btn")[0];
  const cancelButton = this.parentNode.querySelectorAll(".cancel-btn")[0];
  console.log(editButton.classList);
  editButton.classList.add("d-none");
  saveButton.classList.remove("d-none");
  cancelButton.classList.remove("d-none");
}

async function saveRowEdit(event) {
  const ticketId = this.parentNode.dataset.id;
  console.log("SAVE!", ticketId, event);
  const editButton = this.parentNode.querySelectorAll(".edit-btn")[0];
  const saveButton = this.parentNode.querySelectorAll(".save-btn")[0];
  const cancelButton = this.parentNode.querySelectorAll(".cancel-btn")[0];
  console.log(saveButton.classList);
  editButton.classList.remove("d-none");
  saveButton.classList.add("d-none");
  cancelButton.classList.add("d-none");
}

async function cancelRowEdit(event) {
  const ticketId = this.parentNode.dataset.id;
  console.log("CANCEL!", ticketId);
  const editButton = this.parentNode.querySelectorAll(".edit-btn")[0];
  const saveButton = this.parentNode.querySelectorAll(".save-btn")[0];
  const cancelButton = this.parentNode.querySelectorAll(".cancel-btn")[0];
  console.log(cancelButton.classList);
  editButton.classList.remove("d-none");
  saveButton.classList.add("d-none");
  cancelButton.classList.add("d-none");
}
