import mysql from 'mysql';
import { Connection } from '../connection-config';
import { Observable } from 'rxjs';

import { Bet } from '../bet';
export class BetService {
    connection: mysql.Connection;
    constructor() {
        this.connection = Connection.getConnection();
    }
    insertBet(bet: Bet): Observable<string> {
        return new Observable<string>((observer) => {
            try {
                this.connection.query("INSERT INTO `bets` (`matchId`,`bet`,`username`) VALUES ('" + bet.matchId + "','" + bet.bet + "','" + bet.username + "');",
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
