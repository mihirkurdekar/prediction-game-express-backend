import { Connection } from '../connection-config';
import { Observable } from 'rxjs';

import { MatchResult } from '../match-result';
export class MatchResultService {
    calculatePoints(matchResult: MatchResult): Observable<string> {
        return new Observable<string>((observer) => {
            try {
                Connection.getConnectionPool().getConnection(function (err, connection) {
                    // Use the connection
                    if (err) { // error
                        observer.error(err);
                    }
                    connection.beginTransaction((err) => {
                        if (err) {
                            observer.error(err);
                        }
                        connection.query("INSERT INTO `match_result`(`matchId`,`result`)VALUES('" + matchResult.matchId + "','" + matchResult.result + "');",
                            function (err: any, result: any, fields: any) {
                                if (err) { // error
                                    observer.error(err);
                                    return connection.rollback();
                                }
                                connection.query("UPDATE bets inner join users ON users.username=bets.username SET points_won=points_won+" + matchResult.points + " WHERE matchId='" + matchResult.matchId + "' AND bet='" + matchResult.result + "';",
                                    function (err: any, result: any, fields: any) {
                                        if (err) { // error
                                            observer.error(err);
                                            return connection.rollback();
                                        }
                                        connection.query("UPDATE bets inner join users ON users.username=bets.username SET points_lost=points_lost+" + matchResult.points + " WHERE matchId='" + matchResult.matchId + "' AND bet!='" + matchResult.result + "';",
                                            function (err: any, result: any, fields: any) {
                                                if (err) { // error
                                                    observer.error(err);
                                                    return connection.rollback(function () {
                                                        observer.error(err);
                                                    });
                                                }
                                                connection.query("UPDATE users SET points_lost=points_lost+" + matchResult.points + " WHERE username NOT IN (SELECT username from bets WHERE matchId='" + matchResult.matchId + "');",
                                                    function (err: any, result: any, fields: any) {
                                                        if (err) { // error
                                                            observer.error(err);
                                                            return connection.rollback(function () {
                                                                observer.error(err);
                                                            });
                                                        }

                                                        connection.commit(function (err) {
                                                            if (err) {
                                                                observer.error(err);
                                                                return connection.rollback(function () {
                                                                    observer.error(err);
                                                                });
                                                            }
                                                            console.log('success!');
                                                            observer.next('success');
                                                            observer.complete();
                                                        });
                                                    });
                                            });
                                    });
                            });
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
