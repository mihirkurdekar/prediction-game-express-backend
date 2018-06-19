import mysql from 'mysql';
import { Connection } from '../connection-config';
import { Observable } from 'rxjs';

import { Bet } from '../bet';
export class BetService {
    insertBet(bet: Bet): Observable<string> {
        return new Observable<string>((observer) => {
            try {
                Connection.getConnectionPool().getConnection(function (err, connection) {
                    // Use the connection
                    if (err) { // error
                        observer.error(err);
                    }
                    connection.query("INSERT INTO `bets` (`matchId`,`bet`,`username`) VALUES ('" + bet.matchId + "','" + bet.bet + "','" + bet.username + "');",
                        function (err: any, result: any, fields: any) {
                            if (err) { // error
                                observer.error(err);
                            } else { // success
                                observer.next();
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
