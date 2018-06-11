import mysql from 'mysql';
import { Connection } from '../connection-config';
import { Observable } from 'rxjs';
import { User } from '../user';
export class RegisterService {
    connection: mysql.Connection;
    constructor() {
        this.connection = Connection.getConnection();
    }
    insertUser(user: User): Observable<string> {
        return new Observable<string>((observer) => {
            try {
                this.connection.query("INSERT INTO `users` (`username`,`email`,`password`) VALUES ('" + user.username + "','" + user.email + "','" + user.password + "');",
                    function (err: any, result: any, fields: any) {
                        if (err) { // error
                            observer.error(err);
                        } else { // success
                            observer.next();
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
