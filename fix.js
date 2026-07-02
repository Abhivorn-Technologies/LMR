const fs = require('fs');
const path = require('path');

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (full.endsWith('page.tsx')) {
      let content = fs.readFileSync(full, 'utf8');
      content = content.replace('`nimport { createPageMetadata } from "@/lib/metadata";', '\nimport { createPageMetadata } from "@/lib/metadata";');
      fs.writeFileSync(full, content);
    }
  });
}

walk('src/app');
