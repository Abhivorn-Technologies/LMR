const https = require('https');
const fs = require('fs');
const path = require('path');

const urls = [
  "https://www.godigit.com/content/dam/godigit/directportal/en/car-insurance/comprehensive-car-insurance-1.svg",
  "https://www.godigit.com/content/dam/godigit/directportal/en/car-insurance/third-party-car-insurance-1.svg",
  "https://www.godigit.com/content/dam/godigit/directportal/en/car-insurance/add-on-covers.svg",
  "https://www.godigit.com/content/dam/godigit/directportal/en/car-insurance/ncb-1.svg",
  "https://www.godigit.com/content/dam/godigit/directportal/en/car-insurance/cashless-garages-1.svg",
  "https://www.godigit.com/content/dam/godigit/directportal/en/car-insurance/personal-accident-cover.svg",
  "https://www.godigit.com/content/dam/godigit/directportal/en/car-insurance/which-policy-is-right.svg"
];

const outDir = path.join(__dirname, 'public', 'assets', 'godigit');

if (!fs.existsSync(outDir)){
    fs.mkdirSync(outDir, { recursive: true });
}

urls.forEach(url => {
  const filename = path.basename(url);
  const dest = path.join(outDir, filename);
  
  const options = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  };

  https.get(url, options, (res) => {
    if (res.statusCode === 200) {
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename}`);
      });
    } else {
      console.log(`Failed to download ${filename}: ${res.statusCode}`);
    }
  }).on('error', (err) => {
    console.error(`Error downloading ${filename}: ${err.message}`);
  });
});
