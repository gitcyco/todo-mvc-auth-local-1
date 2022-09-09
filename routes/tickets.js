const express = require("express");
const router = express.Router();
const ticketsController = require("../controllers/tickets");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", ensureAuth, ticketsController.getTickets);
router.post("/createTicket", ensureAuth, ticketsController.createTicket);
router.put("/markComplete", ensureAuth, ticketsController.markComplete);
router.put("/markIncomplete", ensureAuth, ticketsController.markIncomplete);
router.put("/toggleComplete", ensureAuth, ticketsController.toggleComplete);
router.put("/updateTicket", ensureAuth, ticketsController.updateTicket);
router.delete("/deleteTicket", ensureAuth, ticketsController.deleteTicket);

module.exports = router;
