import mysql from 'mysql';
import { Connection } from '../connection-config';
import { Observable } from 'rxjs';
import { User } from '../user';
export class UsersService {
    connection: mysql.Connection;
    constructor() {
        this.connection = Connection.getConnection();
    }
    getUsers(): Observable<Array<User>> {
        return new Observable<Array<User>>((observer) => {
            try {
                this.connection.query("SELECT `username`,`points_won`,`points_lost`FROM `users` ORDER BY `points_won` ASC;",
                    function (err: any, result: any, fields: any) {
                        if (err) { // error
                            observer.error(err);
                        } else { // success
                            observer.next(result);
                            observer.complete();
                        }
                    });
            }
            catch (e) { // exception
                observer.error(e);
                observer.complete();
            }
            return () => { // Close db connection on disposal
                /* this.connection.end();
                this.connection.destroy(); */
            };
        });
    }
}
