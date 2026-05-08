/**
 * Database abstraction layer with connection pooling and dynamic driver loading.
 * This is the ultimate "safety" version for Hostinger deployment.
 */

let pool: any = null;

/**
 * Lazy-initializes the database pool using dynamic imports.
 * This ensures the application can boot even if the database driver
 * encounters environment-specific issues on the server.
 */
async function getPool() {
    if (pool) return pool;

    try {
        // Dynamic import to prevent startup crashes if the module fails to load at the top level
        const mysql = await import('mysql2/promise');

        const config = {
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 10000,
        };

        if (!config.user || !config.password) {
            console.warn('[DB] Database credentials missing in environment variables.');
        }

        pool = mysql.createPool(config);
        return pool;
    } catch (error: any) {
        console.error('[DB] CRITICAL: Failed to load MySQL driver or initialize pool:', error.message);
        // Return a mock that allows the app to stay live but logs errors on data access
        return {
            execute: async () => {
                throw new Error("Database driver failed to load: " + error.message);
            }
        };
    }
}

/**
 * Execute a SQL query with standard error handling.
 */
export async function query(sql: string, params?: any[]) {
    try {
        const p = await getPool();
        const [results] = await p.execute(sql, params);
        return results;
    } catch (error: any) {
        console.error(`[DB] Query failed: ${error.message}`);
        throw error;
    }
}

export default getPool;
