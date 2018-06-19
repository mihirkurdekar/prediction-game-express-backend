import mysql from 'mysql';

export class Connection {

    private static pool: mysql.Pool;

    constructor() {

    }
    static getConnectionPool(): mysql.Pool {
        if (!this.pool || this.pool == null) {
            this.pool = mysql.createPool({
                host: '',
                user: '',
                password: '',
                database: ''
            });
        }
        return this.pool;
    }
}