import dotenv from 'dotenv';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { typeDefs } from './types/schema';
import { resolvers } from './resolvers/patientResolver';
import { connectDB } from './config/database';
import helmet from 'helmet';
import morgan from 'morgan';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const corsOptions = {
	origin: ['http://localhost:5173', 'http://localhost:3000', 'https://semble-mcp-demo.fly.dev'],
	credentials: true
};

async function startServer() {
	await connectDB();

	const server = new ApolloServer({
		typeDefs,
		resolvers
	});

	await server.start();

	app.use(helmet());
	app.use(morgan('dev'));
	app.use(express.json());
	app.use('/graphql', cors(corsOptions), expressMiddleware(server));

	app.listen(Number(PORT), HOST, () => {
		console.log(`Server running at http://${HOST}:${PORT}/graphql`);
	});
}

startServer().catch(error => {
	console.error('Error starting server:', error);
	process.exit(1);
});
