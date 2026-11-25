const Post = require("../models/post");

async function findAll() {
  return Post.find().populate("author", "name email avatar");
}

async function findById(id) {
  return Post.findById(id).populate("author", "name email avatar");
}

async function create(body) {
  const post = await Post.create(body);
  return post.populate("author", "name email avatar");
}

async function update(id, body) {
  return Post.findByIdAndUpdate(id, body, { new: true }).populate("author", "name email avatar");
}

async function remove(id) {
  return Post.findByIdAndDelete(id);
}

module.exports = { findAll, findById, create, update, remove };