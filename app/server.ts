import express from 'express';
import * as bodyParser from 'body-parser';


import { RegisterController } from './controllers/resgister.controller';
import { LoginController } from './controllers/login.controller';
import { BetController } from './controllers/bet.controller';

const app: express.Application = express();
const port: any = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/register',RegisterController);
app.use('/login',LoginController);
app.use('/bet',BetController);

app.listen(port, () => {
    console.log(`Listening at ${port}`);
});