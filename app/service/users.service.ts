import mysql from 'mysql';
import { Connection } from '../connection-config';
import { Observable } from 'rxjs';
import { User } from '../user';
export class UsersService {


    getUsers(): Observable<Array<User>> {
        return new Observable<Array<User>>((observer) => {
            try {
                Connection.getConnectionPool().getConnection(function (err, connection) {
                    // Use the connection
                    if (err) { // error
                        observer.error(err);
                    }
                    connection.query("SELECT `username`,`points_won`,`points_lost`FROM `users` ORDER BY `points_won` ASC;",
                        function (err: any, result: any, fields: any) {
                            if (err) { // error
                                observer.error(err);
                            } else { // success
                                observer.next(result);
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
