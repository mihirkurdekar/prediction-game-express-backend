import mysql from 'mysql';

export class Connection {

    private static connection: mysql.Connection;

    static getConnection(): mysql.Connection {
        if (this.connection && this.connection != null) {

        } else {
            this.connection = mysql.createConnection({
                host: '',
                user: '',
                password: '',
                database: 'worldcup'
            });
        }
        return this.connection;
    }
}