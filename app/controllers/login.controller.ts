import { Router, Request, Response } from 'express';
import { User } from '../user';
import { LoginService } from '../service/login.service';

const router: Router = Router();

router.post('/', (req: Request, res: Response) => {
    let user: User = req.body;
    console.log(user);
    if(user){
       const observer = new LoginService().checkLogin(user);
       observer.subscribe(
        (result) => { // success
            res.json({'result': result});
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

export const LoginController: Router = router;