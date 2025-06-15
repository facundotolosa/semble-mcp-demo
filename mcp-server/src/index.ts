import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { QueryController } from './controllers/queryController';
import helmet from 'helmet';
import morgan from 'morgan';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const queryController = new QueryController();

app.use(cors());
app.options('*', cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.post('/v1/api/query', (req, res) => queryController.handleQuery(req, res));

app.listen(Number(PORT), HOST, () => {
	console.log(`MCP Server is running at http://${HOST}:${PORT}/v1/api/query`);
});
