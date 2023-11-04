import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';

dotenv.config();

const { DB_URI, PORT } = process.env;

// Connecting to Mongo using mongoose
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB');
    console.log(err);
  });

// Close the db when node process stops
process.on('SIGINT', () => {
  mongoose.connection
    .close(() => {
      process.exit(0);
    })
    .then(() => {
      console.log('Disconnected from MongoDB!');
    });
});
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
