import mysql from 'mysql';
import { Connection } from '../connection-config';
import { Observable } from 'rxjs';
import { User } from '../user';
export class LoginService {
    checkLogin(user: User): Observable<boolean> {
        return new Observable<boolean>((observer) => {
            try {
                Connection.getConnectionPool().getConnection(function (err, connection) {
                    // Use the connection
                    if (err) { // error
                        observer.error(err);
                    }
                    connection.query("SELECT username FROM `users` WHERE BINARY `username`='" + user.username + "' AND BINARY `password`='" + user.password + "';",
                        function (err: any, result: any, fields: any) {
                            if (err) { // error
                                observer.error(err);
                            } else { // success
                                console.log(result);
                                if (result.length > 0) {
                                    observer.next(true);
                                } else {
                                    observer.next(false);
                                }

                                observer.complete();
                            }
                        });
                    connection.release();
                });

            }
            catch (e) { // exception
                observer.error(e);
                observer.complete();
            }
        });
    }
}
