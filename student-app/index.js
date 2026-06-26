const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/collegeDB")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ Connection Failed:", err));

// Schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 5, max: 100 },
  email: { type: String, required: true, unique: true },
  admissionDate: { type: Date, default: Date.now },
});

// Model
const Student = mongoose.model("Student", studentSchema);

// Create Document
const createStudent = async () => {
  try {
    const student = new Student({
      name: "Priya Verma",
      age: 22,
      email: "priya@example.com",
    });

    const result = await student.save();
    console.log("✅ Student saved:", result);

  } catch (error) {
    console.error("❌ Error:", error.message);
  }
};

createStudent();
