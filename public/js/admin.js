// Init performs the basic page setup, register event handlers, a bit of formatting and so on
init();

function init() {
  const deleteBtn = document.querySelectorAll(".del");
  // const ticketItem = document.querySelectorAll("span.not");
  // const ticketComplete = document.querySelectorAll("span.completed");
  const completedCheck = document.querySelectorAll(".completedCheckBox");
  const editButtons = document.querySelectorAll(".edit-btn");
  const saveButtons = document.querySelectorAll(".save-btn");
  const cancelButtons = document.querySelectorAll(".cancel-btn");
  const disabledElements = document.querySelectorAll(
    ".assignedToSelect, .completedCheckBox, .deleteBtn, .ticketTextBox"
  );

  try {
    console.log("initialize page");
    disableElements(disabledElements);

    Array.from(deleteBtn).forEach((el) => {
      el.addEventListener("click", deleteUser);
    });

    // Array.from(completedCheck).forEach((el) => {
    //   el.addEventListener("click", toggleComplete);
    // });

    Array.from(editButtons).forEach((el) => {
      el.addEventListener("click", editRow);
    });

    Array.from(saveButtons).forEach((el) => {
      el.addEventListener("click", saveRowEdit);
    });

    Array.from(cancelButtons).forEach((el) => {
      el.addEventListener("click", cancelRowEdit);
    });
  } catch (error) {
    console.error(error);
  }
}

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
  const rowItems = getRowItems(this);

  console.log("EDIT!", rowItems);

  hideElements(rowItems.editButton);
  showElements([rowItems.saveButton, rowItems.cancelButton]);
  enableElements(rowItems.disabledElements);
}

async function saveRowEdit(event) {
  const rowItems = getRowItems(this);

  console.log("SAVE!", rowItems);

  hideElements([rowItems.saveButton, rowItems.cancelButton]);
  showElements(rowItems.editButton);
  disableElements(rowItems.disabledElements);

  try {
    const response = await fetch("tickets/updateTicket", {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        ticketId: rowItems.ticketId,
        ticketText: rowItems.ticket,
        urgency: rowItems.urgency,
        assignedToId: rowItems.assignedTableUser,
        completedCheckBox: rowItems.completedCheckBox,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log("SAVE ERROR:", err);
  }
}

async function cancelRowEdit(event) {
  const rowItems = getRowItems(this);

  console.log("CANCEL!", rowItems.ticketId);

  console.log(rowItems.cancelButton.classList);
  hideElements([rowItems.saveButton, rowItems.cancelButton]);
  showElements(rowItems.editButton);
  disableElements(rowItems.disabledElements);

  try {
    console.log("cancel changes, revert to previous");
  } catch (error) {
    console.error(error);
  }
}

function hideElements(elements) {
  if (Array.isArray(elements)) {
    elements.forEach((el) => el.classList.add("d-none"));
  } else {
    elements.classList.add("d-none");
  }
}

function showElements(elements) {
  if (Array.isArray(elements)) {
    elements.forEach((el) => el.classList.remove("d-none"));
  } else {
    elements.classList.remove("d-none");
  }
}

function enableElements(elements) {
  if (elements instanceof NodeList) {
    elements.forEach((el) => {
      if (el.nodeName == "TD") {
        el.contentEditable = "true";
      } else el.disabled = false;
    });
  } else {
    if (elements.nodeName == "TD") {
      elements.contentEditable = "true";
    } else elements.disabled = false;
  }
}

function disableElements(elements) {
  if (elements instanceof NodeList) {
    elements.forEach((el) => {
      if (el.nodeName == "TD") {
        el.contentEditable = "false";
      } else el.disabled = true;
    });
  } else {
    if (elements.nodeName == "TD") {
      elements.contentEditable = "false";
    } else elements.disabled = true;
  }
}

function getRowItems(rowChild) {
  const parent = rowChild.parentNode;
  const currentRow = parent.parentNode;

  return {
    ticketId: parent.dataset.id,
    editButton: currentRow.querySelectorAll(".edit-btn")[0],
    saveButton: currentRow.querySelectorAll(".save-btn")[0],
    cancelButton: currentRow.querySelectorAll(".cancel-btn")[0],
    disabledElements: currentRow.querySelectorAll(`.assignedToSelect, .completedCheckBox, .deleteBtn, .ticketTextBox`),
    ticketTextBox: document.getElementById(`ticket-${parent.dataset.id}`),
    ticket: document.getElementById(`ticket-${parent.dataset.id}`).innerText,
    urgency: document.getElementById(`urgency-${parent.dataset.id}`).innerText,
    assignedFromUserName: document.getElementById(`assignedFromUserName-${parent.dataset.id}`).innerText,
    assignedTableUser: document.getElementById(`assignedTableUser-${parent.dataset.id}`).value,
    completedCheckBox: document.getElementById(`completedCheckBox-${parent.dataset.id}`).checked,
  };
}
