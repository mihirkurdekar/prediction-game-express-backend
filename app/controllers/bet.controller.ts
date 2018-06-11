import { Router, Request, Response } from 'express';

import { Bet } from '../bet';
import { BetService } from '../service/bet.service';

const router: Router = Router();

router.post('/', (req: Request, res: Response) => {
    let bet: Bet = req.body;
    console.log(bet);
    if(bet){
       const observer = new BetService().insertBet(bet);
       observer.subscribe(
        (success) => { // success
            res.json({'result': 'success'});
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

export const BetController: Router = router;