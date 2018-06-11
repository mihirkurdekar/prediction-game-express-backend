import mysql from 'mysql';

export class Connection {
    static getConnection(): mysql.Connection {
        return mysql.createConnection({
            host: '',
            user: '',
            password: '',
            database: ''
        });
    }
}