import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import Content from './src/models/Content';

async function run() {
  await mongoose.connect(process.env.MONGODB_URI!);
  
  const page = await mongoose.connection.db?.collection('contents').find({}).limit(2).toArray();
  console.log(JSON.stringify(page, null, 2));
  
  process.exit(0);
}
run();
