const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://arunajyothi:Aruna1234567@cluster0.urgk8.mongodb.net/lmb_cms?appName=Cluster0')
  .then(async () => {
    console.log('Connected to DB');
    const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', new mongoose.Schema({}, { strict: false }));
    const result = await PageContent.deleteMany({ key: { $in: ['/about', '/about-us'] } });
    console.log('Deleted contents:', result.deletedCount);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
