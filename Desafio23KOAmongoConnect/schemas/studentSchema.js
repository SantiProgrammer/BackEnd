
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    dni: { type: String, required: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    subject: { type: String, required: true },
    note: { type: Number, required: true }
});

const Student = mongoose.model("Students", StudentSchema);

module.exports = Student;