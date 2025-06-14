import 'dotenv/config';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from './types/schema';
import { resolvers } from './resolvers/patientResolver';
import { connectDB } from './config/database';

const app = express();
const PORT = process.env.PORT || 4000;

async function startServer() {
	await connectDB();

	const server = new ApolloServer({
		typeDefs,
		resolvers
	});

	await server.start();

	app.use(express.json());
	app.use('/graphql', expressMiddleware(server));

	app.listen(PORT, () => {
		console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);
	});
}

startServer().catch(error => {
	console.error('Error starting server:', error);
	process.exit(1);
});
