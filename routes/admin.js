const express = require("express");
const router = express.Router();
const ticketsController = require("../controllers/tickets");
const adminController = require("../controllers/admin");
const { ensureAuth, ensureAdmin } = require("../middleware/auth");

router.get("/", ensureAdmin, adminController.getAdmin);
router.get("/tickets", ensureAdmin, adminController.getAdminTickets);
router.post("/createUser", ensureAdmin, adminController.createUser);
router.delete("/deleteUser", ensureAdmin, adminController.deleteUser);

module.exports = router;
