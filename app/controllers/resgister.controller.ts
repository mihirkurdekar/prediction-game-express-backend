import { Router, Request, Response } from 'express';
import { RegisterService } from '../service/register.service';
import { User } from '../user';

const router: Router = Router();

router.post('/', (req: Request, res: Response) => {
    let user: User = req.body;
    console.log(user);
    if(user){
       const observer = new RegisterService().insertUser(user);
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

export const RegisterController: Router = router;