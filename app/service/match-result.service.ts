import { Connection } from '../connection-config';
import { Observable } from 'rxjs';

import { MatchResult } from '../match-result';
export class MatchResultService {
    calculatePoints(matchResult: MatchResult): Observable<string> {
        return new Observable<string>((observer) => {
            try {
                Connection.getConnection().beginTransaction((err) => {
                    if (err) {
                        throw err;
                    }
                    Connection.getConnection().query("INSERT INTO `match_result`(`matchId`,`result`)VALUES('"+matchResult.matchId+"','"+matchResult.result+"');",
                        function (err: any, result: any, fields: any) {
                            if (err) { // error
                                observer.error(err);
                                return Connection.getConnection().rollback();
                            }
                            Connection.getConnection().query("UPDATE bets inner join users ON users.username=bets.username SET points_won=points_won+"+matchResult.points+" WHERE matchId='"+matchResult.matchId+"' AND bet='"+matchResult.result+"';",
                                function (err: any, result: any, fields: any) {
                                    if (err) { // error
                                        observer.error(err);
                                        return Connection.getConnection().rollback();
                                    }
                                    Connection.getConnection().query("UPDATE bets inner join users ON users.username=bets.username SET points_lost=points_lost+"+matchResult.points+" WHERE matchId='"+matchResult.matchId+"' AND bet!='"+matchResult.result+"';",
                                        function (err: any, result: any, fields: any) {
                                            if (err) { // error
                                                observer.error(err);
                                                return Connection.getConnection().rollback(function () {
                                                    throw err;
                                                });
                                            }
                                            Connection.getConnection().query("UPDATE users SET points_lost=points_lost+"+matchResult.points+" WHERE username NOT IN (SELECT username from bets WHERE matchId='"+matchResult.matchId+"');",
                                                function (err: any, result: any, fields: any) {
                                                    if (err) { // error
                                                        observer.error(err);
                                                        return Connection.getConnection().rollback(function () {
                                                            throw err;
                                                        });
                                                    }

                                                    Connection.getConnection().commit(function (err) {
                                                        if (err) {
                                                            observer.error(err);
                                                            return Connection.getConnection().rollback(function () {
                                                                throw err;
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
