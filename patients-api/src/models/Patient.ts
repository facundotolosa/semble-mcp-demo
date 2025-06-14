import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
	title: String,
	status: String,
	firstName: String,
	lastName: String,
	fullName: String,
	dob: String,
	gender: String,
	email: String,
	occupation: String,
	createdAt: { type: String, default: new Date().toISOString() },
	updatedAt: { type: String, default: new Date().toISOString() }
});

patientSchema.pre('save', function (next) {
	this.fullName = `${this.firstName} ${this.lastName}`.trim();
	this.updatedAt = new Date().toISOString();
	next();
});

export const Patient = mongoose.model('Patient', patientSchema);
