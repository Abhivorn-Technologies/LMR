import dbConnect from './src/lib/db';
import Content from './src/models/Content';

async function resetHome() {
  await dbConnect();
  await Content.findOneAndDelete({ key: 'home:hero' });
  console.log('Deleted old home:hero data. Editor will now load the new Blocks defaults!');
  process.exit(0);
}

resetHome();
