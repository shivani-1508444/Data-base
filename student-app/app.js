const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(() => console.log("connected to MongoDB"))    
.catch((err) => console.log("connect failed :" ,err));


// Define student schema
const studentSchema = new mongoose.Schema({
  name : { type: String, required: true },
  age : { type: Number, required: true },
  course : { type: String, default: "MERN Stack" }
});

// Create model
const Student = mongoose.model("Student", studentSchema);




// craete a new student 
const students = [
  { name: "Riya", age: 20 },
  { name: "Karan", age: 25, course: "DevOps" },
  { name: "Neha", age: 19 }
];

Student.insertMany(students)

.then(() => {
    console.log("✅ Student saved successfully!");
    mongoose.connection.close(); // Close connection after save
  })
  .catch((err) => {
    console.log("❌ Error saving student:", err);
  });

