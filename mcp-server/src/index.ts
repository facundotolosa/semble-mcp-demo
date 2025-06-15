import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { QueryController } from './controllers/queryController';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const queryController = new QueryController();

const corsOptions = {
	origin: ['http://localhost:5173', 'https://semble-mcp-demo.fly.dev'], // Add your frontend URL
	credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.post('/v1/api/query', (req, res) => queryController.handleQuery(req, res));

app.listen(port, () => {
	console.log(`MCP Server is running on port ${port}`);
});
