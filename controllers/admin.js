const { isObjectIdOrHexString } = require("mongoose");
const Ticket = require("../models/Ticket");
const User = require("../models/User");

// TODO:  Delete tickets from the deleted user
//        Change users to/from Admin status
//        Add new users
//        Reassign tickets

module.exports = {
  getAdmin: async (req, res) => {
    // console.log(req.user);
    try {
      const allUsers = await User.find({}, { password: 0 });
      const adminUser = await User.find({ userName: req.user.userName, isAdmin: true }, { password: 0, email: 0 });
      const ticketItems = await Ticket.find({ userId: req.user.id });
      const itemsLeft = await Ticket.countDocuments({ userId: req.user.id, completed: false });
      res.render("userAdmin.ejs", {
        tickets: ticketItems,
        left: itemsLeft,
        user: req.user,
        users: allUsers,
        isAdmin: adminUser.length > 0 ? true : false,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getAdminTickets: async (req, res) => {
    // console.log(req.user);
    try {
      const allUsers = await User.find({}, { password: 0, email: 0 });
      const adminUser = await User.find({ userName: req.user.userName, isAdmin: true }, { password: 0, email: 0 });
      // const ticketItems = await Ticket.find({});
      const itemsLeft = await Ticket.countDocuments({ completed: false });

      // console.log(ticketItems);

      // List of users, adds an additional field for the string representation of the objectId(_id)
      const allUsersAgg = await User.aggregate([
        {
          $project: {
            userId: { $toString: "$_id" },
            userName: 1,
            email: 1,
          },
        },
      ]);

      // console.log("allUsersAgg: ", allUsersAgg);

      // ticketItems combines the tickets with data from the users collection
      // so its all available in a single array.
      const ticketItems = await Ticket.aggregate([
        { $addFields: { userObjectId: { $toObjectId: "$userId" } } },
        { $addFields: { assignedUserObjectId: { $toObjectId: "$assignedBy" } } },
        {
          $lookup: {
            from: "users",
            localField: "userObjectId",
            foreignField: "_id",
            as: "currentUser",
          },
        },
        {
          $set: {
            assignedToUserName: "$currentUser.userName",
            assignedToId: "$currentUser._id",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "assignedUserObjectId",
            foreignField: "_id",
            as: "assignedFrom",
          },
        },
        {
          $set: {
            assignedFromUserName: "$assignedFrom.userName",
            assignedFromId: "$assignedFrom._id",
          },
        },
        {
          $unwind: "$assignedToUserName",
        },
        {
          $unwind: "$assignedFromUserName",
        },
        {
          $project: {
            assignedFrom: 0,
            currentUser: 0,
          },
        },
      ]);

      // console.log("JOINED:", ticketItems);

      res.render("ticketsAdmin.ejs", {
        tickets: ticketItems,
        left: itemsLeft,
        user: req.user,
        users: allUsersAgg,
        isAdmin: adminUser.length > 0 ? true : false,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createUser: async (req, res) => {
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

  deleteUser: async (req, res) => {
    // console.log(req.body.userIdFromJSFile);
    try {
      await User.findOneAndDelete({ _id: req.body.userIdFromJSFile });
      console.log("Deleted User");
      res.json("Deleted It");
    } catch (err) {
      console.log(err);
    }
  },
};
