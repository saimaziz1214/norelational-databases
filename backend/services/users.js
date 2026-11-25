const User = require("../models/user");

async function findAll() {
  return User.find();
}

async function findById(id) {
  return User.findById(id);
}

async function create(body) {
  return User.create(body);
}

async function update(id, body) {
  return User.findByIdAndUpdate(id, body, { new: true });
}

async function remove(id) {
  return User.findByIdAndDelete(id);
}

module.exports = { findAll, findById, create, update, remove };