import 'dotenv/config'
import mongoose from 'mongoose';
import express from 'express';

const app = express();
const url = process.env.MONGO_URI

mongoose.connect(url)
	.then(() => console.log('Connected to MongoDB.'))
	.catch(error => console.log('Error connecting to Mongo: ', error.message))

app.get('/', (req, res) => {
  res.send('');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Backend listening on ${port}`)
});