const fs = require('fs');
const path = require('path');
const d = path.join(process.cwd(), 'node_modules/sanity');
function walk(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (p.endsWith('.js') || p.endsWith('.mjs')) {
      let c = fs.readFileSync(p, 'utf8');
      if (c.includes('useEffectEvent')) {
        let changed = false;
        if (c.match(/import\s*\{\s*[^}]*useEffectEvent[^}]*\}\s*from\s*['"]react['"]/g)) {
          c = c.replace(/import\s*\{\s*[^}]*useEffectEvent[^}]*\}\s*from\s*['"]react['"]/g, 
            'const useEffectEvent = (fn) => { const ref = require("react").useRef(fn); require("react").useLayoutEffect(() => { ref.current = fn; }); return (...args) => (0, ref.current)(...args); };');
          changed = true;
        }
        if (c.match(/const\s*\{\s*[^}]*useEffectEvent[^}]*\}\s*=\s*require\(['"]react['"]\)/g)) {
          c = c.replace(/const\s*\{\s*[^}]*useEffectEvent[^}]*\}\s*=\s*require\(['"]react['"]\)/g, 
            'const useEffectEvent = (fn) => { const ref = require("react").useRef(fn); require("react").useLayoutEffect(() => { ref.current = fn; }); return (...args) => (0, ref.current)(...args); };');
          changed = true;
        }
        // Check for specific _chunks-es replacements
        if (c.includes('react_WEBPACK_IMPORTED_MODULE') && c.includes('useEffectEvent')) {
          c = c.replace(/\(\d+,\s*[^.]+\.useEffectEvent\)/g, '( (fn) => { const ref = require("react").useRef(fn); require("react").useLayoutEffect(() => { ref.current = fn; }); return (...args) => (0, ref.current)(...args); } )');
          changed = true;
        }
        if (changed) {
          fs.writeFileSync(p, c);
          console.log('Patched: ' + p);
        }
      }
    }
  });
}
walk(d);
