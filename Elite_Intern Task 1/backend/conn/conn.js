const mongoose = require("mongoose");

const conn = async () => {
  try {
    await mongoose.connect("mongodb+srv://user:user*1234@cluster0.erqzl.mongodb.net/");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

conn();
