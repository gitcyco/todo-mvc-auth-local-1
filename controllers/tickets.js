const Ticket = require("../models/Ticket");

module.exports = {
  getTickets: async (req, res) => {
    console.log(req.user);
    try {
      const ticketItems = await Ticket.find({ userId: req.user.id });
      const itemsLeft = await Ticket.countDocuments({ userId: req.user.id, completed: false });
      res.render("tickets.ejs", { tickets: ticketItems, left: itemsLeft, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createTicket: async (req, res) => {
    try {
      await Ticket.create({
        ticket: req.body.ticketItem,
        completed: false,
        userId: req.user.id,
        urgency: req.body.urgency,
      });
      console.log("Ticket has been added!");
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
