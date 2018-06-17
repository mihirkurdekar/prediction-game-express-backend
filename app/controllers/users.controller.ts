import { Router, Request, Response } from 'express';
import { RegisterService } from '../service/register.service';
import { User } from '../user';
import { UsersService } from '../service/users.service';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {


    const observer = new UsersService().getUsers();
    observer.subscribe(
        (response) => { // success
            res.json(response);
        },
        (error) => { // error
            // 500-> internal server error
            console.log(error);
            res.status(500).send({ 'error': 'Some error ocured' });
        },
        () => { // complete
            console.log('completed');
        }
    );

});

export const UsersController: Router = router;