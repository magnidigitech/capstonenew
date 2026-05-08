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
async function initializeTables(activePool: any) {
    try {
        console.log('[DB] Ensuring database tables exist...');
        
        // 1. Customers Table
        await activePool.execute(`
            CREATE TABLE IF NOT EXISTS customers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                phone VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(255),
                location VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 2. Quote Requests Table
        await activePool.execute(`
            CREATE TABLE IF NOT EXISTS quote_requests (
                id INT AUTO_INCREMENT PRIMARY KEY,
                customer_id INT NOT NULL,
                package_id VARCHAR(50),
                request_date DATE,
                length_ft DECIMAL(10,2),
                width_ft DECIMAL(10,2),
                base_area_sqft DECIMAL(10,2),
                floors INT,
                total_area_sqft DECIMAL(10,2),
                estimated_total_cost DECIMAL(15,2),
                source VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 3. Packages Table
        await activePool.execute(`
            CREATE TABLE IF NOT EXISTS packages (
                id INT AUTO_INCREMENT PRIMARY KEY,
                package_name VARCHAR(100) NOT NULL,
                rate_per_sqft DECIMAL(10,2) NOT NULL,
                features TEXT,
                materials_json TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        console.log('[DB] Database tables verified and ready.');
    } catch (error: any) {
        console.error('[DB] Error during table verification/creation:', error.message);
    }
}

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
        
        // Auto-initialize tables
        await initializeTables(pool);
        
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
