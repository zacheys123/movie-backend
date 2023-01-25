import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import adminRoutes from './routes/admin.js';
import userRoutes from './routes/user.js';
import movieRoutes from './routes/movie_route.js';
dotenv.config();

const app = express();

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, DELETE, PUT',
	);
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});
app.use(morgan('dev'));
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

// routes

app.use('/', adminRoutes);

app.use('/movie', movieRoutes);
app.use('/user/v2', userRoutes);
//

const PORT = process.env.PORT || 4000;
mongoose.set('strictQuery', true);
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		app.listen(PORT, () => {
			console.log('Listening on port ' + PORT);
		});
	})
	.catch((error) => console.log(error.message));
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Mongoose is Connected'));
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// if (process.env.NODE_ENV === 'production') {
// 	app.use(
// 		express.static(path.join(__dirname, 'admin_client', 'build')),
// 	);
// 	app.get('*', (req, res) => {
// 		res.sendFile(
// 			path.resolve(__dirname, 'admin_client', 'build', 'index.html'),
// 		);
// 	});
