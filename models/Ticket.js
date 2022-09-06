const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  ticket: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  urgency: {
    type: String,
    required: true,
  },
  assignedBy: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Ticket", TicketSchema);
