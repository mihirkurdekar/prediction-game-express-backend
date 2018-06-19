import mysql from 'mysql';
import { Connection } from '../connection-config';
import { Observable } from 'rxjs';
import { User } from '../user';
export class RegisterService {
    insertUser(user: User): Observable<string> {
        return new Observable<string>((observer) => {
            try {
                Connection.getConnectionPool().getConnection(function (err, connection) {
                    // Use the connection
                    if (err) { // error
                        observer.error(err);
                    }
                    connection.query("INSERT INTO `users` (`username`,`email`,`password`) VALUES ('" + user.username + "','" + user.email + "','" + user.password + "');",
                        function (err: any, result: any, fields: any) {
                            if (err) { // error
                                observer.error(err);
                            } else { // success
                                observer.next();
                                observer.complete();
                            }
                        })
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
