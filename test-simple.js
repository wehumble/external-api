// Simple test to check syntax
const fs = require('fs');
const code = fs.readFileSync('index.js', 'utf8');
console.log('Code length:', code.length);
console.log('First 200 chars:', code.substring(0, 200));
try {
  eval(code);
  console.log('Syntax is OK');
} catch (e) {
  console.log('Syntax error:', e.message);
}
