import mysql from 'mysql';
import { Connection } from '../connection-config';
import { Observable } from 'rxjs';
import { User } from '../user';
export class LoginService {
    connection: mysql.Connection;
    constructor() {
        this.connection = Connection.getConnection();
    }
    checkLogin(user: User): Observable<boolean> {
        return new Observable<boolean>((observer) => {
            try {
                this.connection.query("SELECT username FROM `users` WHERE `username`='" + user.username + "' AND `password`='" + user.password + "';",
                    function (err: any, result: any, fields: any) {
                        if (err) { // error
                            observer.error(err);
                        } else { // success
                            console.log(result);
                            if(result.length >0 ){
                                observer.next(true);
                            }else{
                                observer.next(false);
                            }
                            
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
