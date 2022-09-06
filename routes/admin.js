const express = require("express");
const router = express.Router();
const ticketsController = require("../controllers/tickets");
const adminController = require("../controllers/admin");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", ensureAuth, adminController.getAdmin);
router.post("/createUser", ensureAuth, adminController.createUser);
router.delete("/deleteUser", ensureAuth, adminController.deleteUser);

module.exports = router;
