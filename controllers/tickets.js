const Ticket = require("../models/Ticket");
const User = require("../models/User");

module.exports = {
  getTickets: async (req, res) => {
    console.log(req.user);
    try {
      const allUsers = await User.find({}, { password: 0, email: 0 });
      const ticketItems = await Ticket.find({ userId: req.user.id });
      const itemsLeft = await Ticket.countDocuments({ userId: req.user.id, completed: false });
      res.render("tickets.ejs", { tickets: ticketItems, left: itemsLeft, user: req.user, users: allUsers });
    } catch (err) {
      console.log(err);
    }
  },
  createTicket: async (req, res) => {
    const validationErrors = [];
    if (req.body.ticketItem == "") validationErrors.push({ msg: "Please enter ticket information." });
    if (req.body.urgency == "") validationErrors.push({ msg: "Please enter urgency." });
    if (validationErrors.length) {
      req.flash("errors", validationErrors);
      return res.redirect("/tickets");
    }
    try {
      await Ticket.create({
        ticket: req.body.ticketItem,
        completed: false,
        // userId: req.user.id,
        userId: req.body.assignedUser,
        urgency: req.body.urgency,
        assignedBy: req.user.id,
      });
      console.log("Ticket has been added!");
      console.log("Assigned to user: ", req.body.assignedUser, "by", req.user.id);
      res.redirect("/tickets");
    } catch (err) {
      console.log(err);
    }
  },
  markComplete: async (req, res) => {
    try {
      await Ticket.findOneAndUpdate(
        { _id: req.body.ticketIdFromJSFile },
        {
          completed: true,
        }
      );
      console.log("Marked Complete");
      res.json("Marked Complete");
    } catch (err) {
      console.log(err);
    }
  },
  markIncomplete: async (req, res) => {
    try {
      await Ticket.findOneAndUpdate(
        { _id: req.body.ticketIdFromJSFile },
        {
          completed: false,
        }
      );
      console.log("Marked Incomplete");
      res.json("Marked Incomplete");
    } catch (err) {
      console.log(err);
    }
  },
  deleteTicket: async (req, res) => {
    console.log(req.body.ticketIdFromJSFile);
    try {
      await Ticket.findOneAndDelete({ _id: req.body.ticketIdFromJSFile });
      console.log("Deleted Ticket");
      res.json("Deleted It");
    } catch (err) {
      console.log(err);
    }
  },
};
