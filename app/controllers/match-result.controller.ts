import { Router, Request, Response } from 'express';
import { MatchResult } from '../match-result';
import { MatchResultService } from '../service/match-result.service';

const router: Router = Router();

router.post('/', (req: Request, res: Response) => {
    let matchResult: MatchResult = req.body;
    console.log(matchResult);
    if(matchResult){
       const observer = new MatchResultService().calculatePoints(matchResult);
       observer.subscribe(
        (response) => { // success
            res.json({'result': response});
        },
        (error) => { // error
            // 500-> internal server error
            console.log(error);
            res.status(500).send({'error': 'Some error ocured'});
        },
        () => { // complete
            console.log('completed');
        }
       );
    }
});

export const MatchResultController: Router = router;