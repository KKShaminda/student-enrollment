const { Schema, model } = require('mongoose');


const studentSchema = new Schema(
{
name: {
type: String,
required: true,
trim: true
},
email: {
type: String,
required: true,
unique: true
},
phone: {
type: String,
required: true
},
course: {
type: String,
required: true
},
status: {
type: String,
enum: ['Active', 'Pending', 'Completed'],
default: 'Pending'
}
},
{ timestamps: true }
);


module.exports = model('Student', studentSchema);