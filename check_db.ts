import dbConnect from './src/lib/db';
import Content from './src/models/Content';
import PageMetadata from './src/models/PageMetadata';

async function checkDb() {
  await dbConnect();
  
  const content = await Content.findOne({ key: 'page:home' });
  console.log('CONTENT:', content);
  
  const meta = await PageMetadata.findOne({ key: 'page:home' });
  console.log('META:', meta);

  process.exit(0);
}

checkDb();
