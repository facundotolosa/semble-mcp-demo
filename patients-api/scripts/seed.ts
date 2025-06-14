import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
import { Patient } from '../src/models/Patient';

mongoose.connect(process.env.MONGODB_URI!);

const patients = JSON.parse(fs.readFileSync(`${__dirname}/../_data/patients.json`, 'utf-8'));

const importData = async () => {
	try {
		await Patient.create(patients);
		console.log('✅ Data imported successfully...');
		process.exit();
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

const deleteData = async () => {
	try {
		await Patient.deleteMany();
		console.log('🗑️ Data deleted successfully...');
		process.exit();
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

if (process.argv[2] === '-i') {
	importData();
} else if (process.argv[2] === '-d') {
	deleteData();
} else {
	console.log('Please use -i (import) or -d (delete) flags to run the script.');
	process.exit();
}
