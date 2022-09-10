# Introduction

## A Simple Ticket Management App that is built using the MVC Architecture, we have also implemented "authorization" so folx can sign up, customize & personalize the app

---

# Overview of features

- Allows users to create tickets of varying priority.
- Users can assign tickets to other users on the system.
- Has an Admin interface to allow admin users to manage tickets and other users.
- Admins can edit tickets, reassign, etc.

---

# Packages/Dependencies used

bcrypt, connect-mongo, dotenv, ejs, express, express-flash, express-session, mongoose, morgan, nodemon, passport, passport-local, validator

---

# Install all the dependencies or node packages used for development via Terminal

`npm install`

---

# Things to add

- Create a `.env` file and add the following as `key: value`
  - PORT: 2121 (can be any port example: 3000)
  - DB_STRING: `your database URI`
  - Set the 'isAdmin' field to 'true' in a user record in the Users collection to give a user admin access.
  ***
