require('dotenv').config();
const { Pool } = require('pg');
const set = require('../set');

const fallbackUrl = "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9";
const connectionString = typeof set.DATABASE_URL === 'string' && set.DATABASE_URL.startsWith('postgres')
    ? set.DATABASE_URL
    : fallbackUrl;

const proConfig = {
    connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
};

let poolInstance = null;

function getPool() {
    if (poolInstance)
        return poolInstance;
    try {
        poolInstance = new Pool(proConfig);
        poolInstance.on('error', (err) => {
            console.error('Postgres pool error:', err?.message || err);
        });
        return poolInstance;
    }
    catch (error) {
        console.error('Failed to initialize Postgres pool:', error?.message || error);
        poolInstance = null;
        return null;
    }
}

const pool = {
    async query(text, params) {
        const p = getPool();
        if (!p)
            throw new Error('Postgres pool unavailable');
        return p.query(text, params);
    },
    async connect() {
        const p = getPool();
        if (!p)
            throw new Error('Postgres pool unavailable');
        return p.connect();
    },
};

module.exports = pool;
