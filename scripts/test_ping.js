const http = require('http');
const PORT = process.env.PORT || 8000;

const options = {
    hostname: '127.0.0.1',
    port: PORT,
    path: '/',
    method: 'GET',
    timeout: 5000
};

const req = http.request(options, (res) => {
    console.log('statusCode:', res.statusCode);
    res.on('data', (chunk) => process.stdout.write(chunk));
});

req.on('error', (e) => {
    console.error('Request error:', e.message);
});

req.on('timeout', () => {
    console.error('Request timed out');
    req.abort();
});

req.end();

// Run: node scripts/test_ping.js
