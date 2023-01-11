// Import required libraries
const express = require("express");
const mongoose = require("mongoose");
const Faker = require("faker");

// Connect to MongoDB
mongoose.connect("mongodb://localhost/mydb", { useNewUrlParser: true });

// Create a Mongoose model for posts
const Post = mongoose.model("Post", {
  title: String,
  body: String,
  createdAt: Date
});

// Generate sample data and insert into the database
for (let i = 0; i < 100; i++) {
  const post = new Post({
    title: Faker.lorem.sentence(),
    body: Faker.lorem.paragraph(),
    createdAt: Faker.date.past()
  });
  post.save();
}

// Create an Express app
const app = express();

// Define a route to handle paginated posts
app.get("/posts", (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;

  // Find and return paginated posts
  Post.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .then(posts => res.json(posts));
});

// Start the Express app
app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
