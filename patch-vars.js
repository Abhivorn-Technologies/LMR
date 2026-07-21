const fs = require('fs');
const path = require('path');
const d1 = path.join('node_modules/sanity/lib');
const d2 = path.join('node_modules/sanity/lib/_chunks-es');

function patch(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) return;
    if (f.endsWith('.js')) {
      let c = fs.readFileSync(p, 'utf8');
      if (!c.includes('var forwardRef = require("react").forwardRef;')) {
        const injected = `var forwardRef = require("react").forwardRef;
var memo = require("react").memo;
var Component = require("react").Component;
var PureComponent = require("react").PureComponent;
var Fragment = require("react").Fragment;
var Suspense = require("react").Suspense;
var createContext = require("react").createContext;
var createElement = require("react").createElement;
var Children = require("react").Children;
var createRef = require("react").createRef;
var lazy = require("react").lazy;
var useEffect = require("react").useEffect;
var useState = require("react").useState;
var useMemo = require("react").useMemo;
var useCallback = require("react").useCallback;
var useRef = require("react").useRef;
var useLayoutEffect = require("react").useLayoutEffect;
var useContext = require("react").useContext;
`;
        fs.writeFileSync(p, injected + c);
        console.log('Patched ' + f);
      }
    }
  });
}

patch(d1);
patch(d2);
